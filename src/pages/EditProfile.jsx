import React, { useState } from 'react';
import useEcomStore from '../store/ecom-store'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const user = useEcomStore((state) => state.user);
  const updateUser = useEcomStore((state) => state.updateUser); // action to update user details
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState("I'm a freeman who believe in the freedom of speech and freedom of self defense. All countries in the world were build by guns.");

  const handleSave = () => {
    // Assuming the updateUser function updates the user info in the store
    updateUser({ email, about });
    navigate('/user'); // Navigate back to profile page
  };

  return (
    <div className="min-h-screen bg-[url('../../public/bg.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Edit Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full border-4 border-blue-500 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">Change your email:</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter new email"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">About Me</h3>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200">
            Save
          </button>
          <button onClick={() => navigate('/user')} className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
