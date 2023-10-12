import React, { useState, useEffect } from 'react';
import '../App.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import Seat from '../img/seat.png'

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};



function SlideBar2() {

    const [tours, setTours] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        axios.get("http://localhost:8090/tour/all").then((res) => {
            //console.log(res);
            setTours(res.data);

        }).catch((err) => {
            alert(err.message);
        })

    }, [])

    return (
        <>
            <div id="tour">
                <div className='block-t py-2' data-aos="zoom-in-up">
                    <h2>You might also like...</h2>
                    <p>Find and book a great experience.</p>
                    <hr />
                </div>

                <div className='container-fluid' id='Slidebar-'>


                    <div class="testimonial-slider container-fluid">
                        <div id="carouselExampleControls" class="carousel carousel-dark">
                            <div class="container-fluid">
                                <div class="row">

                                


                                    <div className='col-md-12' data-aos="fade-up">
                                        <Carousel responsive={responsive}
                                            autoPlay
                                            autoPlaySpeed={2000}
                                            infinite>
                                            {tours.map((tour) => {
                                                return (
                                                    <div className='cardBlock-1'>
                                                        <div class=" m-3">
                                                            <a href={'/TourDetails/' + tour._id} style={{ textDecoration: "none" }}>
                                                                <div class="card" id='cardv '>
                                                                    <div class="img-wrapper">
                                                                        <img src={`http://localhost:8090/images/` + tour.image} class="d-block w-100" alt={tour.image} />
                                                                    </div>
                                                                    <div class="card-body" id="tit-card">
                                                                        <span className='fs-6 text-secondary fw-bold p-0'>DAY TRIP</span>
                                                                        <h5 class="card-title py-1 d-flex align-items-center justify-content-between" ><strong>{tour.tourName}</strong> <font className='fs-6'> <img src={Seat} alt='' width={35} /></font></h5>

                                                                        <span className='fs-6 fw-bold'><font className='text-danger'>Date : {tour.date}</font> | Small Group</span>

                                                                        <p class="card-text fw-bold " style={{ fontSize: "1.1rem", float: "right" }}>Rs. {tour.totalCost.toFixed(2)}/=</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Carousel>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )


}

export default SlideBar2;