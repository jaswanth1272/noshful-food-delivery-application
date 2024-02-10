import React,{useState} from 'react'
import Badge from 'react-bootstrap/Badge'
import { Link,useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart' 
import { useCart } from './ContextReducer';

export default function Navbar() {
  
  let loginProfile=localStorage.getItem("userProfile")
  const [cartView,setCartView]=useState(false);
  let data = useCart();
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("name")
    navigate("/login");
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="/" style={{fontWeight:"bold",fontStyle:"italic",fontSize:"25px",marginLeft:"20px",color:"black"}}>NOSHFUL</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5 navbar-items" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken")
              ?<li className="nav-item">
                <Link className="nav-link active fs-5 navbar-items" aria-current="page" to="/myorders">My Orders</Link>
                </li>
              :""
              }
            </ul>
            
              {(!localStorage.getItem("authToken"))
                ?<div className='d-flex'>
                  <Link className="btn bg-white text-warning mx-1" to="/login">Login</Link>
              
                  <Link className="btn bg-white text-warning mx-1" to="/createUser">Sign Up</Link>
                  </div>
                
                :
                <div className='d-flex'>
                    {/*
                      loginProfile==="Customer"
                      ?
                      :*/
                    }
                    <div className="text-white mx-2" onClick={()=>{setCartView(true)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg> 
                        <Badge pill bg="danger">{data.length}</Badge>
                    </div>
                    {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                    <div className='text-white mx-3' onClick={()=>{navigate("/discussions")}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-text" viewBox="0 0 16 16">
    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894m-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
    <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8m0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
  </svg>
                    </div>

                    <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                      Logout
                    </div>
                </div>
              }
                
            
          </div>
        </div>
      </nav>
    </div>
  )
}
