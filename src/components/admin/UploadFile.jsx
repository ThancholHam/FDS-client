//rafce

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { RemoveFiles, UploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { CircleEllipsis } from 'lucide-react';

const UploadFile = ({ form, setForm }) => {
    //JavaScript
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const hdlOnChange = (e) => {
        //code 
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images //[] empty array
            for (let i = 0; i < files.length; i++) {
                //    console.log(files[i])


                //validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} This is not Photos`)
                    continue
                }
                //Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint backend

                        UploadFiles(token, data)
                            .then((res) => {
                                console.log(res)

                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles

                                })
                                setIsLoading(false)
                                toast.success('Upload Image Success!!!')
                            })
                            .catch((err) => {

                                console.log(err)
                                setIsLoading(false)
                            })

                    },
                    "base64"
                )




            }

        }
    }
    console.log(form)

    const hdlDelete = (public_id)=>{
        
        RemoveFiles(token,public_id)
        .then((res)=>{
            const filterImages = form.images.filter((item)=>{
                console.log(item)
                return item.public_id !== public_id
                
            })
            console.log('filterImages',filterImages)
            setForm({
                ...form,
                images: filterImages
            })
            toast.error(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (

        <div className='my-4'>

            <div className='flex mx-4 gap-4 my-4'>

                {
                    isLoading && <CircleEllipsis className='w-16 h-16 animate-spin' />
                }

            
                     {/*Image*/}
                     {
                        form.images.map((item,index)=>
                            <div className='relative' key={index}> 
                                <img
                                className='w-24 h-24 hover:scale-105'
                                 src={item.url}/>

                                 <span 
                                 onClick={()=>hdlDelete(item.public_id)}
                                 className='absolute top-0 right-0 bg-white p-1 rounded'>X</span>
                            </div>
                        )
                     }
            </div>


            <div>
                <input
                    onChange={hdlOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>


        </div>
    )
}

export default UploadFile