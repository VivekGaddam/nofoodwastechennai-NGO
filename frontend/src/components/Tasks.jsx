import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/volunteer/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleAccept = (task) => {
    // In a real application, you'd send an API call to accept the task
    // For now, we'll just open the map link
    if (task.googleMapsLink) {
      window.open(task.googleMapsLink, "_blank");
    } else {
      alert("No map link available for this task.");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FFF8F0] text-[#4E342E] font-sans p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#FFF8F0] text-[#4E342E] font-sans p-6">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#4E342E] font-sans p-6">
      <header className="bg-[#F57C00] text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Volunteer Tasks</h1>
      </header>

      <section className="max-w-4xl mx-auto bg-white mt-6 p-6 rounded shadow">
        <h2 className="text-xl font-bold text-[#FB8C00] mb-4">Your Assigned Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks assigned to you at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="bg-gray-100 p-4 rounded shadow-sm">
                <h3 className="text-lg font-semibold text-[#F57C00] mb-2">Donation Request</h3>
                <p><strong>Donor:</strong> {task.donorName}</p>
                <p><strong>Food:</strong> {task.foodDescription}</p>
                <p><strong>Quantity:</strong> {task.quantity}</p>
                <p><strong>Pickup Address:</strong> {task.pickupAddress}</p>
                {task.deliveredTo && (
                  <>
                    <p><strong>Deliver To:</strong> {task.deliveredTo.name}</p>
                    <p><strong>Shelter Address:</strong> {task.deliveredTo.address}</p>
                  </>
                )}
                <p><strong>Status:</strong> {task.status}</p>
                {task.googleMapsLink && (
                  <button
                    onClick={() => handleAccept(task)}
                    className="mt-4 bg-[#66BB6A] text-white px-4 py-2 rounded hover:bg-[#43A047]"
                  >
                    View on Map
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
