import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";
import { Attendance } from "./components/Attendance";
import { Leaves } from "./components/Leaves";
import { Students } from "./components/Students";
import { Resources } from "./components/Resources";
import { Complaints } from "./components/Complaints";
import { Mess } from "./components/Mess";
// import { Settings } from "./components/Settings";

import "./App.css";
import JsonData from "./data/data.json";

import SmoothScroll from "smooth-scroll";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <>
      <Navigation/>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/home" element={user.current?<Header/>:<Login/>} />
                <Route path="/attendance" element={<Attendance/>} />
                <Route path="/leaves" element={<Leaves/>} />
                <Route path="/students" element={<Students/>} />
                <Route path="/resources" element={<Resources/>} />
                <Route path="/mess" element={<Mess/>} />
                <Route path="/complaints" element={<Complaints/>} />
                {/* <Route path="/settings" element={<Settings/>} /> */}
            </Routes>
        </Router>
      
     </>
  );
};

export default App;
