import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
    const [search,setSearch]=useState('');
    const [foodCat,setFoodCat]=useState([]);
    const [foodItem,setFoodItem]=useState([]);

    let loginProfile=localStorage.getItem("userProfile")
    
    if(loginProfile==="Restaurant")
    {
        var restaurantName=localStorage.getItem("name")
    }
    const loadData=async ()=>{
       let response = await fetch("http://localhost:5000/api/foodData",{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        }
       });
       let resp=await response.json();

       setFoodCat(resp[1])
       setFoodItem(resp[0])

       console.log(resp[0],resp[1]);

    }

    useEffect(()=>{
        loadData();
    },[])

    return (
        <div>
            <div><Navbar /></div>
            {
                loginProfile==="Customer"
                ?
                <div className="container mt-4 mb-4" style={{zIndex:"10"}}>
                    <div className="d-flex justify-content-center">
                        <input className="form-control me-2" type="search" placeholder="Search restaurants and Items here" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                    </div>
                </div>
                :<div>"""""</div>
            }
            
            <div><Carousel/></div>
            {
                loginProfile==="Customer"
                ?
                <div className='container'>
                {
                    foodCat !==0
                    ? foodCat.map((data)=>{
                        return (<div className='row'>
                            <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodItem !==0
                            ?foodItem.filter((item)=> item.CategoryName===data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase()) || item.restaurant.toLowerCase().includes(search.toLowerCase())))
                            .map(filterItem=>{
                                return (
                                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card foodItem={filterItem}
                                        options={filterItem.options[0]}
                                        ></Card>
                                    </div>
                                )
                            })
                            :<div>No such Datafound</div>}
                        </div>
                        )
                    })
                    :<div>""""""</div>
                }
                </div>
                :
                <div className='container'>
                {
                    foodCat !==0
                    ? foodCat.map((data)=>{
                        return (<div className='row'>
                            <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodItem !==0
                            ?foodItem.filter((item)=> item.CategoryName===data.CategoryName && item.restaurant===restaurantName)
                            .map(filterItem=>{
                                return (
                                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card foodItem={filterItem}
                                        options={filterItem.options[0]}
                                        ></Card>
                                    </div>
                                )
                            })
                            :<div>No such Datafound</div>}
                        </div>
                        )
                    })
                    :<div>""""""</div>
                }
                </div>
            }
            
            <div><Footer /></div>
        </div>

    )
}
