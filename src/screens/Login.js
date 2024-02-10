import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'

export default function Login() {
  const [credentials,setcredentials]=useState({email:"",password:""})
  let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        
            e.preventDefault();
            console.log(JSON.stringify({
                email:credentials.email,
                password:credentials.password
            }))
            
            const response=await fetch("http://localhost:5000/api/login",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json' 
                },
                body:JSON.stringify({
                    email:credentials.email,
                    password:credentials.password
                })
            })
            const json=await response.json();
            console.log(json);
            if(!json.success)
            {
                alert("Enter valid credentials");
            }
            else{
                localStorage.setItem("userEmail",credentials.email)
                localStorage.setItem("authToken",json.authToken)
                localStorage.setItem("userProfile",json.userProfile)
                localStorage.setItem("name",json.username)
                console.log(localStorage.getItem("authToken"))
                console.log(localStorage.getItem("userProfile"))
              navigate("/")
            }
    }

    const onChange=(event)=>{
        setcredentials(credentials=>({...credentials,[event.target.name]:event.target.value}))
    }
  return (
    <>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="m-3 btn btn-primary">Login</button>
                <Link to="/createUser" className="m-3 btn btn-danger">Not registered?</Link>
            </form>
        </div>
        </>
  )
}
