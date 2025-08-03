import React, { useState, useMemo } from 'react';
import { Award, TrendingUp, User, Search, Filter, Calendar, Users2 } from 'lucide-react';

const VolunteersTab = () => {
  const [volunteers] = useState([
    { id: 1, name: 'Amit Kumar', mealsDelivered: 120, dateOfBirth: '1985-03-15', status: 'active' },
    { id: 2, name: 'Priya Singh', mealsDelivered: 90, dateOfBirth: '1992-07-22', status: 'active' },
    { id: 3, name: 'Suresh Reddy', mealsDelivered: 60, dateOfBirth: '1978-11-08', status: 'active' },
    { id: 4, name: 'Anita Sharma', mealsDelivered: 85, dateOfBirth: '1988-05-12', status: 'active' },
    { id: 5, name: 'Rajesh Patel', mealsDelivered: 45, dateOfBirth: '1995-09-30', status: 'inactive' },
    { id: 6, name: 'Deepika Rao', mealsDelivered: 110, dateOfBirth: '1990-01-18', status: 'active' },
    { id: 7, name: 'Vikram Joshi', mealsDelivered: 75, dateOfBirth: '1983-12-05', status: 'active' },
    { id: 8, name: 'Kavya Nair', mealsDelivered: 95, dateOfBirth: '1987-04-25', status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [mealsFilter, setMealsFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const age = calculateAge(volunteer.dateOfBirth);
      const matchesAge =
        ageFilter === '' ||
        (ageFilter === '18-30' && age >= 18 && age <= 30) ||
        (ageFilter === '31-45' && age >= 31 && age <= 45) ||
        (ageFilter === '46-60' && age >= 46 && age <= 60) ||
        (ageFilter === '60+' && age > 60);
      const matchesMeals =
        mealsFilter === '' ||
        (mealsFilter === '0-50' && volunteer.mealsDelivered <= 50) ||
        (mealsFilter === '51-100' && volunteer.mealsDelivered >= 51 && volunteer.mealsDelivered <= 100) ||
        (mealsFilter === '100+' && volunteer.mealsDelivered > 100);
      const matchesStatus = statusFilter === '' || volunteer.status === statusFilter;

      return matchesSearch && matchesAge && matchesMeals && matchesStatus;
    });
  }, [volunteers, searchTerm, ageFilter, mealsFilter, statusFilter]);

  const totalMeals = filteredVolunteers.reduce((sum, v) => sum + v.mealsDelivered, 0);
  const activeVolunteers = filteredVolunteers.filter((v) => v.status === 'active').length;

  const clearFilters = () => {
    setSearchTerm('');
    setAgeFilter('');
    setMealsFilter('');
    setStatusFilter('');
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volunteers</p>
              <p className="text-3xl font-bold text-gray-900">{filteredVolunteers.length}</p>
              <p className="text-xs text-gray-500">of {volunteers.length} total</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <User className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
              <p className="text-3xl font-bold text-emerald-600">{activeVolunteers}</p>
              <p className="text-xs text-gray-500">currently active</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Meals Delivered</p>
              <p className="text-3xl font-bold text-orange-600">{totalMeals}</p>
              <p className="text-xs text-gray-500">by filtered volunteers</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search by Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter volunteer name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Filter by Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Age</label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            >
              <option value="">All Ages</option>
              <option value="18-30">18-30 years</option>
              <option value="31-45">31-45 years</option>
              <option value="46-60">46-60 years</option>
              <option value="60+">60+ years</option>
            </select>
          </div>

          {/* Filter by Meals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Meals</label>
            <select
              value={mealsFilter}
              onChange={(e) => setMealsFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            >
              <option value="">All Ranges</option>
              <option value="0-50">0-50 meals</option>
              <option value="51-100">51-100 meals</option>
              <option value="100+">100+ meals</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Volunteers Table */}
      <div className="bg-white rounded-xl shadow-lg border border-emerald-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Volunteers</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users2 className="h-4 w-4" />
              <span>
                Showing {filteredVolunteers.length} of {volunteers.length} volunteers
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meals Delivered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-emerald-100 p-2 rounded-full mr-3">
                          <User className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{v.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 inline text-gray-400" />
                      {calculateAge(v.dateOfBirth)} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {v.mealsDelivered} meals
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(v.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        v.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <Users2 className="h-8 w-8 text-gray-300" />
                      <p>No volunteers found matching your filters</p>
                      <button
                        onClick={clearFilters}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      >
                        Clear filters to see all volunteers
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteersTab;
