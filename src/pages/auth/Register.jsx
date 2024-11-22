import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password does not match!');
    }
    console.log(form);
    try {
      const res = await axios.post('http://localhost:5007/api/register', form);
      console.log(res.data);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[url('../../public/bg06.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
      
     

      {/* Register form content */}
      <div className="relative bg-white bg-opacity-40 shadow-2xl rounded-3xl p-10 w-full max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleOnChange}
              name="email"
              type="email"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleOnChange}
              name="password"
              type="password"
              required
            />
          </div>

          {/* Confirm Password input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleOnChange}
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          {/* Submit button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
