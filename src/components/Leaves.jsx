import React, { useEffect, useState , useRef } from "react";
import axios from "axios";

const LeavesObj = ({ leave , token }) => {
    
  return (
    <button className="leave-box">
      <div className="leave-container">
        <div className="leave-tag-box">

          <div className={`leave-tag ${
                leave.status === "PENDING"
                  ? "status_pending"
                  : leave.status === "APPROVED"
                  ? "status_approved"
                  : "status_rejected"
              }`}
          >
            {leave.status}
          </div>
        </div>
      <div className="leave-details">
        <div className="leave-details-text">
          <div className="leave-title">
            <ul>Name</ul>
            <ul>From Date</ul>
            <ul>Till Date</ul>
            <ul>Location</ul>
          </div>
          <div>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
          </div>
          <div className="leave-variable">
            <ul>{leave.studentName}</ul>
            <ul>{leave.leave_from}</ul>
            <ul>{leave.leave_to}</ul>
            <ul>{leave.leave_location}</ul>
          </div>
        </div>

      </div>
      </div>
    </button>
  );
};

const LeavePopup = ({ leave, token, onClose }) => {

  const handleApprove = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `https://hosteler-backend.onrender.com/base/attendance/leave/update/${leave.leave_id}/`,
        { status: "APPROVED" },
        config
      );
      onClose();
      window.location.reload()
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleReject = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `https://hosteler-backend.onrender.com/base/attendance/leave/update/${leave.leave_id}/`,
        { status: "REJECTED" },
        config
      );
      onClose();
      window.location.reload()
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  return (
    <div className="leave-popup">
      <div className="popup-content">
        {/* Display leave details */}
        <h2>Leave Details</h2>
        <p>Name: {leave.studentName}</p>
        <p>Roll Num: {leave.student}</p>
        <div className="leave-pop-pad"></div>
        <p>From: {leave.leave_from}</p>
        <p>Till: {leave.leave_to}</p>
        <div className="leave-pop-pad"></div>
        <p>Location: {leave.leave_location}</p>
        <p>Reason: {leave.reason_for_leave}</p>
        
        {/* Buttons based on leave status */}
        {leave.status === "PENDING" && (
          <div className="leave-button">
            <button onClick={handleApprove}>Approve</button>
            <button onClick={handleReject}>Reject</button>
          </div>
        )}
        {leave.status === "APPROVED" && (
          <div>
            Leave has been APPROVED
          </div>
        )}
        {leave.status === "REJECTED" && (
          <div>
            Leave has been REJECTED
          </div>
        )}

        
        {/* Close button */}
        <div className="leave-pop-pad"></div>
        <button className="leave-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export const Leaves = () => {
  
  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current.data.token;

  // FUNCTIONS for DATE
  const currentDate = new Date();
  // const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState('');
  // const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // LEAVES and STATUS
  const [leaves, setLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("PENDING");

  // SELECTED LEAVE POPUP
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePopupOpen = (leave) => {
    setSelectedLeave(leave);
    setPopupVisible(true);
  };
  const handlePopupClose = () => {
    setSelectedLeave(null);
    setPopupVisible(false);
  };

  // FETCH LEAVES DETAILS from API
  const fetchLeaveData = async () => {
    try {
      const config={
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
        const response = await axios.get(
          `https://hosteler-backend.onrender.com/base/attendance/leave/`,config
          );
        const studentDataPromises = response.data.map(async leave => {
          const studentResponse = await axios.get(
            `https://hosteler-backend.onrender.com/base/student/${leave.student}/`,
            config
          );
          console.log(studentResponse)
          const student = studentResponse.data;
          return {
            ...leave,
            studentName: `${student.first_name} ${student.last_name}`
          };
        });;
      
        const leavesWithStudentName = await Promise.all(studentDataPromises);
        setLeaves(leavesWithStudentName);
        }
      catch (error) {
        console.error("Error fetching resource details:", error);
        }
      };
  console.log(leaves)

  useEffect(() => {
    fetchLeaveData();
  }, []);
  
  // COMPLAINT FILTER
  const filteredLeaves =
    filterStatus === "All"
      ? leaves
      : leaves?.filter((leave) => leave.status === filterStatus);

  const shouldApplyPadding = filteredLeaves.length <= 4;

  return (
    <div className="leave">
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>LEAVES</h2>
          </div>
        </div>

        <div className="leave-filter">
          <div className="leave-filter-container">
            <label htmlFor="leave-filter">Filter by Status:</label>
            <select
              id="leave-filter"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="leave-filter-container">
            <label htmlFor="leave-month">Filter by Month:</label>
            <select id="leave-month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">All Months</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
            </select>
          </div>

          <div className="leave-filter-container">
            <label htmlFor="leave-year">Filter by Year:</label>
            <select id="leave-year" value={selectedYear} onChange={handleYearChange}>
              <option value="">All Years</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        <div className="leave-grid-container" style={{ paddingBottom: shouldApplyPadding ? '155px' : '0' }}>
          {filteredLeaves.length !== 0 ? 
            (
              <div className="leave-grid-container-inside">
                {
                  filteredLeaves.map((leave) => {
                  const leaveDate = new Date(leave.created_at);
                  const leaveMonth = String(leaveDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
                  const leaveYear = leaveDate.getFullYear().toString();

                  if (
                    (!selectedMonth || selectedMonth === leaveMonth) &&
                    (!selectedYear || selectedYear === leaveYear)
                  ) {

                    return (
                      <div onClick={() => handlePopupOpen(leave)}>
                        <LeavesObj
                        key={leave?.leave_id}
                        leave={leave}
                        studentName={leave.studentName}
                        token={token}
                        />
                      </div>
                    );
                  }
                  return null;
                  })
                }
              </div>
            )
            : 
            (
              <div className="no-leaves">NO LEAVES</div>
            )
          }
        </div>

        {popupVisible && selectedLeave && (
          <LeavePopup
            leave={selectedLeave}
            token={token}
            onClose={handlePopupClose}
          />
        )}

      </div>
    </div>
  );
};