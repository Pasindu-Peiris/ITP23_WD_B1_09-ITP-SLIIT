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
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
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



function SlideBarCar() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, [])



    return (
        <>

            <div className='block-t py-5' data-aos="zoom-in-up">
                <h1>Explore the Vehicle</h1>
                <p>Find and book a great experience.</p>
                <hr />
            </div>

            <div className='container-fluide' id='Slidebar-'>


                <div class="testimonial-slider container-fluid">
                    <div id="carouselExampleControls" class="carousel carousel-dark">
                        <div class="container-fluid">
                            <div class="row"  data-aos="fade-up">

                            <div className='d-flex align-content-center justify-content-end'>
                                    <button className='btn btn-dark p-2 mx-3'>VIEW ALL </button>
                                </div>
    
                                <div className='col-md-12 '>
                                    <Carousel responsive={responsive}
                                        autoPlay
                                        autoPlaySpeed={2000}
                                        infinite>
                                        <div className='cardBlock-1'>
                                            <div class=" m-3">
                                                <div class="card" id='cardv '>
                                                    <div class="img-wrapper"><img src="https://preview.redq.io/turbo/wp-content/uploads/2023/06/Group-48095922.png" class="d-block w-100" alt="..." /> </div>
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
                                                    <div class="img-wrapper"><img src="https://preview.redq.io/turbo/wp-content/uploads/2023/06/Group-48095914.png" class="d-block w-100" alt="..." /> </div>
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
                                                    <div class="img-wrapper"><img src="https://preview.redq.io/turbo/wp-content/uploads/2023/06/Group-48095917.png" class="d-block w-100" alt="..." /> </div>
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
                                                    <div class="img-wrapper"><img src="https://preview.redq.io/turbo/wp-content/uploads/2023/06/Group-48095915.png" class="d-block w-100" alt="..." /> </div>
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

export default SlideBarCar;