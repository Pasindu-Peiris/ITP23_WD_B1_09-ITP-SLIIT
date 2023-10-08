import React, { useEffect } from 'react';
import '../App.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
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



function SlideBar() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, [])



    return (
        <>

            <div className='block-t py-5' data-aos="zoom-in-up">
                <h1>Explore the Tour</h1>
                <p>Find and book a great experience.</p>
                <hr />
            </div>

            <div className='container-fluid ' id='Slidebar'>


                <div class="testimonial-slider container-fluid">
                    <div id="carouselExampleControls" class="carousel carousel-dark">
                        <div class="container-fluid">
                            <div class="row">

                                <div class="col-md-5">
                                    <div class="testimonial-title">
                                        <i class="fa-solid fa-quote-left py-3" style={{ color: "#171716" }}></i>
                                        <h2 class="fw-bold display-6 ">Don't just dream about it, plan it. Travel.</h2>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>


                                <div className='col-md-7 '>
                                    <Carousel responsive={responsive}
                                        autoPlay
                                        autoPlaySpeed={3000}
                                        infinite>
                                        <div className='cardBlock-1'>
                                            <div class=" m-3">
                                                <div class="card" id='cardv '>
                                                    <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" class="d-block w-100" alt="..." /> </div>
                                                    <div class="card-body" id="tit-card">
                                                        <h5 class="card-title" >Card title 2</h5>
                                                        <p class="card-text">Some quick example text to build on the card title and make up
                                                            the bulk of the
                                                            card's content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='cardBlock-1'>
                                            <div class=" m-3">
                                                <div class="card" id='cardv '>
                                                    <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" class="d-block w-100" alt="..." /> </div>
                                                    <div class="card-body" id="tit-card">
                                                        <h5 class="card-title" >Card title 2</h5>
                                                        <p class="card-text">Some quick example text to build on the card title and make up
                                                            the bulk of the
                                                            card's content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='cardBlock-1'>
                                            <div class=" m-3">
                                                <div class="card" id='cardv '>
                                                    <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" class="d-block w-100" alt="..." /> </div>
                                                    <div class="card-body" id="tit-card">
                                                        <h5 class="card-title" >Card title 2</h5>
                                                        <p class="card-text">Some quick example text to build on the card title and make up
                                                            the bulk of the
                                                            card's content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='cardBlock-1'>
                                            <div class=" m-3">
                                                <div class="card" id='cardv '>
                                                    <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" class="d-block w-100" alt="..." /> </div>
                                                    <div class="card-body" id="tit-card">
                                                        <h5 class="card-title" >Card title 2</h5>
                                                        <p class="card-text">Some quick example text to build on the card title and make up
                                                            the bulk of the
                                                            card's content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='cardBlock-1 m-x-4'>
                                            <div class=" m-3">
                                                <div class="card" id='cardv '>
                                                    <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" class="d-block w-100" alt="..." /> </div>
                                                    <div class="card-body" id="tit-card">
                                                        <h5 class="card-title" >Card title 2</h5>
                                                        <p class="card-text">Some quick example text to build on the card title and make up
                                                            the bulk of the
                                                            card's content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>


    )


}

export default SlideBar;