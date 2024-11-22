//rafce


import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/strip";
import useEcomStore from '../../store/ecom-store'
import CheckoutForm from "../../components/CheckOutForm";

const stripePromise = loadStripe("pk_test_51QCzsSEijXIIMKMhkc8qCnu6WfaWaSYdAVz37Bi4timv9qY8T4TNkheNhwXE0k5gbGGq0nDrZvILEEgsZMXEFve800QeeWl34f");

const Payment = () => {
  const token = useEcomStore((state)=>state.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
   payment(token)
   .then((res)=>{
    console.log(res)
    setClientSecret(res.data.clientSecret)
   })
   .catch((err)=>{
    console.log(err)
   })
  },[])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';



  return (
    <div>


      {
        clientSecret && (
          
            <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>

            <CheckoutForm />
            </Elements>
          
        )
      }

    </div>
  )
}

export default Payment