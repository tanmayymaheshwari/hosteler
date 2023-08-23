import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCircleNotch } from 'react-icons/fa';

export const Mess = () => {

  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current.data.token;

  // TOASTIFY SETTINGS
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const [currentDetails, setCurrentDetails] = useState(null);
  const [messDetails, setMessDetails] = useState([]);   
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({                  
    vendor_name: "",
    manager_name: "",
    contact_number : "",
    contract_start_date : "",
    contract_end_date : "",
    contract_duration : "",
    cost_per_day : "",
    rebate_percentage : "",
    menu_image : ""
  }); 

  // FETCH MESS DETAILS from API 
  const fetchMessDetails = async () => {
    try {
      const response = await axios.get(
        "https://hosteler-backend.onrender.com/base/mess/1/"
      );
      setCurrentDetails(response.data);
      setIsLoading(false);
    } 
    catch (error) {
      console.error("Error fetching mess details:", error);
    }
  };
  useEffect(() => {
    fetchMessDetails();
  }, []);

  // OPENS THE FORM
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  // ENTER NEW FORM VALUES
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
      // SEND DATA TO API
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        console.log(10)
        const response = await axios.put(
          "https://hosteler-backend.onrender.com/base/mess/update/1/", 
          formData,
          config
        );
        setMessDetails(response.data);
        setIsEditMode(false);
        setFormData({
          vendor_name: "",
          manager_name: "",
          contact_number : "",
          contract_start_date : "",
          contract_end_date : "",
          contract_duration : "",
          cost_per_day : "",
          rebate_percentage : "",
          menu_image : ""
        });
        console.log(20)
        {
          fetchMessDetails();
        }
      } catch (error) {
        console.error(error);
      }
    }

  // CANCEL BUTTON
  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({
      vendor_name: "",
      manager_name: "",
      contact_number : "",
      contract_start_date : "",
      contract_end_date : "",
      contract_duration : "",
      cost_per_day : "",
      rebate_percentage : "",
      menu_image : ""
    });
    // setFormErrors({});
  };

  return (
    <div className="mess">
      <div id="team" className="text-center">
        <div className="container">

          {/* TITLE */}
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>MESS</h2> 
          </div>
        </div>

        <div className="mess-details">
          <div className="mess-container">
            {/* DETAILS */}
            <div className="mess-header">MESS DETAILS</div>

            <div className="mess-content">
              {
              isLoading ? 
              (
                // LOADING SCREEN
                <div className='mess-loading'>
                  <FaCircleNotch className="mess-loading-icon" />
                </div>
              ) : (
                !isEditMode ? (
                  <div className="mess-content-cont1">
                    <div className="mess-content-cont2">

                      <div className="mess-title">
                        <ul>Mess Vendor Name </ul>
                        <ul>Mess Manger Name </ul>
                        <ul>Tenure Start Date</ul>
                        <ul>Tenure End Date</ul>
                        <ul>Meal Cost per Day</ul>
                        <ul>Rebate Calculation</ul>
                        <ul>Contact Number </ul>
                      </div>

                      <div>
                        <ul>:</ul>
                        <ul>:</ul>
                        <ul>:</ul>
                        <ul>:</ul>
                        <ul>:</ul>
                        <ul>:</ul>
                        <ul>:</ul>
                      </div>

                      <div className="mess-variable">
                      {currentDetails && (
                          <>
                          <ul>{currentDetails.vendor_name}</ul>
                          <ul>{currentDetails.manager_name}</ul>
                          <ul>{currentDetails.contract_start_date}</ul>
                          <ul>{currentDetails.contract_end_date}</ul>
                          <ul>{currentDetails.cost_per_day}</ul>
                          <ul>{currentDetails.rebate_percentage}</ul>
                          <ul>{currentDetails.contact_number}</ul>
                          </>
                        )}
                      </div>

                    </div>

                    <button
                      className="mess-edit-button"
                      onClick={handleEditClick}
                    >
                      EDIT
                    </button>
                  </div>
                ) : (

                  // MESS FORM FIELDS
                  <form onSubmit={handleSubmit}>

                    <div className="mess-input">

                      <label htmlFor="vendor_name">Vendor Name :</label>
                      <input
                      type="text"
                      id="vendor_name"
                      name="vendor_name"
                      value={formData.vendor_name}
                      onChange={handleInputChange}
                      required
                      />
                    </div>

                    <div className="mess-input">
                      <label htmlFor="manager_name">Manager Name :</label>
                      <input
                        type="text"
                        id="manager_name"
                        name="manager_name"
                        value={formData.manager_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mess-input">
                      <label htmlFor="contact_number">Contact Number :</label>
                      <input
                        type="number"
                        id="contact_number"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mess-input">
                      <label htmlFor="cost_per_day">Meal Cost &#x28;per day&#x29; :</label>
                      <input
                        type="number"
                        id="cost_per_day"
                        name="cost_per_day"
                        value={formData.cost_per_day}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mess-input">
                      <label htmlFor="rebate_percentage">Rebate Calculation :</label>
                      <input
                        type="number"
                        id="rebate_percentage"
                        name="rebate_percentage"
                        value={formData.rebate_percentage}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mess-input">
                      <label htmlFor="contract_start_date">Start Date :</label>
                      <input
                        type="date"
                        id="contract_start_date"
                        name="contract_start_date"
                        value={formData.contract_start_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mess-input">
                      <label htmlFor="contract_duration">Duration &#x28;in months&#x29; :</label>
                      <input
                        type="number"
                        id="contract_duration"
                        name="contract_duration"
                        value={formData.contract_duration}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mess-button-group">
                      <button type="submit">Submit</button>
                      <button type="button" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )
              )}
            </div>
          </div>
        </div>
        {/* MESS MENU */}
      </div>
      <ToastContainer />
    </div>
  );
};
