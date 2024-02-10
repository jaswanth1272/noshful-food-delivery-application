import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { Link,useNavigate } from 'react-router-dom'


export default function Payment() {
    const navigate=useNavigate();

    let data = useCart();
    let dispatch = useDispatchCart();
    {console.log("data is")}
    {console.log(data)}

    const onPaid = async ()=>{
        let userEmail = localStorage.getItem("userEmail");
    
        let response = await fetch("http://localhost:5000/api/orderData", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
        })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
        dispatch({ type: "DROP" })
        }
        navigate("/")
    }

    const onBack=()=>{
        navigate("/")
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div className="container text-center p-5">
        <h1 className='text-success'>Please make the payment</h1>
        <hr></hr>
        <h3 className='m-4'>Scan the following QR-code and pay the amount</h3>
        <div>
            <img src={process.env.PUBLIC_URL + '/qr-code.jpg'} alt="QR Code" style={{height:"250px"}}/>
        </div>
        <h4>Pay Amount: Rs.{totalPrice}</h4>
        <div className='d-flex flex-row justify-content-center'>
            <button className='btn btn-danger m-3' onClick={onBack}>Back</button>
            <button className='btn btn-success m-3' onClick={onPaid}>Paid</button>
        </div>
        
    </div>
  )
}

