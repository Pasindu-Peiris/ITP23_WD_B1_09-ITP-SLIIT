import '../App.css'


function AdminDashboard() {

    return (
        <>

            <nav className="navbar navbar-expand-lg bg-light" style={{ height: "10px" }}>

                <div className="container-fluid px-5">

                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i class="fa-solid fa-bars" style={{ fontSize: "1.5rem" }}></i></button>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <span className="navbar-text">
                            Admin Profile Icon Like Home Page
                        </span>
                    </div>
                </div>
            </nav>

            <div className='container' style={{ height: "80vh", width: "100%", textAlign: "center", justifyContent: "center", display: "flex" }}>
                <h1 className='d-flex align-items-center text-center'> Admin Dashboard</h1>
            </div>


            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Admin Dashboard</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="!#">Booking And Reservation </a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link" href="!#">Tours And Route Planning</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                           <a className="nav-link" href="/AllClient">Client Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Finance Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Vehicle Management</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Staff Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Vehicle Owner Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Driver Management</a>
                        </li>

                    </ul>

                    <a className="nav-link nav-item px-3 fs-5 pt-5" href="!#" style={{ color: "red", paddingTop: "100px" }}>Log Out</a>

                </div>
            </div>



        </>
    )



}


export default AdminDashboard;