import React, { useState } from 'react';

// Sample Data
const donorData = [
  { id: 1, donorName: "Spice Garden Restaurant", status: "Delivered", location: "Hyderabad", foodType: "Cooked Meals", quantity: "50 meals" },
  { id: 2, donorName: "Fresh Mart Grocery", status: "In Progress", location: "Karimnagar", foodType: "Packaged Food", quantity: "25 packages" },
  { id: 3, donorName: "City Bakery", status: "Pending", location: "Hyderabad", foodType: "Bakery", quantity: "30 items" },
  { id: 4, donorName: "Green Valley Farms", status: "Delivered", location: "Warangal", foodType: "Fruits", quantity: "40 kg" },
  { id: 5, donorName: "Metro Food Court", status: "Delivered", location: "Hyderabad", foodType: "Cooked Meals", quantity: "75 meals" },
  { id: 6, donorName: "Sunrise Cafe", status: "In Progress", location: "Nizamabad", foodType: "Cooked Meals", quantity: "35 meals" },
  { id: 7, donorName: "Wholesale Fruits Co.", status: "Delivered", location: "Karimnagar", foodType: "Fruits", quantity: "60 kg" },
  { id: 8, donorName: "Corner Store", status: "Pending", location: "Hyderabad", foodType: "Packaged Food", quantity: "20 packages" },
  { id: 9, donorName: "Royal Restaurant", status: "Delivered", location: "Warangal", foodType: "Cooked Meals", quantity: "45 meals" },
  { id: 10, donorName: "Sweet Dreams Bakery", status: "In Progress", location: "Hyderabad", foodType: "Bakery", quantity: "25 items" },
  { id: 11, donorName: "Fresh Produce Market", status: "Delivered", location: "Nizamabad", foodType: "Fruits", quantity: "35 kg" },
  { id: 12, donorName: "Local Deli", status: "Delivered", location: "Hyderabad", foodType: "Packaged Food", quantity: "15 packages" }
];

const monthlyDeliveries = [
  { month: 'Jan', deliveries: 45 },
  { month: 'Feb', deliveries: 52 },
  { month: 'Mar', deliveries: 48 },
  { month: 'Apr', deliveries: 61 },
  { month: 'May', deliveries: 55 },
  { month: 'Jun', deliveries: 67 },
  { month: 'Jul', deliveries: 72 },
  { month: 'Aug', deliveries: 68 },
  { month: 'Sep', deliveries: 74 },
  { month: 'Oct', deliveries: 69 },
  { month: 'Nov', deliveries: 78 },
  { month: 'Dec', deliveries: 82 }
];

const volunteerFAQs = [
  {
    question: "How do I schedule a pickup?",
    answer: "You can schedule pickups through the dashboard by clicking on pending donations. Make sure to confirm timing with the donor before heading out."
  },
  {
    question: "What should I bring for food collection?",
    answer: "Always bring insulated bags, gloves, and proper containers. Check if the donation requires refrigeration and plan accordingly."
  },
  {
    question: "How do I report delivery completion?",
    answer: "Update the status in your dashboard immediately after delivery. Include photos and recipient confirmation when possible."
  }
];

const weeklyDeliveries = [
  { week: 'Week 1', deliveries: 18 },
  { week: 'Week 2', deliveries: 24 },
  { week: 'Week 3', deliveries: 21 },
  { week: 'Week 4', deliveries: 27 }
];

const foodTypeDistribution = [
  { name: "Cooked Meals", value: 40, fill: "#3B82F6" },
  { name: "Fruits", value: 25, fill: "#10B981" },
  { name: "Packaged Food", value: 20, fill: "#F59E0B" },
  { name: "Bakery", value: 15, fill: "#EF4444" }
];

// Helper Component for Status Tag
function StatusTag({ status }) {
  const bgColor = status === 'Pending' ? '#facc15'
                 : status === 'In Progress' ? '#3b82f6'
                 : '#10b981';

  return (
    <span style={{
      padding: '4px 8px',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '12px',
      backgroundColor: bgColor
    }}>
      {status}
    </span>
  );
}

// Donor Table Component
function DonorTable() {
  return (
    <div>
      <h2>Donor Table</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Status</th>
            <th>Location</th>
            <th>Food Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {donorData.map(donor => (
            <tr key={donor.id}>
              <td>{donor.donorName}</td>
              <td><StatusTag status={donor.status} /></td>
              <td>{donor.location}</td>
              <td>{donor.foodType}</td>
              <td>{donor.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Monthly Deliveries Component
function MonthlyDeliveries() {
  return (
    <div>
      <h2>Monthly Deliveries</h2>
      <ul>
        {monthlyDeliveries.map((item, index) => (
          <li key={index}>
            {item.month}: {item.deliveries} deliveries
          </li>
        ))}
      </ul>
    </div>
  );
}

// FAQs Component
function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2>Volunteer FAQs</h2>
      {volunteerFAQs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '12px' }}>
          <h4
            onClick={() => toggle(index)}
            style={{ cursor: 'pointer', color: '#2563eb' }}
          >
            {faq.question}
          </h4>
          {openIndex === index && (
            <p>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// Main Component
function DashboardDemo() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <DonorTable />
      <MonthlyDeliveries />
      <FAQs />
    </div>
  );
}

export {
  donorData,
  monthlyDeliveries,
  weeklyDeliveries,
  foodTypeDistribution,
  volunteerFAQs
};

