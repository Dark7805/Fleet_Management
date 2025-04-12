import React, { useState } from "react";

const VehicleGroup = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleAddGroup = () => {
    if (!groupName.trim()) return;
    setGroups([...groups, { name: groupName, description: groupDescription }]);
    setGroupName("");
    setGroupDescription("");
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Vehicle Group Selection */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold text-lg">Vehicle Group</label>
        <select className="bg-gray-800 border border-gray-600 px-4 py-2 rounded">
          <option>Select Group</option>
          {groups.map((group, index) => (
            <option key={index}>{group.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Add New Group
        </button>
      </div>

      {/* Groups Table */}
      {groups.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-2">Group List</h4>
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">Name</th>
                <th className="border border-gray-600 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={index} className="bg-gray-800 hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2">{group.name}</td>
                  <td className="border border-gray-600 px-4 py-2">{group.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add Vehicle Group</h2>

            <div className="mb-4">
              <label className="block mb-1">Group Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleAddGroup}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleGroup;
