//rafce

import React ,{useState,useEffect}from 'react'
import useEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteAdmin = ({eLement}) => {
    const [ ok,setOk] = useState(false)
    const user = useEcomStore((state)=> state.user)
    const token = useEcomStore((state)=> state.token)
   
    useEffect(()=>{
      console.log(user,token)
       if(user && token){
        //send to backend
        currentAdmin(token)
        .then((res)=>setOk(true))
        .catch((err)=>setOk(false))
       }
    },[])
     

  return ok? eLement : <LoadingToRedirect />
}

export default ProtectRouteAdmin