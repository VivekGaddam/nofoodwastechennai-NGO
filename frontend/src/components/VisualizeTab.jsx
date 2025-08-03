import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Building } from 'lucide-react';

const VisualizeTab = () => {
  const volunteersData = [
    { name: 'Amit Kumar', mealsDelivered: 120, color: '#10B981' },
    { name: 'Priya Singh', mealsDelivered: 90, color: '#3B82F6' },
    { name: 'Suresh Reddy', mealsDelivered: 60, color: '#F59E0B' },
    { name: 'Anita Sharma', mealsDelivered: 85, color: '#EF4444' },
    { name: 'Rajesh Patel', mealsDelivered: 45, color: '#8B5CF6' },
  ];

  const sheltersData = [
    { name: 'Hope Shelter', foodReceived: 100, capacity: 50 },
    { name: 'Safe Haven', foodReceived: 80, capacity: 35 },
    { name: 'Sunrise Home', foodReceived: 90, capacity: 40 },
    { name: 'Community Care', foodReceived: 65, capacity: 30 },
  ];

  const monthlyData = [
    { month: 'Jan', volunteers: 12, shelters: 3, meals: 450 },
    { month: 'Feb', volunteers: 15, shelters: 4, meals: 520 },
    { month: 'Mar', volunteers: 18, shelters: 4, meals: 680 },
    { month: 'Apr', volunteers: 20, shelters: 5, meals: 750 },
    { month: 'May', volunteers: 22, shelters: 5, meals: 820 },
    { month: 'Jun', volunteers: 25, shelters: 6, meals: 900 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Impact</p>
              <p className="text-3xl font-bold text-emerald-600">900</p>
              <p className="text-sm text-gray-500">Meals this month</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Network</p>
              <p className="text-3xl font-bold text-blue-600">25</p>
              <p className="text-sm text-gray-500">Volunteers</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Partner Shelters</p>
              <p className="text-3xl font-bold text-purple-600">6</p>
              <p className="text-sm text-gray-500">Locations</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volunteer Meals Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meals Delivered by Volunteers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={volunteersData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="mealsDelivered"
              >
                {volunteersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Shelter Food Received Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Received by Shelters</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sheltersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="foodReceived" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="volunteers" fill="#3B82F6" name="Volunteers" radius={[2, 2, 0, 0]} />
            <Bar dataKey="shelters" fill="#10B981" name="Shelters" radius={[2, 2, 0, 0]} />
            <Bar dataKey="meals" fill="#F59E0B" name="Meals Delivered" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisualizeTab;
