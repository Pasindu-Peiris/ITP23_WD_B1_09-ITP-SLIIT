/* eslint-disable no-unused-vars */
import './App.css';
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



    </div>

  );
}

export default App;
