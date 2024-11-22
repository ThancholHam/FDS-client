import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //JavaScript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
 

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log('form', form)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;

      roleRedirect(role);
      toast.success('Welcome Back !!!');
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (

    <div className="min-h-screen bg-[url('../../public/bg10.jpg')] bg-cover bg-center flex flex-col items-center justify-center">



      {/* Login form content */}
      <div className="relative bg-white bg-opacity-40 shadow-2xl rounded-3xl p-10 w-full max-w-md backdrop-blur-md ">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 ">Email</label>
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

          {/* Submit button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
            Login
          </button>
        </form>
      </div>
    </div>

  );
}

export default Login;
