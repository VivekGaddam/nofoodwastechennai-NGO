import React, { useState } from 'react';
import { X, MapPin, Users, Building, Home, Heart } from 'lucide-react';

const AddShelterForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
    capacityEstimate: undefined,
    isActive: true,
    pointType: 'shelter',
  });

  const [errors, setErrors] = useState({});

  const pointTypes = [
    { value: 'homeless', label: 'Homeless Shelter', icon: Home },
    { value: 'shelter', label: 'General Shelter', icon: Building },
    { value: 'home', label: 'Community Home', icon: Heart },
    { value: 'low-income-families', label: 'Low Income Families', icon: Users },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.latitude === 0) {
      newErrors.latitude = 'Latitude is required';
    } else if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }

    if (formData.longitude === 0) {
      newErrors.longitude = 'Longitude is required';
    } else if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }

    if (formData.capacityEstimate !== undefined && formData.capacityEstimate < 0) {
      newErrors.capacityEstimate = 'Capacity must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        latitude: 0,
        longitude: 0,
        capacityEstimate: undefined,
        isActive: true,
        pointType: 'shelter',
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        () => {
          alert('Unable to get current location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Building className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Hunger Point</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter hunger point name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Point Type</label>
            <div className="grid grid-cols-2 gap-3">
              {pointTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('pointType', type.value)}
                    className={`flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 ${
                      formData.pointType === type.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                Latitude <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="latitude"
                step="any"
                value={formData.latitude || ''}
                onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                  errors.latitude ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 40.7128"
              />
              {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
            </div>

            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                Longitude <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="longitude"
                step="any"
                value={formData.longitude || ''}
                onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                  errors.longitude ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., -74.0060"
              />
              {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
            >
              <MapPin className="h-4 w-4" />
              <span>Use Current Location</span>
            </button>
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
              Capacity Estimate
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="capacity"
                min="0"
                value={formData.capacityEstimate || ''}
                onChange={(e) =>
                  handleInputChange('capacityEstimate', e.target.value ? parseInt(e.target.value) : undefined)
                }
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                  errors.capacityEstimate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter estimated capacity"
              />
            </div>
            {errors.capacityEstimate && <p className="mt-1 text-sm text-red-600">{errors.capacityEstimate}</p>}
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active Status
            </label>
            <span className="text-sm text-gray-500">(Check if this hunger point is currently active)</span>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Building className="h-4 w-4" />
              <span>Add Hunger Point</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShelterForm;
