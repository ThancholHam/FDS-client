import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-[url('../../public/bg.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className='text-5xl font-bold text-center text-gray-700'>About US</h1>
        <h1 className='text-4xl font-bold text-center text-gray-700'>FDS</h1>
        <h1 className="text-2xl font-extrabold text-center text-gray-700 mb-6">
          Freedom Delivery Services
        </h1>
        <p className="text-gray-600 text-2xl text-center font-bold">
          We're ready at your service.<br />
          
          Who we are ? 
          <h1 className='text-sm'>We are firearms dealer who can respone for people who seeking for the way of freedom.
            With our services , it can guarantee from all customers around the world with good quality of our products and we can delivery you tools which can break you free
            by crossing the world to anywhere you want. If you belive in the way of freedom , JOIN US !!! 
          </h1>

          <h1 className='Font-bold text-xl'>Contact US</h1>
          <h1 className='text-sm'>"seekingFreedom@gmail.com"</h1>
          <h1 className='text-sm'>We will reply you ASAP</h1>
        </p>
        
      </div>
    </div>
  )
}

export default Home
