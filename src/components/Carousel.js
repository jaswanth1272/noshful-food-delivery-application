import React from 'react'

export default function Carousel() {
  return (
    <div>
       <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{height: "500px"}}>
            <div className="carousel-inner" id="carousel">
                <div className="carousel-item active">
                <img src="https://c4.wallpaperflare.com/wallpaper/156/526/504/chicken-apples-grilled-herbs-wallpaper-preview.jpg" className="d-block w-100" style={{height:"700px",objectFit:"cover"}} alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="https://wallpapers.com/images/high/hd-food-background-mzp4usu5hes6dgg3.webp" className="d-block w-100" style={{height:"500px",objectFit:"cover"}} alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{height:"600px",objectFit:"cover"}} alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
    </div>
  )
}
