import React, { useEffect, useState,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch=useDispatchCart();
    let options=props.options;
    let priceOptions=Object.keys(options);
    let priceRef=useRef();

    let data=useCart();

    let [qty,setQty]=useState(1);
    let [size,setSize]=useState("");

    let foodItem=props.foodItem;
    let finalPrice=qty*parseInt(options[size])

    const handleAddtoCart=async()=>{
        console.log("it is from ",foodItem.restaurant)
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;
                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty,restaurant:foodItem.restaurant })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc,restaurant:foodItem.restaurant})
              //console.log("Size different so simply ADD one more to the list")
              return
            }
            return
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc,restaurant:foodItem.restaurant })
        return
    }

    
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem" }}>
                    <img src={foodItem.img} className="card-img-top" alt="..." style={{objectFit:"Fill",height:"200px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>
                        
                        <p className='card-text'>{foodItem.restaurant}</p>
                        <div className='container w-100'>
                            <select className='mr-2 h-100 text-white bg-warning rounded border-0' onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 text-white bg-warning rounded border-0' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                Rs. {finalPrice}/-
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className='btn btn-warning text-white justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
