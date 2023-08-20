import React, { useState,useRef } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import {Header} from "./Header.jsx" 

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./hosteler_logo.png";

export const Login = () =>  {

  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current?.data?.token ?? null;
  console.log(token)

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const navigate = useNavigate();
  
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();


 // handle submit
  const handleSubmit =async (event) => {
    console.log(1)
    //Prevent page reload
    event.preventDefault();
    if(!username||!password)
    {
      toast.warn("Please Fill all the Fields.", toastOptions);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data=await axios.post('https://hosteler-backend.onrender.com/base/admin/login/',
        {
          username,
          password
        },config)
      console.log(data);
      console.log(data.response)

      toast.success("Login Successful",toastOptions);
      localStorage.setItem('userInfo',JSON.stringify(data));

        navigate("/home");
        setIsSubmitted(true);
        window.location.reload();

    } catch (error) {
       console.log(error)
    }
    
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="input-container">
            <input onChange={(e)=>setUsername(e.target.value)} type="text" name="uname" placeholder="Email"required />
            
          </div>
          {/* PASSWORD */}
          <div className="input-container">
            <input onChange={(e)=>setPassword(e.target.value)} type="password" name="pass" placeholder="Password" required />
            
          </div>
          {/* LOGIN BUTTON */}
          <div className="button-container">
            <button className="login" type="submit">LOGIN</button>
          </div>
        </form>
      </div>

  );
  if(token) return <Header/>
  return (
    <div className="loginpage">

      {/* LEFT PARTITION */}
      <div className="leftLogin">
        {/* <div className="circleLeftOutLogin">
          <div className="circleLeftInLogin"></div>
        </div> */}
      </div>
      
      {/* MIDDLE PARTITION */}
      <div className="middleLogin">

        <div className="logo">
          <img src={logo} className="hosteler" alt="hosteler" />
        </div>
        <div className="login-form">
          {isSubmitted ? <div>SUCCESSSFULLY LOGGED IN!<Navigate to="/home"></Navigate></div> : renderForm}
        </div>

      </div>
      
      {/* RIGHT PARTITION */}
      <div className="rightLogin">
        {/* <div className="circleRightOutLogin">
          <div className="circleRightInLogin"></div>
        </div> */}
      </div>
      <ToastContainer/>
    </div>
  );
};