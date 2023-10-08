/* eslint-disable no-unused-vars */
import './App.css';
import './index.css'
import Nav from './component/Nav';
import Register from './component/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Footer from './component/footer';
import Login from './component/Login';
import Home from './component/Home';
import AllClient from './component/AllClient';
import UpdateUser from './component/UpdateUser';
import ForgotPass from './component/forgotPass';
import Check from './component/check';
import Resetpassword from './component/ResetPassword';
import Profile from './component/profile';
import UpadateUserClient from './component/userUpdateClient';
import ClientDisplay from './component/tableDisplayClients';
import TableNew from './component/tableNewDis';
import Vehicle_Form from "./pages/Vehicle_Form";
import Vehicle_Update from "./pages/Vehicle_Update"
import IndexPage from "./pages/IndexPage"
import IndexPage_Update from "./pages/IndexPage_Update"
import Vehicle from "./pages/Vehicle"
import Vehicle_2 from "./pages/Vehicle_2"
import Owner from "./pages/rowner";
import AdminDashboard from './component/AdminDashboard';
import VSlide from './component/VSlide';

function App() {
  return (

    <div>


      <BrowserRouter>
        <Routes>
          <Route path='/Register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/AllClient' element={<AllClient />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/get/:id' element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/forget' element={<ForgotPass/>}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/Check' element={<Check/>}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/resetpassword/:id/:token' element={<Resetpassword/>}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/gets/:id' element={<UpadateUserClient />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/ClientDisplay' element={<ClientDisplay/>}></Route>
        </Routes>
      </BrowserRouter>



      <BrowserRouter>
        <Routes>
          <Route path='/Table' element={<TableNew/>}></Route>
        </Routes>
      </BrowserRouter>

      {/* vehicles */}
      <BrowserRouter>
      <Routes>

      <Route  path='/Vehicle_main' element={<IndexPage/>}/>
      <Route  path='/Vehicle/:id' element={<Vehicle/>}/>
      <Route  path='/Vehicle_2/:id' element={<Vehicle_2/>}/>
      <Route  path='/owner/' element={<Owner/>}/>
      <Route  path='/IndexPage_Update/:ownerId' element={<IndexPage_Update/>}/>
      <Route Route path='/Vehicle_Form/:ownerId' element={<Vehicle_Form/>}/>
      <Route Route path='/Vehicle_Update/:id' element={<Vehicle_Update/>}/>
      </Routes> 
      </BrowserRouter>


      <BrowserRouter>
        <Routes>
          <Route path='/Dashboard-admin-rapidTravles' element={<AdminDashboard/>}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path='/Slide' element={<VSlide/>}></Route>
        </Routes>
      </BrowserRouter>



    </div>

  );
}

export default App;
