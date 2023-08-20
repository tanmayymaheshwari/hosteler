import React , { useEffect , useState , useRef } from "react";
import hostelerlogo from "./hosteler_logo.png";
import axios from "axios";

export const Navigation = () => {

  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current?.data?.token ?? null;

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    console.log(token)
    localStorage.clear()
    setShowLogoutPopup(false);

    const deletedToken = localStorage.getItem("token");
    console.log("Token has been deleted:", deletedToken === null);
    window.location.href = "/";
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };
  if(!token) return null
  return (

    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/home">
            <img src={hostelerlogo} className="hostelerlogo" alt="HOME" />
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/attendance" className="page-scroll">
                Attendance
              </a>
            </li>
            <li>
              <a href="/leaves" className="page-scroll">
                Leaves
              </a>
            </li>
            <li>
              <a href="/students" className="page-scroll">
                Students
              </a>
            </li>
            <li>
              <a href="/resources" className="page-scroll">
                Resources
              </a>
            </li>
            <li>
              <a href="/mess" className="page-scroll">
                Mess
              </a>
            </li>
            <li>
              <a href="/complaints" className="page-scroll">
                Complaints
              </a>
            </li>
            <li>
              <a href="#" className="page-scroll" onClick={() => setShowLogoutPopup(true)}>
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
      </div>
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <div className="logout-buttons">
              <img src={hostelerlogo} className="hostelerlogo" alt="HOME" />
            </div>
            <p>Do you want to log out?</p>
            <div className="logout-buttons">
              <button onClick={handleLogout}>CONFIRM</button>
              <button onClick={handleCancelLogout}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};