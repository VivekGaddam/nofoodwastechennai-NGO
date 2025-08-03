import React, { useState } from 'react';
import { 
  Users, 
  Home, 
  BarChart3, 
  LogOut, 
  Plus, 
  UserPlus,
  Building,
  TrendingUp,
  Award,
  Heart,
  Factory
} from 'lucide-react';
import VolunteersTab from './VolunteersTab';
import SheltersTab from './SheltersTab';
import VisualizeTab from './VisualizeTab';
import IndustryDonorsTab from './IndustryDonorsTab';
import image from '../assets/image.png';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('volunteers');

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Implement actual logout logic here
  };

  const tabs = [
    { id: 'volunteers', label: 'Volunteers', icon: Users },
    { id: 'shelters', label: 'Shelters', icon: Home },
    { id: 'donors', label: 'Industry Donors', icon: Factory },
    { id: 'visualize', label: 'Visualize', icon: BarChart3 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'volunteers':
        return <VolunteersTab />;
      case 'shelters':
        return <SheltersTab />;
      case 'donors':
        return <IndustryDonorsTab />;
      case 'visualize':
        return <VisualizeTab />;
      default:
        return <VolunteersTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 mb-8">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="">
                  
                  <img src={image} className='max-w-3xs' alt="" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">NoFoodWaste</h1>
                  <p className="text-emerald-600 font-medium">Admin Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="font-semibold text-gray-900">Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
