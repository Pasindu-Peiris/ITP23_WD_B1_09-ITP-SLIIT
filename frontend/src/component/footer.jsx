import logo from '../img/RapidTravelss.png';
import '../App.css'
import React, { useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



function Footer() {


    useEffect(() => {

        AOS.init({ duration: 1500 });


    })


    return (


        <div className="container-flude fotter">


            <footer
                className="text-center text-lg-start text-white"
                style={{ backgroundColor: "#1e1e21" }}
            >

                <section
                    className="d-flex justify-content-center p-4"

                    style={{ backgroundColor: "#1a191a" }}
                >

                    <div className="me-5 cont">
                        <h2>Need help renting Online ? <span>(94) 77 99 74368</span></h2>
                    </div>



                </section>


                <section
                    className="d-flex justify-content-between p-4"

                    style={{ backgroundColor: "#6351ce" }}
                >

                    <div className="me-5">
                        <span>Get connected with us on social networks:</span>
                    </div>



                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-instagram"></i>
                        </a>
                        
                        
                    </div>

                </section>



                <section className="">
                    <div className="container text-center text-md-start mt-5 ">

                        <div className="row mt-3">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                                <h6 className="text-uppercase fw-bold">Company name</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"

                                    style={{ width: "60px", backgroundColor: " #3a3a3b", height: "2px" }}
                                />
                                <p>
                                    <img src={logo} alt='' width={'200px'} />
                                </p>
                            </div>



                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 fotter-col">

                                <h6 className="text-uppercase fw-bold">Products</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                />
                                <p>
                                    <a href="#!" className="text-white">MDBootstrap</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">MDWordPress</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">BrandFlow</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Bootstrap Angular</a>
                                </p>
                            </div>



                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 fotter-col">

                                <h6 className="text-uppercase fw-bold">Useful links</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                />
                                <p>
                                    <a href="/profile" className="text-white">Your Account</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Become an Affiliate</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Shipping Rates</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Help</a>
                                </p>
                            </div>



                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 fotter-col">


                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                />
                                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                                <p><i className="fas fa-envelope mr-3"></i> RapidTravels@example.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                            </div>


                        </div>


                    </div>
                </section>



                <div
                    className="text-start p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    © 2023 Copyright Rapid Travels

                </div>


            </footer>


        </div>






    )
}

export default Footer;