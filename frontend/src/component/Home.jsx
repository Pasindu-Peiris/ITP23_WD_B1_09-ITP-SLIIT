import '../App.css';
import img1 from '../img/Car.png';
import img2 from '../img/Van.png';
import img3 from '../img/palne.png';
import img4 from '../img/bus.png'
import img5 from '../img/bike.png';
import img6 from '../img/boat.png';
import img7 from '../img/easy.png';
import img8 from '../img/good.png';
import img9 from '../img/loc.png';
import img10 from '../img/te.png';
import img11 from '../img/te2.png';
// eslint-disable-next-line no-unused-vars
import abimg1 from '../img/carAbout-1.png';
import abimg2 from '../img/carAbout-2.webp';
import Nav from './Nav';
import Footer from './footer';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from './Preload';
import Conatct from './Conatct';
import SlideBarCar from './VSslideCar'
import SlideBarV from './VSlide';



function Home() {


    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        AOS.init({ duration: 1000 });

        setTimeout(() => {

            setData();
            setIsLoading(false); // Set isLoading to false when data is ready
        }, 2000); // Simulate a 2-second data loading delay

    })




    return (

        <div>
            {isLoading ? (
                <Loading />
            ) : (
                // Display your content when data is ready
                <div>
                    {
                        <>
                            <Nav />
                            <div className='home-hero' style={{}}>

                                <div className='text-home' data-aos="zoom-in-up">
                                    <h1>MAKE YOUR RIDE EASY & FAST <br /> WITH Rapid Travels</h1>
                                    <p>Rent a car to move from local hosts in 190+ countries.</p>
                                </div>

                            </div>



                            <div className="conti ">

                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img1} alt='' />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>

                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img2} alt='' />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>


                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img3} alt='' />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>


                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img4} alt='' />
                                        <p>SEE MORE</p>
                                    </a>

                                </div>


                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img5} alt='' />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>

                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img6} alt='' />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>

                            </div>

                            <SlideBarV />


                            <div className='text-head' data-aos="zoom-in-up">

                                <div className='block-t'>
                                    <h1>Why Choose Us</h1>
                                    <p>Find and book a great experience.</p>
                                    <hr />
                                </div>


                            </div>


                            <div class="card-group container contbox-5">

                                <div class=" card card-1" data-aos="fade-up">

                                    <div class="card-body cart" >
                                        <img src={img7} alt='' />
                                        <h5 class="card-title p-3">Easy & Fast Booking</h5>
                                        <p class="card-text" style={{fontSize: "1rem", textAlign: "center"}} id='new-twxt'>We've designed our platform to make the reservation process quick. </p>
                                        <p class="card-text"><small class="text-body-secondary"></small></p>
                                    </div>
                                </div>

                                <div class="card card-1" data-aos="fade-up">

                                    <div class="card-body cart">
                                        <img src={img8} alt='' />
                                        <h5 class="card-title p-3">Customer Satisfaction</h5>
                                        <p class="card-text" style={{ fontSize: "1rem", textAlign: "center" }} id='new-twxt'>Happy customers often share their positive experiences to our company.</p>
                                        <p class="card-text"><small class="text-body-secondary"></small></p>
                                    </div>
                                </div>

                                <div class=" card card-1" data-aos="fade-up">

                                    <div class="card-body cart">
                                        <img src={img9} alt='' />
                                        <h5 class="card-title p-3">Many Pickup Location</h5>
                                        <p class="card-text" style={{ fontSize: "1rem", textAlign: "center" }} id='new-twxt'>We make your pickup experience simple and convenient.</p>
                                        <p class="card-text"><small class="text-body-secondary"></small></p>
                                    </div>
                                </div>

                            </div>



                            <div className='block-t py-5' data-aos="zoom-in-up">
                                <h1>Why Are We</h1>
                                <p>Find and book a great experience.</p>
                                <hr />
                            </div>

                            <div className='section-about container-fluid section-about-2' id='about'>

                                <section class="py-3 py-md-5 py-xl-8 ">
                                    <div class="container">
                                        <div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                                            <div class="col-12 col-lg-6 col-xl-5" >
                                                <img src={abimg2} class="img-fluid rounded" loading="lazy" alt="" data-aos="fade-right" style={{ width:"400px" }} />
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-7">
                                                <div class="row justify-content-xl-center" >
                                                    <div class="col-12 col-xl-11" data-aos="fade-left">

                                                        <p class=" fs-5  mb-5 text-capitalize fw-bold">About Rapaid Travels</p>


                                                        <p class="mb-4" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt'>Rapid Travels is a domestic tours and travel management company which provides domestic tours and travel services within Sri Lanka. The system is an integrated management system which combines multiple management systems namely rental management system, flight management system, boat tours reservation system and finally bus reservation system.   </p>
                                                        <p class="mb-5" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt' >Rapid Travels provides easy and effective solutions for domestic travels and tours reducing the major risk factors which arise physically and the components which directly and in-directly interact with the system. The company’s mission is to operate using innovative technology to improve the customer experience and expand the business while bringing positive change to the market.</p>


                                                        <div class="row gy-4 gy-md-0 gx-xxl-5X">
                                                            <div class="col-12 col-md-6">
                                                                <div class="d-flex">
                                                                    <div class=" text-primary">
                                                                        <img src={img11} alt='' width={"50px"} className='me-3' />
                                                                    </div>
                                                                    <div>
                                                                        <h4 class="mb-3" style={{ color: "" }}>Vehicle rental</h4>
                                                                        <p class="text-secondary mb-3">You can get vehicle easily from Rapid travels </p>
                                                                        <a href="/vehicle_main" className='but mt-2' style={{ color: "#171616" }}>SEE MORE</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 col-md-6">
                                                                <div class="d-flex">
                                                                    <div class=" text-primary">

                                                                        <img src={img10} alt='' width={"50px"} className='me-3' />

                                                                    </div>
                                                                    <div>
                                                                        <h4 class="mb-3" style={{ color: "" }}>Tours and travel</h4>
                                                                        <p class="text-secondary mb-3">Domestic tours and travel services within Sri Lanka</p>
                                                                        <a href="!#" className='but mt-3' style={{ color: "#171616" }}>SEE MORE</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>

                            <SlideBarCar />




                            <div className='text-head' data-aos="zoom-in-up" id='faq'>

                                <div className='block-t'>
                                    <h1>FAQs</h1>
                                    <p>Find and book a great experience.</p>
                                    <hr />
                                </div>

                            </div>

                            <div className='Faq-bg p-5'>


                                <div className='container mt-5'>

                                    <section class="bsb-faq-2 py-3 py-md-2 py-xl-8 " data-aos="fade-up">
                                        <div class="container">
                                            <div class="row gy-5 gy-lg-0">

                                                <div class="col-12 col-lg-9 mx-auto">
                                                    <div class="row justify-content-xl-end">
                                                        <div class="col-12 col-xl-11">
                                                            <div class="accordion accordion-flush" id="accordionExample">
                                                                <div class="accordion-item mb-4 shadow-sm">
                                                                    <h2 class="accordion-header" id="headingOne">
                                                                        <button class="accordion-button bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id='new-twxt' style={{ fontSize: "1.1rem", textAlign: "justify" }}>
                                                                            How Do I Change My Billing Information?
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                        <div class="accordion-body" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt'>
                                                                            Morbi non dui tristique, porttitor tellus vitae, dapibus risus. Suspendisse eros erat, rhoncus sit amet lobortis vel, lacinia fermentum tortor. Sed nec pellentesque urna.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="accordion-item mb-4 shadow-sm">
                                                                    <h2 class="accordion-header" id="headingTwo">
                                                                        <button style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt' class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                            How Does Payment System Work?
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo">
                                                                        <div class="accordion-body" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt'>
                                                                            Morbi non dui tristique, porttitor tellus vitae, dapibus risus. Suspendisse eros erat, rhoncus sit amet lobortis vel, lacinia fermentum tortor. Sed nec pellentesque urna.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="accordion-item mb-4 shadow-sm">
                                                                    <h2 class="accordion-header" id="headingThree">
                                                                        <button style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt' class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                            Will taxes be included in my monthly invoice?
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree">
                                                                        <div class="accordion-body" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt'>
                                                                            Morbi non dui tristique, porttitor tellus vitae, dapibus risus. Suspendisse eros erat, rhoncus sit amet lobortis vel, lacinia fermentum tortor. Sed nec pellentesque urna.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="accordion-item mb-4 shadow-sm">
                                                                    <h2 class="accordion-header" id="headingFour">
                                                                        <button style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt' class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                            What currency will I be charged in?
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour">
                                                                        <div class="accordion-body" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt'>
                                                                            Morbi non dui tristique, porttitor tellus vitae, dapibus risus. Suspendisse eros erat, rhoncus sit amet lobortis vel, lacinia fermentum tortor. Sed nec pellentesque urna.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="accordion-item shadow-sm">
                                                                    <h2 class="accordion-header" id="headingFive">
                                                                        <button style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt' class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                            How Do I Cancel My Account?
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive">
                                                                        <div class="accordion-body" style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt'>
                                                                            Morbi non dui tristique, porttitor tellus vitae, dapibus risus. Suspendisse eros erat, rhoncus sit amet lobortis vel, lacinia fermentum tortor. Sed nec pellentesque urna.
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </section>



                                </div>
                            </div>

                            <div id='Contact'>
                                <Conatct />

                            </div>



                            <Footer />






                        </>




                    }
                </div>
            )}
        </div>

    )
}

export default Home;