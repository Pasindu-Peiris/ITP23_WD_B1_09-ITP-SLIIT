import React, { useEffect } from 'react';
import '../App.css';
import "react-multi-carousel/lib/styles.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import img10 from '../img/te.png';
import img11 from '../img/te2.png';



function AboutUS() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, [])



    return (
        <div className=''>

            <div className='block-t py-5' data-aos="zoom-in-up">
                <h1>Why Rapaid Travels</h1>
                <p>Find and book a great experience.</p>
                <hr />
            </div>

            <div className='container-fluid ' id='sw'>


                <div class="testimonial-slider container-fluid">
                    <div id="carouselExampleControls" class="carousel carousel-dark">
                        <div class="container-fluid">
                            <div class="container-fluid row">

                                <div className='col-md-6' data-aos="fade-up" style={{backgroundColor:""}}>

                                    <div className='cardBlock-1  mt-5' >
                                        <div class="  mt-4">
                                            <div class="card" id='cardv' style={{ border: "none", backgroundColor: "#6451ce00" }}>
                                                <div class="img-wrapper"><img src="https://preview.redq.io/turbo/wp-content/uploads/2023/07/zip-car.webp" class="d-block w-100 " width={500}  alt="..." /> </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6" data-aos="fade-up">
                                    <div class="testimonial-title text-end ">
                                        <i class="fa-solid fa-quote-right pb-4 " style={{ color: "#28242bd6" }}></i>
                                        <h2 class="fw-bold display-6 ">Don't just dream about it <br></br> plan it. Travel.</h2>
                                        <p className='mt-2 py-3 ps-3 text-justify' style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-tw'>Rapid Travels is a domestic tours and travel management company which provides domestic tours and travel services within Sri Lanka. The system is an integrated management system which combines multiple management systems namely rental management system, flight management system, boat tours reservation system and finally bus reservation system.</p>
                                    </div>

                                    <div class="row gy-4 gy-md-0 gx-xxl-5X mt-4">
                                        <div class="col-12 col-md-6 ps-4">
                                            <div class="d-flex">
                                                <div class=" text-primary">
                                                    <img src={img11} alt='' width={"50px"} className='me-3 my-3' />
                                                </div>
                                                <div>
                                                    <h4 class="mb-3" style={{ color: "" }}>Vehicle rental</h4>
                                                    <p class="text-secondary mb-3">You can get vehicle easily from Rapid travels </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="d-flex">
                                                <div class=" text-primary">

                                                    <img src={img10} alt='' width={"55px"} className='me-3 my-2' />

                                                </div>
                                                <div>
                                                    <h4 class="mb-3" style={{ color: "" }}>Tours and travel</h4>
                                                    <p class="text-secondary mb-3">Domestic tours and travel services within Sri Lanka</p>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>



                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>



    )


}

export default AboutUS;