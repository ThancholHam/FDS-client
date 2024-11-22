//rafce

import React from 'react'
import { ShoppingBag } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';

const ProductCard = ({ item }) => {
    const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)
    // console.log(item)
    return (
        <div className='border rounded-md shadow-md p-2 w-48'>

            <div>
                {
                    item.images && item.images.length > 0
                        ? <img src={item.images[0].url} className='rounded-md w-full object-cover hover:scale-110 hover:duration-200' />
                        : <div className='w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'>
                            NO Images
                        </div>
                }




            </div>


            <div className='py-2'>
                <p className='text-xl font-bold'>{item.title}</p>
                <p className='text-sm text-gray-500'>{item.description}</p>
            </div>


            <div className='flex justify-between items-center '>
                <span className='text-xl font-bold'>{item.price}</span>
                <button 
                onClick={()=>actionAddtoCart(item)}
                className='bg-green-400 rounded-md p-2 hover:bg-yellow-300 shadow-md'><ShoppingBag /></button>
            </div>
        </div>
    )
}

export default ProductCard