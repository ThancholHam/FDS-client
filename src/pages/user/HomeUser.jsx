import React from 'react';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';


const HomeUser = () => {
  const user = useEcomStore((state)=>state.user)
  const navigate = useNavigate();
  const actionLogout = useEcomStore((state)=>state.actionLogout)

  const handleLogout = () => {
    actionLogout()
    navigate('/')
  }

  const editprofile = () => {
    navigate('/editprofile')
  }

  console.log(user)
  return (
    <div className="min-h-screen bg-[url('../../public/bg.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">User Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://via.placeholder.com/100" 
            alt="Profile" 
            className="rounded-full border-4 border-blue-500 mb-4" 
          />
          <h2 className="text-2xl font-semibold text-gray-800">{user.email}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">About Me</h3>
          <p className="text-gray-600">
            I'm a freeman who believe in the freedom of speech and freedom of self defense. All countries in the world were build by guns.
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={editprofile} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
