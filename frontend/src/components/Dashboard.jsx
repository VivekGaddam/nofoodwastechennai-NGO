import React, { useState, useEffect } from 'react';
import { Heart, Users } from 'lucide-react';
import DonorTable from './DonorTable';
import DeliveryCharts from './DeliveryCharts';
import VolunteerResources from './VolunteerResources';
// import StatsCards from './StatsCards';
import VolunteerTasks from './VolunteerTasks';
import './Dashboard.css';

// Import your API service functions
import {
  getMyTasks,
  totalDeliveries,
  getMyDonations,
} from '../apiService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [donorData, setDonorData] = useState([]);
  const [monthlyDeliveries, setMonthlyDeliveries] = useState([]);
  const [weeklyDeliveries, setWeeklyDeliveries] = useState([]);
  const [foodTypeDistribution, setFoodTypeDistribution] = useState([]);
  const [volunteerTasks, setVolunteerTasks] = useState([]);
  const [volunteerFAQs, setVolunteerFAQs] = useState([]);
  const [deliveriesCount, setDeliveriesCount] = useState(0);

  // Load logged-in user
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get volunteer tasks
        const tasksRes = await getMyTasks();
        setVolunteerTasks(tasksRes.data || []);

        // Get total deliveries
        const totalRes = await totalDeliveries();
        setDeliveriesCount(totalRes.data?.total || 0);

        // Get my donations (assuming donors are linked to deliveries)
        const donationsRes = await getMyDonations();
        setDonorData(donationsRes.data || []);

        // TODO: Replace with backend endpoints for charts if available
        // For now, mock chart data from donations
        const monthlyDataMock = [
          { month: 'Jan', count: 10 },
          { month: 'Feb', count: 15 },
          { month: 'Mar', count: 20 },
        ];
        const weeklyDataMock = [
          { week: 'Week 1', count: 5 },
          { week: 'Week 2', count: 7 },
        ];
        const foodTypeMock = [
          { type: 'Veg', count: 12 },
          { type: 'Non-Veg', count: 8 },
        ];
        setMonthlyDeliveries(monthlyDataMock);
        setWeeklyDeliveries(weeklyDataMock);
        setFoodTypeDistribution(foodTypeMock);

        // Mock FAQs — replace with API if you have one
        setVolunteerFAQs([
          { question: 'How do I accept a task?', answer: 'Go to your tasks and click accept.' },
          { question: 'What should I do if food is spoiled?', answer: 'Report immediately to admin.' },
        ]);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-inner">
            <div className="dashboard-brand">
              <div className="dashboard-icon">
                <Heart className="icon" />
              </div>
              <div>
                <h1 className="dashboard-title">Volunteer Dashboard</h1>
                <p className="dashboard-subtitle">Food Rescue & Distribution</p>
              </div>
            </div>
          </div>
          <div className="dashboard-welcome">
            <Users className="icon-small" />
            <span>Welcome back, {user ? user.name : 'Volunteer'}!</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats */}
        {/* <section className="dashboard-section col-span-1 md:col-span-2 lg:col-span-3">
          <StatsCards donorData={donorData} totalDeliveries={deliveriesCount} />
        </section> */}

        {/* Volunteer Tasks */}
        <section className="dashboard-section col-span-1 md:col-span-2 lg:col-span-3">
          <VolunteerTasks tasks={volunteerTasks} volunteerId={user ? user._id : null} />
        </section>

        {/* Charts */}
        <section className="dashboard-section col-span-1 md:col-span-2 lg:col-span-3">
          <DeliveryCharts
            monthlyData={monthlyDeliveries}
            weeklyData={weeklyDeliveries}
            foodTypeData={foodTypeDistribution}
          />
        </section>

        {/* Table + Sidebar */}
        <div className="dashboard-grid col-span-1 md:col-span-2 lg:col-span-3">
          <div className="dashboard-main-content">
            <DonorTable data={donorData} />
          </div>
          <aside className="dashboard-sidebar">
            <VolunteerResources faqs={volunteerFAQs} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
