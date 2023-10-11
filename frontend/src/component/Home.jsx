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
// eslint-disable-next-line no-unused-vars
import img10 from '../img/te.png';
// eslint-disable-next-line no-unused-vars
import img11 from '../img/te2.png';
// eslint-disable-next-line no-unused-vars
import abimg1 from '../img/carAbout-1.png';
// eslint-disable-next-line no-unused-vars
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
import AboutUS from './AboutUs';



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

                                <div className='text-home' data-aos="zoom-in-up" id='home-s1'>
                                    <h1>MAKE YOUR RIDE EASY & FAST <br /> WITH Rapid Travels</h1>
                                    <p>Rent a car to move from local hosts in 190+ countries.</p>
                                </div>

                            </div>

                            <div className="conti px-5">

                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img1} alt='' style={{width:"35px"}} />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>

                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img2} alt='' style={{width:"35px"}} />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>


                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img3} alt='' style={{width:"35px"}} />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>


                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img4} alt='' style={{width:"35px"}} />
                                        <p>SEE MORE</p>
                                    </a>

                                </div>


                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img5} alt='' style={{width:"35px"}} />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>

                                <div className='item-1'>
                                    <a href='/vehicle_main' data-aos="zoom-in-down">
                                        <img src={img6} alt='' style={{width:"35px"}} />
                                        <p>SEE MORE</p>
                                    </a>
                                </div>

                            </div>

                            <SlideBarV />
                            <div id='about'><AboutUS /></div>
                            <SlideBarCar />
                            
                            


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
                                        <p class="card-text" style={{ fontSize: "1rem", textAlign: "center" }} id='new-twxt'>We've designed our platform to make the reservation process quick. </p>
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

                                                                        <button style={{ fontSize: "1.1rem", textAlign: "justify" }} id='new-twxt' class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                            How Do I Change My Billing Information?
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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