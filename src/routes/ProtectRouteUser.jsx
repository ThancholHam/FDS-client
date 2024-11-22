//rafce

import React ,{useState,useEffect}from 'react'
import useEcomStore from '../store/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteUser = ({eLement}) => {
    const [ ok,setOk] = useState(false)
    const user = useEcomStore((state)=> state.user)
    const token = useEcomStore((state)=> state.token)
   
    useEffect(()=>{
       if(user && token){
        //send to backend
        currentUser(token)
        .then((res)=>setOk(true))
        .catch((err)=>setOk(false))
       }
    },[])
     

  return ok? eLement : <LoadingToRedirect />
}

export default ProtectRouteUser