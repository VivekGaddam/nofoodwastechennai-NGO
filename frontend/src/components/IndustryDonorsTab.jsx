import React, { useState } from 'react';
import {
  Factory, Plus, MapPin, Phone, Mail, Building2,
  Guitar as Hospital, GraduationCap, Utensils,
  Briefcase, MoreHorizontal
} from 'lucide-react';
import AddIndustryDonorForm from './AddIndustryDonorForm';

const IndustryDonorsTab = () => {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      contactPerson: 'Dr. Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'admin@citygeneral.com',
      address: '123 Medical Street, Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      type: 'hospital',
      notes: 'Regular donor, provides meals from cafeteria',
      isActive: true,
      totalDonations: 450,
      lastDonation: '2024-01-15'
    },
    {
      id: 2,
      name: 'Tech University',
      contactPerson: 'Prof. Anita Sharma',
      phone: '+91-9876543211',
      email: 'canteen@techuni.edu',
      address: '456 Education Road, Pune',
      latitude: 18.5204,
      longitude: 73.8567,
      type: 'college',
      notes: 'Student mess surplus food',
      isActive: true,
      totalDonations: 320,
      lastDonation: '2024-01-14'
    },
    {
      id: 3,
      name: 'Corporate Canteen Solutions',
      contactPerson: 'Mr. Vikram Patel',
      phone: '+91-9876543212',
      email: 'contact@corpcanteen.com',
      address: '789 Business Park, Bangalore',
      latitude: 12.9716,
      longitude: 77.5946,
      type: 'canteen',
      notes: 'Multiple office locations',
      isActive: true,
      totalDonations: 280,
      lastDonation: '2024-01-13'
    },
    {
      id: 4,
      name: 'Global Tech Corp',
      contactPerson: 'Ms. Priya Singh',
      phone: '+91-9876543213',
      email: 'csr@globaltech.com',
      address: '321 IT Hub, Hyderabad',
      latitude: 17.3850,
      longitude: 78.4867,
      type: 'corporate',
      notes: 'CSR initiative partner',
      isActive: false,
      totalDonations: 150,
      lastDonation: '2023-12-20'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const totalDonations = donors.reduce((sum, donor) => sum + (donor.totalDonations || 0), 0);
  const activeDonors = donors.filter(donor => donor.isActive).length;

  const handleAddDonor = (newDonor) => {
    const donorWithId = {
      ...newDonor,
      id: Math.max(...donors.map(d => d.id), 0) + 1,
      totalDonations: 0,
      lastDonation: undefined
    };
    setDonors(prev => [...prev, donorWithId]);
  };

  const getDonorTypeIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <Hospital className="h-4 w-4 text-red-600" />;
      case 'college':
        return <GraduationCap className="h-4 w-4 text-blue-600" />;
      case 'canteen':
        return <Utensils className="h-4 w-4 text-orange-600" />;
      case 'corporate':
        return <Briefcase className="h-4 w-4 text-purple-600" />;
      case 'other':
        return <MoreHorizontal className="h-4 w-4 text-gray-600" />;
      default:
        return <Factory className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDonorTypeLabel = (type) => {
    switch (type) {
      case 'hospital': return 'Hospital';
      case 'college': return 'College';
      case 'canteen': return 'Canteen';
      case 'corporate': return 'Corporate';
      case 'other': return 'Other';
      default: return 'Unknown';
    }
  };

  const getDonorTypeColor = (type) => {
    switch (type) {
      case 'hospital': return 'bg-red-100 text-red-800';
      case 'college': return 'bg-blue-100 text-blue-800';
      case 'canteen': return 'bg-orange-100 text-orange-800';
      case 'corporate': return 'bg-purple-100 text-purple-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Donors */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-3xl font-bold text-gray-900">{donors.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Factory className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Donors */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Donors</p>
              <p className="text-3xl font-bold text-emerald-600">{activeDonors}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Total Donations */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-orange-600">{totalDonations}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Utensils className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Avg per Donor */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg per Donor</p>
              <p className="text-3xl font-bold text-purple-600">
                {donors.length > 0 ? Math.round(totalDonations / donors.length) : 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-emerald-100">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Industry Donors</h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Donor</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization & Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        {getDonorTypeIcon(donor.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                        <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getDonorTypeColor(donor.type)}`}>
                          {getDonorTypeLabel(donor.type)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{donor.contactPerson || 'Not specified'}</div>
                      {donor.phone && <div className="flex items-center text-gray-500 mt-1"><Phone className="h-3 w-3 mr-1" />{donor.phone}</div>}
                      {donor.email && <div className="flex items-center text-gray-500 mt-1"><Mail className="h-3 w-3 mr-1" />{donor.email}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <div>
                          <div>{donor.latitude.toFixed(4)}, {donor.longitude.toFixed(4)}</div>
                          {donor.address && <div className="text-xs text-gray-400 mt-1">{donor.address}</div>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-semibold">{donor.totalDonations || 0} meals</div>
                      {donor.lastDonation && <div className="text-xs text-gray-500">Last: {new Date(donor.lastDonation).toLocaleDateString()}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      donor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {donor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {donor.notes || 'No notes'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Donor Modal */}
      <AddIndustryDonorForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddDonor}
      />
    </div>
  );
};

export default IndustryDonorsTab;
