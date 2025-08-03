import React, { useState } from 'react';
import { Building, Plus, MapPin, Users, Home, Heart } from 'lucide-react';
import AddShelterForm from './AddShelterForm';

const SheltersTab = () => {
  const [hungerPoints, setHungerPoints] = useState([
    {
      id: 1,
      name: 'Hope Shelter',
      latitude: 40.7128,
      longitude: -74.006,
      capacityEstimate: 50,
      isActive: true,
      pointType: 'homeless',
      foodReceived: 100,
      contactPerson: 'John Doe',
    },
    {
      id: 2,
      name: 'Safe Haven',
      latitude: 40.7589,
      longitude: -73.9851,
      capacityEstimate: 35,
      isActive: true,
      pointType: 'shelter',
      foodReceived: 80,
      contactPerson: 'Jane Smith',
    },
    {
      id: 3,
      name: 'Sunrise Home',
      latitude: 40.7505,
      longitude: -73.9934,
      capacityEstimate: 40,
      isActive: true,
      pointType: 'home',
      foodReceived: 90,
      contactPerson: 'Mike Johnson',
    },
    {
      id: 4,
      name: 'Community Care',
      latitude: 40.7282,
      longitude: -73.7949,
      capacityEstimate: 30,
      isActive: false,
      pointType: 'low-income-families',
      foodReceived: 65,
      contactPerson: 'Sarah Wilson',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const totalFoodReceived = hungerPoints.reduce((sum, point) => sum + (point.foodReceived || 0), 0);
  const totalCapacity = hungerPoints.reduce((sum, point) => sum + (point.capacityEstimate || 0), 0);
  const activePoints = hungerPoints.filter((point) => point.isActive).length;

  const handleAddHungerPoint = (newHungerPoint) => {
    const hungerPointWithId = {
      ...newHungerPoint,
      id: Math.max(...hungerPoints.map((p) => p.id), 0) + 1,
      foodReceived: 0,
      contactPerson: 'To be assigned',
    };
    setHungerPoints((prev) => [...prev, hungerPointWithId]);
  };

  const getPointTypeIcon = (pointType) => {
    switch (pointType) {
      case 'homeless':
        return <Home className="h-4 w-4 text-blue-600" />;
      case 'shelter':
        return <Building className="h-4 w-4 text-emerald-600" />;
      case 'home':
        return <Heart className="h-4 w-4 text-pink-600" />;
      case 'low-income-families':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Building className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPointTypeLabel = (pointType) => {
    switch (pointType) {
      case 'homeless':
        return 'Homeless Shelter';
      case 'shelter':
        return 'General Shelter';
      case 'home':
        return 'Community Home';
      case 'low-income-families':
        return 'Low Income Families';
      default:
        return 'Unknown';
    }
  };

  const getPointTypeColor = (pointType) => {
    switch (pointType) {
      case 'homeless':
        return 'bg-blue-100 text-blue-800';
      case 'shelter':
        return 'bg-emerald-100 text-emerald-800';
      case 'home':
        return 'bg-pink-100 text-pink-800';
      case 'low-income-families':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hunger Points</p>
              <p className="text-3xl font-bold text-gray-900">{hungerPoints.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Points</p>
              <p className="text-3xl font-bold text-emerald-600">{activePoints}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Food Received</p>
              <p className="text-3xl font-bold text-orange-600">{totalFoodReceived}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Capacity</p>
              <p className="text-3xl font-bold text-purple-600">{totalCapacity}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Hunger Points Table */}
      <div className="bg-white rounded-xl shadow-lg border border-emerald-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Hunger Points</h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Hunger Point</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hungerPoints.map((point) => (
                <tr key={point.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        {getPointTypeIcon(point.pointType)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{point.name}</div>
                        <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getPointTypeColor(point.pointType)}`}>
                          {getPointTypeLabel(point.pointType)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1 inline" />
                    {point.latitude.toFixed(4)}, {point.longitude.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {point.capacityEstimate ? `${point.capacityEstimate} people` : 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {point.foodReceived || 0} meals
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      point.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {point.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {point.contactPerson || 'Not assigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Shelter Form Modal */}
      <AddShelterForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddHungerPoint}
      />
    </div>
  );
};

export default SheltersTab;
