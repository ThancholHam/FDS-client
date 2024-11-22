//rafce

import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const SearchCard = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])

    const [price, setPrice] = useState([1000, 1000000])
    const [ok, setOk] = useState(false)

    // console.log(categories)
    useEffect(() => {
        getCategory()
    }, [])


    //step 1 Search by text
    console.log(text)

    useEffect(() => {
        //code
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })

            } else {
                getProduct()

            }

        }, 300)
        return () => clearTimeout(delay)

    }, [text])

    //step 2 Search by category

    const handleCheck = (e) => {
        console.log(e.target.value)
        const inCheck = e.target.value      //ค่าที่ที่ติ๊ก
        const inState = [...categorySelected]  // empty []
        const findCheck = inState.indexOf(inCheck) //if not found ,return -1

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })

        } else {
            getProduct()
        }
    }
    // console.log(categorySelected)



    //step 3 Search by price

    useEffect(() => {
        actionSearchFilters({price})

    }, [ok])
    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)
        setTimeout(()=>{
            setOk(!ok)
        },300)
    }


    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>Search Product</h1>
            {/*Search by text*/}
            <input
                onChange={(e) => setText(e.target.value)}
                placeholder='Search Products...'
                className='border round-md w-full mb-4 px-2'
            />

            <hr />
            {/*Search by category*/}

            <div>
                <h1 className='text-xl font-bold'>Categories</h1>
            </div>

            <div>
                {
                    categories.map((item, index) =>
                        <div className='flex gap-2'>
                            <input
                                onChange={handleCheck}
                                value={item.id}
                                type='checkbox' />
                            <label>{item.name}</label>
                        </div>
                    )
                }
            </div>

            <hr />

            {/*Search by text*/}
            <div>
                <h1>Search Price</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min :{price[0]}</span>
                        <span>Max :{price[1]}</span>
                            
                        
                    </div>
                    <Slider
                    onChange={handlePrice}
                    range
                    min={0}
                    max={500000}
                    defaultValue={[1000,500000]}
                     />
                </div>
            </div>

        </div>



    )
}

export default SearchCard 