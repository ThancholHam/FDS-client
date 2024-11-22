import React, { useState, useEffect } from 'react';
import { createCategory, removeCategory } from '../../api/Category';
import useEcomStore from '../../store/ecom-store';
import { toast } from 'react-toastify';

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState('');
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning('Please fill in the category name');
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`Category "${res.data.name}" added successfully!`);
      setName('');
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const res = await removeCategory(token, id);
        toast.success(`Category "${res.data.name}" deleted successfully!`);
        getCategory(token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Category Management</h1>
      
      {/* Form Section */}
      <form className="flex gap-4 items-center mb-6" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          type="text"
          placeholder="Enter category name"
        />
        <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
          Add Category
        </button>
      </form>

      <hr className="my-4" />

      {/* Category List Section */}
      <ul className="list-none space-y-2">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition-all">
            <span className="text-gray-800 font-medium">{item.name}</span>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
