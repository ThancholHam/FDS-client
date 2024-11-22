import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useEcomStore from '../../store/ecom-store';

const Manage = () => {
  const token = useEcomStore((state) => state.token);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userTable(token);
  }, []);

  // ดึงข้อมูลผู้ใช้
  const userTable = async (token) => {
    const users = await axios.get('http://localhost:5007/api/admin/manage', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserList(users.data);
  };

  // เปลี่ยนบทบาทผู้ใช้
  const changeUserRole = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5007/api/admin/manage/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // รีเฟรชตารางหลังจากการอัปเดต
      userTable(token);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Manage Users
        </h1>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {userList.length > 0 ? (
              userList.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{item.email}</td>
                  <td className="py-3 px-6">{item.role}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() =>
                        changeUserRole(item.id, item.role === 'user' ? 'admin' : 'user')
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
                    >
                      {item.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage;
