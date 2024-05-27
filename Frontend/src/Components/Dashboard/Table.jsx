import React from 'react';

const Table = () => {
  const users = [
    { id: 1, name: 'Tahiirooo', email: 'Tahiirooo@example.com', role: 'Admin', profilePic: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Durmus', email: 'Durmus@example.com', role: 'User', profilePic: 'https://via.placeholder.com/40' },
    // Weitere Benutzer hier hinzufügen
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">User Table</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Profile</th>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">
                <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full m-auto" />
              </td>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
