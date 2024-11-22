//rafce

import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'


const Shop = () => {
   const getProduct = useEcomStore((state)=>state.getProduct)
   const products = useEcomStore((state)=>state.products)

   useEffect(()=>{
    getProduct(100)
   },[])

  return (
    <div className='flex'>
      
      {/*Search*/}
       <div className='w-1/4 p-4 bg-gray-200 h-screen'>
        <SearchCard />
       </div>


      {/*Product*/}

   <div className='w-1/2 p-4 h-screen overflow-y-auto'>
    <p className=' text-2xl font-bold mb-4'>All Products</p>

    <div className='flex flex-wrap gap-4'>
      {/*Product Card*/}
          {
            products.map((item,index)=>
              <ProductCard key={index} item={item} />

            )
          }
    

      {/*Product Card*/}


      
    </div>


   </div>



      {/*Cart*/}

     <div className='w-1/4 bg-gray-200 p-4 h-screen overflow-y-auto'>
      <CartCard />
     </div>




      </div>
  )
}

export default Shop