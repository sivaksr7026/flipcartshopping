import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Headersection/Header";
import Footer from "../components/Footersection/Footer";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Editprofile from "../pages/Editprofile";
import {Bounce,ToastContainer } from 'react-toastify';
import"react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<Editprofile />} />




      </Routes>
      <ToastContainer
position="bottom-center"
autoClose={3000}
hideProgressBar
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}
theme="colored"
transition={Bounce}
/>


       
       
       
      <Footer />
    </div>
  );
};
export default MainPage;
