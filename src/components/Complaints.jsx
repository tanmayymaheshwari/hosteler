import React, { useEffect, useState , useRef } from "react";
import axios from "axios";
import { FaCheck , FaWindowClose, FaCircleNotch } from "react-icons/fa";

const CompObj = ({ complaint , token }) => {

  const [complaintStatus, setComplaintStatus] = useState(complaint.status);
  const [onUpdateStatus, setOnUpdateStatus] = useState(complaint.complain_id,complaint.status);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const handleStatusChange = async () => {
    if(complaintStatus === "RESOLVED")
      return;
    
    let newStatus;
    if (complaintStatus === "PENDING") {
      newStatus = "IN_PROGRESS";
    } else if (complaintStatus === "IN_PROGRESS") {
      newStatus = "RESOLVED";
    } 
    else {
      newStatus = "PENDING";
    }
    setComplaintStatus(newStatus);
    setOnUpdateStatus(complaint.complaint_id, newStatus);
    updateComplaintStatus(complaint.complaint_id, newStatus);
  };

  const openImagePopup = () => {
    setIsImagePopupOpen(true);
  };
  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  // UPDATE COMPLAINTS in the BACKEND
  const updateComplaintStatus = async (id, newStatus) => {
    try {
      console.log(id);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://hosteler-backend.onrender.com/base/complaint/update/${id}/`,
        { status: newStatus },
        config
      );
      setOnUpdateStatus(id, newStatus);
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };
    
  return (
    <div className="comp-box">
      <div className="comp-cont-out">
        <div className="comp-container">
          <div className="comp-title">
            <ul>Complaint ID</ul>
            <ul>Complaint Type</ul>
            <ul>Lodged By</ul>
            <ul>Location</ul>
            <ul>Date Lodged</ul>
            <ul>Status</ul>
          </div>
          <div>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
          </div>
          <div className="comp-variable">
            <ul>{complaint.complaint_id}</ul>
            <ul>{complaint.category}</ul>
            <ul>{complaint.student}</ul>
            <ul>{complaint.location}</ul>
            <ul>{formatDate(complaint.created_at)}</ul>
            <ul>{complaintStatus}</ul>
          </div>

          <div className="resolved-button">
            <button
              className={`tick-button ${
                complaintStatus === "RESOLVED"
                  ? "tick_resolved"
                  : complaintStatus === "IN_PROGRESS"
                  ? "tick_progress"
                  : "tick_unresolved"
              }`}
              onClick={handleStatusChange}
            >
              <FaCheck className="tick" />
            </button>

            {/* {complaint.photo && (
              <div className="image-preview" onClick={openImagePopup}>
                <img src={complaint?complaint.photo?.substr(13): ""} className="complaint.photo" alt="Attached Photo" />
                {console.log(12,complaint.photo)}
              </div>
            )}

            {!complaint.photo && (
              <div>
                <div>NO PHOTO</div>
                <div>ATTACHED</div>
              </div>
            )} */}

          </div>
        </div>

        <div className={`image-popup ${isImagePopupOpen ? "open" : ""}`}>
          <div className="image-popup-content">
            <img src={complaint.photo} className="full-size-image" alt="" />
              <button className="close-button" onClick={closeImagePopup}>
                <FaWindowClose/>
              </button>
          </div>
        </div>

        <div className="comp-description">
          <p className="comp-desc-head">DESCRIPTION</p>
          <p className="comp-desc">{complaint.description}</p>
        </div>
      </div>
    </div>
  );
};


export const Complaints = () => {
  
  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current.data.token;

  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Latest");
  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // FETCH COMLPLAINT DETAILS from API
  const fetchComplaintData = async () => {
    try {
      const config={
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
        const response = await axios.get(
          `https://hosteler-backend.onrender.com/base/complaint/list/`,config
          );
          setComplaints(response.data);
          setIsLoading(false);
        }
      catch (error) {
        console.error("Error fetching resource details:", error);
        }
      };
  useEffect(() => {
    fetchComplaintData();
  }, []);
  console.log(complaints)
  
  // COMPLAINT FILTER
  const filteredComplaints =
    filterStatus === "All"
      ? complaints
      : complaints?.filter((complaint) => complaint.status === filterStatus);

  // COMPLAINT SORT 
  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortOrder === "Latest") {
      return new Date(b.created_at) - new Date(a.created_at); // Sort by latest date
    } else {
      return new Date(a.created_at) - new Date(b.created_at); // Sort by oldest date
    }
  });

  return (
    <div className="comp">
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>COMPLAINTS</h2>
          </div>
        </div>

        <div className="comp-filter">
          <div className="comp-filter-container">
            <label htmlFor="comp-filter">Filter by Status:</label>
            <select
              id="comp-filter"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <div className="comp-filter-container">
            <label htmlFor="comp-sort">Sort by Date:</label>
            <select
              id="comp-sort"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="complaint-section">
        {
          isLoading ? 
          (
            // LOADING SCREEN
            <div className='comp-loading'>
              <FaCircleNotch className="comp-loading-icon" />
            </div>
          ) : 
          ( 
            sortedComplaints.length !== 0 ? (
            sortedComplaints.map((complaint) => (
            <CompObj
              key={complaint?.complaint_id}
              complaint={complaint}
              token={token}
              // onUpdateStatus={handleUpdateStatus}
            />
            ))
            ):( <div>NO COMPLAINTS</div> )
          )
        }
        </div>

      </div>
    </div>
  );
};