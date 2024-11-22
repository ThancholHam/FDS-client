import React, { useEffect, useState } from 'react';
import useEcomStore from '../../store/ecom-store';
import { readProduct, updateProduct } from '../../api/product';
import { toast } from 'react-toastify';
import UploadFile from './UploadFile';
import { useParams, useNavigate } from 'react-router-dom';

const innitialState = {
    title: "M5",
    description: "desc",
    price: 200,
    quantity: 20,
    categoryId: '',
    images: []
};

const FormEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useEcomStore((state) => state.token);
    const getCategory = useEcomStore((state) => state.getCategory);
    const categories = useEcomStore((state) => state.categories);

    const [form, setForm] = useState(innitialState);

    useEffect(() => {
        getCategory();
        fetchProduct(token, id);
    }, []);

    const fetchProduct = async (token, id) => {
        try {
            const res = await readProduct(token, id);
            setForm(res.data);
        } catch (err) {
            console.log('Error Fetching Data', err);
        }
    };

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProduct(token, id, form);
            toast.success(`Product "${res.data.title}" updated successfully!`);
            navigate('/admin/product');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <input
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        value={form.title}
                        onChange={handleOnChange}
                        placeholder="Title"
                        name="title"
                    />
                    <textarea
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        value={form.description}
                        onChange={handleOnChange}
                        placeholder="Description"
                        name="description"
                        rows="4"
                    />
                    <input
                        type="number"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        value={form.price}
                        onChange={handleOnChange}
                        placeholder="Price"
                        name="price"
                    />
                    <input
                        type="number"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        value={form.quantity}
                        onChange={handleOnChange}
                        placeholder="Quantity"
                        name="quantity"
                    />
                    <select
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        name="categoryId"
                        onChange={handleOnChange}
                        value={form.categoryId}
                    >
                        <option value="" disabled>Please Select</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <UploadFile form={form} setForm={setForm} />

                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
                    Edit Product
                </button>
            </form>
        </div>
    );
};

export default FormEditProduct;
