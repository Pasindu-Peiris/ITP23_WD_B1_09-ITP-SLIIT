import logo from '../img/RapidTravels.png';
import iconP from '../img/user-check.svg'


function Nav() {


    const Logedin = window.localStorage.getItem('Logedin');
    return (

        <>

            <nav className="navbar navbar-expand-lg  " style={{height: "80px", backgroundColor: " #f1f1f3"}} >

                <div className="container-4 ">

                    <a className="navbar-brand" href="/"> <img src={logo} alt='' width={'225px'} /></a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="nav-list " id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#vehicles">Vehicles</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#tour">Tours</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#about">About</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#Contact">Contact</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#faq">FAQs</a>
                            </li>



                            {
                                Logedin === "true" ?
                                    <div className="d-flex mx-4">
                                        <button className="btn btn-dark p-1" type="submit" style={{}}><a href="/profile" style={{ textDecoration: "none", color: "white", padding: "2px 5px ", fontSize: "1.1rem" }}> <img src={iconP} alt='' />  </a></button>
                                        <button className="btn btn-dark p-1 mx-3" type="submit" style={{}}><a href="/" style={{ textDecoration: "none", color: "white", padding: "2px 10px ", fontSize: "1.2rem" }}> <i class="fa-solid fa-car" style={{color:"#fff"}}></i> </a></button>
                                    </div> :
                                    <div className="d-flex mx-4">
                                        <button className="btn btn-dark p-1" type="submit"><a href="/Login" style={{ textDecoration: "none", color: "white", padding: "10px 20px ", fontSize: "1.1rem" }}>Log In</a></button>
                                    </div>
    
                            }


                        </ul>



                    </div>



                </div>

            </nav>



        </>


    );
}


export default Nav;