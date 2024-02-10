import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState,useEffect } from 'react';
import Message from '../components/Message';

export default function Discussions() {
    const [messageText,setMessageText]=useState('');
    const [disc,setDisc]=useState([]);
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          onText(); // Call your onText function here
        }
      };

    const onText=async()=>{

        console.log("sending..")
        console.log(localStorage.getItem("userEmail"))
        console.log(messageText)
        
        let response = await fetch("http://localhost:5000/api/discussions/post",{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            message_data:{
                email:localStorage.getItem("userEmail"),
                message:messageText
            }
        })
       });
       
       setMessageText('');
    //    console.log("added")
        loadDisc();
    }

    const loadDisc=async ()=>{
        let response = await fetch("http://localhost:5000/api/discussions",{
         method:'POST',
         headers:{
             "Content-Type":'application/json'
         }
        });
        let resp=await response.json();
 
        setDisc(resp[0])
 
        console.log("in discussions",resp);
 
     }
 
     useEffect(()=>{
         loadDisc();
     },[])

  return (
    <div>
        <div><Navbar /></div>
        <div className='d-flex flex-column justify-content-end'>
            <div className='container'>
                {console.log("discussions are ",disc)}
                    {
                        disc !==0
                            ?disc.map(filterItem=>{
                                    return (
                                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                            {console.log("in sending m",filterItem)}
                                            <Message disc={filterItem} key={filterItem._id}></Message>
                                        </div>
                                    )
                                })
                        :<div>No such Datafound</div>
                    }
            </div>
            <div className="container mt-4 mb-4" style={{zIndex:"10"}}>
                    <div className="d-flex justify-content-center">
                        <input className="form-control me-2" type="text" placeholder="Message here" onKeyDown={handleKeyPress} value={messageText} onChange={(e)=>{setMessageText(e.target.value)}}/>
                    </div>
            </div>
        </div>
        <div><Footer/></div>
    </div>
  )
}
