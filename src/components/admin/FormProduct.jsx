import React, { useEffect, useState } from 'react';
import useEcomStore from '../../store/ecom-store';
import { createProduct, deleteProduct } from '../../api/product';
import { toast } from 'react-toastify';
import UploadFile from './UploadFile';
import { Link } from 'react-router-dom';
import { Settings, Trash2 } from 'lucide-react';

const innitialState = {
  title: '',
  description: '',
  price: 0,
  quantity: 0,
  categoryId: '',
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(innitialState);

  useEffect(() => {
    getCategory();
    getProduct(200);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(innitialState);
      getProduct();
      toast.success(`Add Product ${res.data.title} success`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to delete this image?')) {
      try {
        await deleteProduct(token, id);
        toast.success('Product deleted!!!');
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Insert Product Information</h1>

        {/* Product Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            value={form.title}
            onChange={handleOnChange}
            placeholder="Title"
            name="title"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            value={form.description}
            onChange={handleOnChange}
            placeholder="Description"
            name="description"
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            value={form.price}
            onChange={handleOnChange}
            placeholder="Price"
            name="price"
          />
        </div>

        {/* Product Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="Quantity"
            name="quantity"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              Please Select
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="my-4" />

        {/* Upload file component */}
        <UploadFile form={form} setForm={setForm} />

        {/* Submit Button */}
        <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
          Add Product
        </button>

        <hr className="my-6" />

        {/* Products Table */}
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">No.</th>
              <th className="py-2 px-4 border">Pictures</th>
              <th className="py-2 px-4 border">Product Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Sold</th>
              <th className="py-2 px-4 border">Updated</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">
                  {item.images.length > 0 ? (
                    <img className="w-24 h-24 rounded-lg shadow-md" src={item.images[0].url} alt="Product" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-2 px-4 border">{item.title}</td>
                <td className="py-2 px-4 border">{item.description}</td>
                <td className="py-2 px-4 border">{item.price}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">{item.sold}</td>
                <td className="py-2 px-4 border">{item.updatedAt}</td>
                <td className="py-2 px-4 border flex space-x-2">
                  <Link
                    to={'/admin/product/' + item.id}
                    className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 bg-red-100 rounded-md hover:bg-red-200"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
