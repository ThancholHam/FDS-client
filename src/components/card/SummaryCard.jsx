//rafce

import React,{useState,useEffect} from 'react'
import { ListUserCart ,saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




const SummaryCard = () => {

        const token = useEcomStore((state)=>state.token)
        const [products ,setProducts] = useState([])
        const [cartTotal , setCartTotal] = useState(0)

        const [address ,setAddress] = useState('')
        const [addressSaved , setAddressSaved] = useState(false)

        const navigate = useNavigate()

        useEffect(()=>{
            handleGetUserCart(token)
        },[])

        const handleGetUserCart = (token) =>{
            ListUserCart(token)
            .then((res)=>{
                // console.log(res)
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        const handleSaveAddress = ()=>{
            console.log(address)
            if(!address){
                return toast.warning('Please fill the address')
            }
            saveAddress(token,address)
            .then((res)=>{
                console.log(res)
                toast.success(res.data.message)
                setAddressSaved(true)
            })
            .catch((err)=>{
                console.log(err)
            })

        }

        const handleGoToPayment = ()=>{
            if(!addressSaved){
                return toast.warning('Please fill address ')
            }
            navigate('/user/payment')
        }







        console.log(products)

    return (

        <div className='mx-auto'>
            <div className='flex flex-warp gap-4'>

                {/* Left */}
                <div className='w-2/4'>
                    <div className='bg-gray-300 p-4 rounded-md border shadow-md space-y-4'>

                        <h1 className='font-bold text-lg'>Shipping Address</h1>
                        <textarea 
                        required
                        onChange={(e)=>setAddress(e.target.value)}
                        placeholder='Please fill the shipping address'
                        className='w-full px-2 rounded-md' />

                        <button
                        onClick={handleSaveAddress}
                            className='bg-blue-900 text-white px-2 py-2 rounded-md 
                        shadow-md hover:bg-orange-500 hover:scale-105 '>Save Address</button>
                    </div>
                </div>



                {/* Right */}
                <div className='w-2/4'>
                    <div className='bg-gray-300 p-4 rounded-md border shadow-md space-y-4'>

                        <h1 className='text-lg font-bold'>Your order summary</h1>

                        {/* Item List ,Left*/}


                        {
                            products?.map((item,index)=>
                                    <div key={index}>
                            <div className='flex justify-between items-end'>
                                <div>
                                    <p className='font-bold'>{item.product.title}</p>
                                    <p className='text-sm'>Quantity :{item.count} X {item.product.price}</p>
                                </div>

                                <div>
                                    <p className='text-green-800 font-bold'>{item.count * item.product.price}</p>
                                </div>

                            </div>
                        </div>

                            )
                        }

                





                        <div>
                            <div className='flex justify-between'>
                                <p>Shipping Fee</p>
                                <p>0.00</p>
                            </div>

                            <div className='flex justify-between'>
                                <p>Discount</p>
                                <p>0.00</p>
                            </div>
                        </div>


                        <div>
                            <hr />
                            <div className='flex justify-between'>
                                <p className='font-bold text-green-900'>Total Net</p>
                                <p className='font-bold text-green-900 text-xl'>{cartTotal}</p>
                            </div>
                        </div>

                            <div>
                                <button 
                                onClick={handleGoToPayment}
                                // disabled = {!addressSaved}
                                className='bg-green-600 w-full p-2 py-2 rounded-md shadow-md
                                 text-white hover:bg-green-800 hover:scale-105'>
                                    Proceed to Payment
                                    </button>
                            </div>




                    </div>
                </div>
            </div>

        </div>

    )
}

export default SummaryCard