/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav.js';
import Register from './Register.js';
import { useState } from 'react';
import Footer from './footer.js';
import Login from './Login.js';
import Home from './Home.jsx';
import AllClient from './AllClient.jsx';
import UpdateUser from './UpdateUser.js';

function BrowsrRouter() {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path='/add' element={<Register />}></Route>
                </Routes>
            </BrowserRouter>

            <BrowserRouter>
                <Routes>
                    <Route path='/Login' element={<Login />}></Route>
                </Routes>
            </BrowserRouter>

            <BrowserRouter>
                <Routes>
                    <Route path='/Home' element={<Home />}></Route>
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


        </>

    )
}

export default BrowsrRouter;