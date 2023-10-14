import "../../App";
import Logo from "../../tourImages/Logo.png";
import SideNavLogo from "../../tourImages/sideNavico.png";

function MainLayout() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light"
        style={{ height: "10px" }}
      >
        <div className="container-fluid px-5">
          <button
            class="btn btn-dark"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <i class="fa-solid fa-bars" style={{ fontSize: "1.5rem" }}></i>
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText Logo">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <span className="navbar-text">
              <img src={Logo} width="250" height="60" alt="Logo" />
            </span>
          </div>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <span className="navbar-text">
              <a href="#">
                <i
                  className="fa-solid fa-circle-user fa-2xl"
                  style={{ color: "#000000" }}
                ></i>
              </a>
            </span>
          </div>
        </div>
      </nav>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <img src={SideNavLogo} width="40" height="45" alt="sideNavLogo" />
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            RapidTravels
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a
                className="nav-link active fw-bold"
                aria-current="page"
                href="!#"
              >
                Booking And Reservation{" "}
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a className="nav-link fw-bold" href="/AllIncomes">
                All Incomes
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a className="nav-link fw-bold" href="/AllClient">
                Client Management{" "}
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a
                className="nav-link active fw-bold"
                aria-current="page"
                href="/AllClient"
              >
                Finance Management{" "}
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a
                className="nav-link active fw-bold"
                aria-current="page"
                href="/AllClient"
              >
                Vehicle Management
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a
                className="nav-link active fw-bold"
                aria-current="page"
                href="/AllClient"
              >
                Staff Management{" "}
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a
                className="nav-link active fw-bold"
                aria-current="page"
                href="/AllClient"
              >
                Vehicle Owner Management{" "}
              </a>
            </li>
            <li
              className="nav-item px-4 fs-5 rounded-2"
              id="block-scopAdmin"
              style={{ margin: "10px 0px", border: "0px solid #000" }}
            >
              <a
                className="nav-link active fw-bold"
                aria-current="page"
                href="/AllClient"
              >
                Driver Management
              </a>
            </li>
          </ul>

          <button
            id="logout"
            type="button"
            class="btn btn-outline-danger"
            style={{ marginTop: "30px" }}
          >
            <i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;
            <b>Log Out</b>
          </button>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
