import "./App.css";
import "./index.css";
// eslint-disable-next-line no-unused-vars
import Nav from "./component/Nav";
import Register from "./component/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import Footer from "./component/footer";
import Login from "./component/Login";
import Home from "./component/Home";
import AllClient from "./component/AllClient";
import UpdateUser from "./component/UpdateUser";
import ForgotPass from "./component/forgotPass";
import Check from "./component/check";
import Resetpassword from "./component/ResetPassword";
import Profile from "./component/profile";
import UpadateUserClient from "./component/userUpdateClient";
import ClientDisplay from "./component/tableDisplayClients";
import TableNew from "./component/tableNewDis";
import VehicleForm from "./pages/Vehicle_Form";
import VehicleUpdate from "./pages/Vehicle_Update";
import IndexPage from "./pages/IndexPage";
import IndexPageUpdate from "./pages/IndexPage_Update";
import Vehicle from "./pages/Vehicle";
import Vehicle2 from "./pages/Vehicle_2";
import Owner from "./pages/rowner";
import AdminDashboard from "./component/AdminDashboard";
import VSlide from "./component/VSlide";
import About from "./component/AboutUs";
import Book from "./component/Bookingdetails";
import Dropclient from "./component/ADDDROP";
import AllDrop from "./component/AllDropClient";
import TourDetails from "./component/TourDetails";
import VSlide2 from "./component/VSSlider2";
import ToursAndRoutePlanning from "./component/ToursAndRoutePlanningNav";
import AddTour from "./component/AddTour";
import EditTour from "./component/EditTour";
import GetTours from "./component/GetTours";

//charts
import BookingPieChart from "./component/charts/BookingPieChart";
import ToursBarChart from "./component/charts/ToursBarChart";
import ClientsPieChart from "./component/charts/ClientsPieChart";
import FinanceLineChart from "./component/charts/FinanceLineChart";
import VehiclePieChart from "./component/charts/VehiclePieChart";
import StaffPieChart from "./component/charts/StaffPieChart";
import VehicleOwnerPieChart from "./component/charts/VehicleOwnerPieChart";
import DriverPieChart from "./component/charts/DriverPieChart";

// Finance
import DriverSalary from "./component/Finance/DriverSalary";
import DriverDetails from "./component/Finance/DriverDetails";
import StaffDetails from "./component/Finance/StaffDetails";
import StaffSalary from "./component/Finance/StaffSalary";
import VehicleOwnerSalary from "./component/Finance/VehicleOwnerSalary";
import VehicleOwnerDetails from "./component/Finance/VehicleOwnerDetails";
import AllIncomes from "./component/Finance/AllIncomes";
import DriverSalForm from "./component/Finance/DriverSalForm";
import VehicleSalForm from "./component/Finance/VehicleSalForm";
import StaffSalForm from "./component/Finance/StaffSalForm";

//staff
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./staffcomponents/Headers/Headers";
import Home_staff from "./pages/Home/Home";
import Register_staff from "./pages/Register/Register";
import Edit_staff from "./pages/Edit/Edit";
import Profile_staff from "./pages/Profile/Profile";

//owner
import SignUp from "./Components/SignUp";
import VehicleOwnerManagement from "./Components/VehicleOwnerManagement";
import ViewVehicleOwner from "./Components/ViewVehicleOwner";
import UpdateVehicleOwner from "./Components/UpdateVehicleOwner";

//driver
import Home_driver from "./driverpages/home/Home";
import Edit_driver from "./driverpages/edit/Edit";
import Delete_driver from "./driverpages/delete/Delete";
import Add_driver from "./driverpages/add/Add";
//AddBookings
import AddBookings from "./component/AddBooking";
import AddReservation from "./component/AddReservation";
import AllBookings from './component/AllBookings';
import UpdateBooking from './component/UpdateBooking';
import AllReservations from './component/AllReservations';
import UpdateReservation from './component/UpdateReservation';
import UserAllBookings from "./component/UserAllBookings";


import ADlog from './component/AdminLogin'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Admin-login-rapid-travels' element={<ADlog />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/AllClient" element={<AllClient />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/get/:id" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/forget" element={<ForgotPass />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/Check" element={<Check />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route
            path="/resetpassword/:id/:token"
            element={<Resetpassword />}
          ></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/gets/:id" element={<UpadateUserClient />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/ClientDisplay" element={<ClientDisplay />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/Table" element={<TableNew />}></Route>
        </Routes>
      </BrowserRouter>

      {/* vehicles */}
      <BrowserRouter>
        <Routes>
        <Route path='/addBookings/:vid' element={<AddBookings />}></Route>
          <Route path="/Vehicle_main" element={<IndexPage />} />
          <Route path="/Vehicle/:id" element={<Vehicle />} />
          <Route path="/Vehicle_2/:id" element={<Vehicle2 />} />
          <Route path="/owner/" element={<Owner />} />
          <Route
            path="/IndexPage_Update/:ownerId"
            element={<IndexPageUpdate />}
          />
          <Route
            Route
            path="/Vehicle_Form/:ownerId"
            element={<VehicleForm />}
          />
          <Route Route path="/Vehicle_Update/:id" element={<VehicleUpdate />} />
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route
            path="/Dashboard-admin-rapidTravles"
            element={<AdminDashboard />}
          ></Route>
          <Route
            path="/Tours-and-route-planning"
            element={<ToursAndRoutePlanning />}
          ></Route>
          <Route path="/addTour" element={<AddTour />}></Route>
          <Route path="/editTours/:id" element={<EditTour />}></Route>
          <Route path="/getTours" element={<GetTours />}></Route>
          <Route path="/bookingPieChart" element={<BookingPieChart />}></Route>
          <Route path="/toursBarChart" element={<ToursBarChart />}></Route>
          <Route path="/clientsPieChart" element={<ClientsPieChart />}></Route>
          <Route
            path="/financeLineChart"
            element={<FinanceLineChart />}
          ></Route>
          <Route path="/vehiclePieChart" element={<VehiclePieChart />}></Route>
          <Route path="/staffPieChart" element={<StaffPieChart />}></Route>
          <Route
            path="/vehicleOwnerPieChart"
            element={<VehicleOwnerPieChart />}
          ></Route>
          <Route path="/driverPieChart" element={<DriverPieChart />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/Slide" element={<VSlide />}></Route>
          <Route path="/TourDetails/:id" element={<TourDetails />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Booking" element={<Book />}></Route>
          <Route path="/Drop" element={<Dropclient />}></Route>
          <Route path="/AllDrop" element={<AllDrop />}></Route>
          <Route path="/SliderVS" element={<VSlide2 />}></Route>
        </Routes>
      </BrowserRouter>

      {/* Finance Management */}
      <BrowserRouter>
        <Routes>
          <Route path="/AllDriverSal" element={<DriverSalary />}></Route>
          <Route path="/AllDriverList" element={<DriverDetails />}></Route>
          <Route path="/AllStaffList" element={<StaffDetails />}></Route>
          <Route path="/AllStaffSal" element={<StaffSalary />}></Route>
          <Route
            path="/AllVehicleOwnerSal"
            element={<VehicleOwnerSalary />}
          ></Route>
          <Route
            path="/AllVehicleOwnerList"
            element={<VehicleOwnerDetails />}
          ></Route>
          <Route path="/AllIncomes" element={<AllIncomes />}></Route>
        </Routes>

        <Routes>
          <Route path="/DriverSalForm/:id" element={<DriverSalForm />} />
          <Route path="/VehicleSalForm/:id" element={<VehicleSalForm />} />
          <Route path="/staffSalForm/:id" element={<StaffSalForm />} />
        </Routes>
      </BrowserRouter>

      {/* staff */}
      <BrowserRouter>
        <Routes>
          <Route path="/staff" element={<Home_staff />} />
          <Route path="/register_staff" element={<Register_staff />} />
          <Route path="/edit/:id" element={<Edit_staff />} />
          <Route path="/userprofile/:id" element={<Profile_staff />} />
        </Routes>
      </BrowserRouter>

      {/* owner */}
      <BrowserRouter>
        <Routes>
          <Route path="/vowner" element={<VehicleOwnerManagement />} />
          <Route path="/vehicleowner/signup" element={<SignUp />} />
          <Route
            path="/updatevehicleowner/:id"
            element={<UpdateVehicleOwner />}
          />
          <Route
            path="/vehicleownersmanager"
            element={<VehicleOwnerManagement />}
          />
          <Route path="/vehicleowner/:id" element={<ViewVehicleOwner />} />
        </Routes>
      </BrowserRouter>

      {/*Bookings and Reservations*/}
      <BrowserRouter>
        <Routes>
         
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/AllBookings" element={<AllBookings />}></Route>
        </Routes>
      </BrowserRouter>

      
      <BrowserRouter>
        <Routes>
          <Route path="/userAllBookings" element={<UserAllBookings />}></Route>
        </Routes>
      </BrowserRouter>

      

      <BrowserRouter>
        <Routes>
          <Route path="/getBooking/:id" element={<UpdateBooking />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/addReservations" element={<AddReservation />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/AllReservations" element={<AllReservations />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route
            path="/getReservation/:id"
            element={<UpdateReservation />}
          ></Route>
        </Routes>
      </BrowserRouter>

      {/* driver */}
      <BrowserRouter>
        <Routes>
          <Route path="/driver" element={<Home_driver />} />
          <Route path="/add_driver" element={<Add_driver />} />
          <Route path="/driver/edit/:id" element={<Edit_driver />} />
          <Route path="/driver/delete/:id" element={<Delete_driver />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
