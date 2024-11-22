//rafce

import React from 'react'
import { ListChecks } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link ,useNavigate} from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';


const ListCart = () => {
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state)=>state.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    const navigate = useNavigate()
    

    const handleSaveCart = async()=>{
        await createUserCart(token,{cart})
        .then((res)=>{
            console.log(res)
            toast.success('Add to Cart Success!!! ^-^')
            navigate('/checkout')
        })
        .catch((err)=>{
            console.log('err',err)
        })

    }


    return (
        <div className='bg-gray-300 rounded-ms p-4'>

            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <ListChecks size={36} />
                <p className='text-2xl font-bold'>Order list on cart {cart.length} products</p>
            </div>

            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                {/* Left */}
                <div className='col-span-2'>
                    {/* Card */}

                    {
                        cart.map((item, index) =>

                            <div key={index}
                                className='bg-white p-2 rounded-md shadow-md mb-2'>
                                {/* Row1 */}

                                <div className='flex justify-between mb-2'>

                                    {/* Left */}
                                    <div className='flex gap-2 items-center'>

                                        {
                                            item.images && item.images.length > 0
                                                ? <img
                                                    className='w-16 h-16 rounded-md'
                                                    src={item.images[0].url} />
                                                : <div className='w-16 h-16 bg-gray-300 rounded-md flex text-center items-center'>
                                                    NO Image
                                                </div>
                                        }







                                        <div>
                                            <p className='font-bold'>{item.title}</p>
                                            <p className='text-sm'>{item.price} x {item.count}</p>
                                        </div>

                                    </div>

                                    {/* right */}
                                    <div>
                                        <div className='font-bold text-green-700'>
                                            {item.price * item.count}
                                        </div>

                                    </div>
                                </div>




                            </div>

                        )
                    }
                </div>

                {/* Right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
                    <p className='text-2xl font-bold'>Total Price</p>
                    <div className='flex justify-between'>
                        <span>Total Net</span>
                        <span className='text-2xl'>{getTotalPrice()}</span>

                    </div>

                    <div className='flex flex-col gap-2'>

                        {
                            user
                                ? <Link>
                                    <button 
                                    onClick={handleSaveCart}
                                    className='bg-green-500 w-full rounded-md text-white py-2 shadow-md hover:bg-green-700'>Check Out</button>
                                </Link>

                                : <Link to={'/login'}>
                                    <button className='bg-blue-500 w-full rounded-md text-white py-2 shadow-md hover:bg-blue-700'>Login</button>
                                </Link>
                        }






                        <Link to={'/shop'}>
                            <button className='bg-red-600 w-full rounded-md text-white py-2 shadow-md hover:bg-orange-500'>Edit</button>
                        </Link>
                    </div>

                </div>


            </div>


        </div>







    )
}

export default ListCart