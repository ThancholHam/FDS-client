import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaidSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/shop'); // กลับไปที่หน้าหลัก
  };

  const handleViewOrders = () => {
    navigate('/cart'); // ดูคำสั่งซื้อ
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-24 h-24 text-green-500 mx-auto mb-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2l4-4m0 8a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Completed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment has been successfully processed. Thank you for your purchase!
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleContinueShopping}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
          >
            Continue Shopping
          </button>
          {/* <button
            onClick={handleViewOrders}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-200"
          >
            View Orders
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PaidSuccess;
