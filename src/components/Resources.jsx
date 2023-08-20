import React, { useEffect, useState , useRef } from "react";
import axios from "axios";
import { FaPen, FaSave, FaTimes } from "react-icons/fa";

const ResObj = ({ resource , token }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [total_count, setCount] = useState(resource.total_count);
  const [correct_count, setCorrect] = useState(resource.correct_count);
  const [damaged_count, setDamaged] = useState(resource.damaged_count);
  const [tempCount, setTempCount] = useState(resource.total_count);
  const [tempCorrect, setTempCorrect] = useState(resource.correct_count);
  const [tempDamaged, setTempDamaged] = useState(resource.damaged_count);

  // UPDATE RESOURCES in the API
  const handleResourceUpdate = async (updatedResource) => {
    try {
      setCount(updatedResource.total_count);
      setCorrect(updatedResource.correct_count);
      setDamaged(updatedResource.damaged_count);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      
      const response = await axios.put(
        `https://hosteler-backend.onrender.com/base/resource/update/${resource.resource_id}/`,
        updatedResource,
        config
        );
      console.log(response.data);
    } 
    catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async () => {
    const updatedResource = {
      ...resource,
      total_count: tempCount,
      correct_count: tempCorrect,
      damaged_count: tempDamaged,
    };
    try {
      await handleResourceUpdate(updatedResource); // Wait for the update to finish
      setIsEditing(false); // Set editing to false only after the update is done
      setCount(tempCount);
      setCorrect(tempCorrect);
      setDamaged(tempDamaged);
      handleRefresh(true);
    }
    catch (error) {
      console.error(error);
    }
  };
  const handleCancelClick = () => {
    setTempCount(total_count);
    setTempCorrect(correct_count);
    setTempDamaged(damaged_count);
    setIsEditing(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  console.log("res",resource)

  return (
    <div className="res-box">
      <div className="res-box-inside">
        <div className="res-type">
          <div className="res-type-box">
            {resource.resource_type}
          </div>
        </div>
      <div className="res-container">
        {/* RESOURCE IMAGE */}
        <div className="left-res-block">
          <div className="res-image">
          <img src={`https://hosteler-backend.onrender.com/media/images/tubelight.jpg`} 
          className="resimg" alt="resource" />
          </div>
          <div>
            {resource.description}
          </div>
        </div>

        {/* RESOURCE DETAILS */}
        <div className="res-info">
          <div className="res-name">{resource.name}</div>

          <div className="res-prop">
            <div className="res-count">
              <ul>COUNT</ul>
              <ul>CORRECT</ul>
              <ul>DAMAGED</ul>
            </div>

            <div>
              <ul>:</ul>
              <ul>:</ul>
              <ul>:</ul>
            </div>

            {isEditing ? (
              <div className="res-count-value-editable">
                <input className="resTempCount"
                  type="number"
                  value={tempCount}
                  onChange={(e) => setTempCount(e.target.value)}
                />
                <input
                  type="number"
                  value={tempCorrect}
                  onChange={(e) => setTempCorrect(e.target.value)}
                />
                <input
                  type="number"
                  value={tempDamaged}
                  onChange={(e) => setTempDamaged(e.target.value)}
                />
              </div>
            ) : (
              <div className="res-count-value">
                <ul>{resource.total_count}</ul>
                <ul>{resource.correct_count}</ul>
                <ul>{resource.damaged_count}</ul>
              </div>
            )}
          </div>
        </div>

        {/* RESOURCE EDIT */}
        <div className="res-edit">
          {isEditing ? (
            <>
              <button className="res-button" onClick={handleSaveClick}>
                <FaSave />
              </button>
              <button className="res-button" onClick={handleCancelClick}>
                <FaTimes />
              </button>
            </>
          ) : (
            <button className="res-button" onClick={handleEditClick}>
              <FaPen />
            </button>
          )}
        </div>
      </div>
      </div> 
    </div>
  );
};

const ResourcePopup = ({
  name,
  resource_type,
  resource_photo, 
  correct_count, 
  damaged_count, 
  description,
  onClose,
  registerMode
  }) => {
    const [formData, setFormData] = useState({
    name: "",
    resource_type: "",
    resource_photo: "", 
    correct_count: "", 
    damaged_count: "", 
    description: "",
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event,token) => {
    event.preventDefault();
    try {
      // Make an HTTP POST request to the backend to save the form data
      const response = await axios.post("https://hosteler-backend.onrender.com/base/resource/create/", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token if you need authentication
        },
      });

      // Handle the response from the backend if needed
      console.log("Form data sent successfully:", response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error sending form data:", error);
    }
  };
  return (
    <div className="res-reg-popup">
      <div className="res-reg-popup-content">
        <h3>{registerMode ? "Register Resource" : null}</h3>
        <form onSubmit={handleSubmit}>

          <label htmlFor="name">Resource Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="resource_type">Resource Type:</label>
          <div>
          <select
            id="resource_type"
            name="resource_type"
            value={formData.resource_type}
            onChange={handleChange}
            required
          >
            <option value="">Select resource type</option>
            <option value="ELECTRICAL">Electrical</option>
            <option value="PLUMBING">Plumbing</option>
            <option value="CARPENTRY">Carpentry</option>
            <option value="SANITATION">Sanitation</option>
            <option value="OTHERS">Others</option>
          </select>
          </div>
          <input
            type="text"
            id="resource_type"
            name="resource_type"
            value={formData.resource_type}
            onChange={handleChange}
            required
          />

          <label htmlFor="resource_photo">Resource Photo:</label>
          <input
            type="file"
            id="resource_photo"
            name="resource_photo"
            value={formData.resource_photo}
            onChange={handleChange}
            // required
          />

          <label htmlFor="correct_count">Correct Count:</label>
          <input
            type="text"
            id="correct_count"
            name="correct_count"
            value={formData.correct_count}
            onChange={handleChange}
            required
          />

          <label htmlFor="damaged_count">Damaged Count:</label>
          <input
            type="text"
            id="damaged_count"
            name="damaged_count"
            value={formData.damaged_count}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="res-reg-button-group">
            <button type="submit" className="res-reg-button-group-indiv">
              Register
            </button>
            <button className="res-reg-button-group-indiv" onClick={onClose}>Discard</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export const Resources = () => {

  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current.data.token;

  const [resourcesArray, setResourcesArray] = useState([]);
  const [resourcePopupOpen, setResourcePopupOpen] = useState(false);
  const [filterResource, setFilterResource] = useState("All");

  const handleFilterChange = (e) => {
    setFilterResource(e.target.value);
  };

  // FETCH RESOURCE DETAILS from API 
  const fetchResourceDetails = async () => {
    try {
      const config={
        headers:{
          Authorization: `Bearer ${token}`
        }
       }
      const response = await axios.get(
        `https://hosteler-backend.onrender.com/base/resource/`,config
        );
        setResourcesArray(response.data);
        console.log(10,response.data);
    }
    catch (error) {
      console.error("Error fetching resource details:", error);
    }
  };
  useEffect(() => {
    fetchResourceDetails();
  }, []);


  // Functions to handle the resource popup
  const handleOpenResourcePopup = () => {
    setResourcePopupOpen(true);
  };
  const handleCloseResourcePopup = () => {
    setResourcePopupOpen(false);
  };
  
  // RESOURCE FILTER
  const filteredResources =
  filterResource === "All"
      ? resourcesArray
      : resourcesArray?.filter((resource) => resource.resource_type === filterResource);

  return (
    <div className="resource">
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>RESOURCES</h2>
          </div>
        </div>

        <div className="resource-button-div">
          <button className="resource-register-button" onClick={handleOpenResourcePopup}>
            ADD NEW RESOURCE
          </button>
        </div>

        <div className="comp-filter-container">
          <label htmlFor="comp-filter">Filter by Category:</label>
          <select
            id="comp-filter"
            value={filterResource}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="ELECTRICAL">Electrical</option>
            <option value="PLUMBING">Plumbing</option>
            <option value="CARPENTRY">Carpentry</option>
            <option value="SANITATION">Sanitation</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>

        <div className="resource-section">        
          {
            filteredResources.length !== 0 &&
            filteredResources.map((resource) =>  (
              <ResObj
                key={resource?.resource_id}
                resource={resource}
                token={token}
              />
            ))
          } 
        </div>
        {/* Render the popup for registering a resource */}
        {resourcePopupOpen && (
          < ResourcePopup
            name={""}
            resource_type={""} 
            resource_photo={""} 
            correct_count={""} 
            damaged_count={""} 
            description={""}
            onClose={handleCloseResourcePopup}
            registerMode={true}
          />
        )}
      </div>
    </div>
  );
};
