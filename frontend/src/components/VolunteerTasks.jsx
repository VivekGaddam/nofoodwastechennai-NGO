import React, { useState, useEffect } from "react";

const VolunteerTasks = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks ?? []);

  // Sync with parent prop updates
  useEffect(() => {
    setTaskList(tasks ?? []);
  }, [tasks]);

  const handleAccept = (id) => {
    console.log("Accepted task:", id);
    // TODO: Call API to accept task
  };

  const handleReject = (id) => {
    console.log("Rejected task:", id);
    // TODO: Call API to reject task
  };

  if (!taskList.length) {
    return <p className="text-gray-500">No tasks assigned yet.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {taskList.map((task) => {
        // Ensure correct lat/lng order
        const [lng, lat] = task.location?.coordinates ?? [];
        return (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {task.foodDetails?.foodType || "Food Item"}
            </h3>
            <p className="text-sm text-gray-600">
              Quantity: {task.foodDetails?.quantity || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  task.status === "pending"
                    ? "text-yellow-500"
                    : task.status === "accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {task.status}
              </span>
            </p>

            {/* Location link */}
            {lat && lng && (
              <a
                href={`https://www.google.com/maps?q=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm block mt-2"
              >
                View Location
              </a>
            )}

            {/* Action buttons */}
            {task.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAccept(task._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(task._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VolunteerTasks;
