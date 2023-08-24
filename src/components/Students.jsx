import React , { useEffect, useState , useRef } from "react";
import axios from "axios";
import { FaCircleNotch } from 'react-icons/fa';

const StudBlock = ({ student , token }) => {

  return (
    <div className="stud-box">
      <div className="stud-container">
      <div className="stud-details">

        <div className="stud-photo">
          <img src={student?student.photo?.substr(13): ""} className="studentPhoto" alt="Student Photo" />
        </div>

        <div className="stud-details-text">
          <div className="stud-title">
            <ul>Name</ul>
            <ul>Roll No</ul>
            <ul>Room No</ul>
            <ul>Phone</ul>
          </div>
          <div>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
            <ul>:</ul>
          </div>
          <div className="stud-variable">
            <ul>{student.first_name+" "+student.last_name}</ul>
            <ul>{student.roll_number}</ul>
            <ul>{student.roomNumber}</ul>
            <ul>{student.contact_number}</ul>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

// INDIVIDUAL STUDENT DETAIL POPUP

const Popup = ({ name,roll, dateOfBirth, address, roomnum, phoneNumber, bloodGroup,
                 studentPopupPhoto, course, parentName, parentContactNum, parentEmail,
                 onClose, token }) => {

  return (
    <div className="stud-popup">
      <div className="stud-popup-content">
        <div className="stud-popup-details">
          <img src={studentPopupPhoto} className="studentPopupPhoto" alt="Student Photo" />
          <h3>{name}</h3>
          <p>Roll Number: {roll}</p>
          <p>Room Number: {roomnum}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Course: {course}</p>
          <p>Date of Birth: {dateOfBirth}</p>
          <p>Address: {address}</p>
          <p>Blood Group: {bloodGroup}</p>
          <p>Parent Name: {parentName}</p>
          <p>Parent Contact No: {parentContactNum}</p>
          <p>Parent Email: {parentEmail}</p>
        </div>
        <div>
          <button className="stud-close-button" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

const RegPopup = ({ first_name, last_name, date_of_birth, gender, address, contact_number,
                    blood_group, photo, roll_number, email_address, batch, department, course,
                    parent_first_name, parent_last_name, parent_email, parent_contact_number,
                    onClose, registerMode }) => {

  const [formData, setFormData] = useState({
    first_name: "", 
    last_name: "", 
    date_of_birth: "", 
    gender: "", 
    address: "", 
    contact_number: "", 
    blood_group: "", 
    photo: "", 
    roll_number: "", 
    email_address: "", 
    batch: "", 
    department: "", 
    course: "", 
    parent_first_name: "", 
    parent_last_name: "", 
    parent_email: "", 
    parent_contact_number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event,token) => {
    event.preventDefault();
    const fdata = new FormData()
    for (let key of Object.keys(formData))
    {
        fdata.append(key,formData[key])
    }
    try {
      const url = "https://hosteler-backend.onrender.com/base/student/create/"
      const response = await axios.post(url, fdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Form data sent successfully:", response.data);
      onClose();
      window.location.reload();

    } catch (error) {
      console.log("Error sending form data:", error);
    }
  };

  return (
    <div className="stud-reg-popup">
      <div className="stud-reg-popup-content">
        <h3>{registerMode ? "Register Student" : roll_number}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label htmlFor="contact_number">Phone Number:</label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
          <label htmlFor="blood_group">Blood Group:</label>
          <div>
            <select
              id="blood_group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
            >

              <option value="">Select a blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <label htmlFor="photo">Student Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            defaultValue={formData.photo}
            onChange={
              (e)=>{
                console.log(e.target.files[0])
                setFormData((prev) => ({ ...prev, photo: e.target.files[0]}))
                console.log(formData)
            }
            }
            required
          />
          <label htmlFor="roll_number">Roll No:</label>
          <input
            type="text"
            id="roll_number"
            name="roll_number"
            value={formData.roll_number}
            onChange={handleChange}
            required
          />
          <label htmlFor="email_address">Email:</label>
          <input
            type="email"
            id="email_address"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
            required
          />
          <label htmlFor="batch">Batch:</label>
          <input
            type="number"
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
          />
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
          <label htmlFor="parent_first_name">Parent First Name:</label>
          <input
            type="text"
            id="parent_first_name"
            name="parent_first_name"
            value={formData.parent_first_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="parent_last_name">Parent Last Name:</label>
          <input
            type="text"
            id="parent_last_name"
            name="parent_last_name"
            value={formData.parent_last_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="parent_email">Parent Email:</label>
          <input
            type="email"
            id="parent_email"
            name="parent_email"
            value={formData.parent_email}
            onChange={handleChange}
            required
          />
          <label htmlFor="parent_contact_number">Parent Contact No:</label>
          <input
            type="text"
            id="parent_contact_number"
            name="parent_contact_number"
            value={formData.parent_contact_number}
            onChange={handleChange}
            required
          />
          <div className="stud-reg-button-group">
            <button type="submit" className="stud-reg-button-group-indiv">
              Register
            </button>
            <button className="stud-reg-button-group-indiv" onClick={onClose}>Discard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Students = () => {

  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current.data.token;

  // FUNCTIONS
  const [studentGrid, setStudentGrid] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH STUDENT DETAILS from the API
  const fetchStudents = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const response = await axios.get(
        `https://hosteler-backend.onrender.com/base/student/`,
        config
      );
  
      const studentData = response.data;
      const roomDataPromises = studentData.map(async student => {
        if (student.roll_number) {
          try {
            const roomResponse = await axios.get(
              `https://hosteler-backend.onrender.com/base/room/${student.roll_number}/`,
              config
            );
  
            const room = roomResponse.data;
            return {
              ...student,
              roomNumber: room.room_number
            };
          } catch (error) {
            if (error.response && error.response.status === 404) {
              return {
                ...student,
                roomNumber: "Not Allotted"
              };
            }
            throw error;
          }
        } else {
          return student;
        }
      });
  
      const studentWithRoom = await Promise.all(roomDataPromises);
      setStudentGrid(studentWithRoom);
      setIsLoading(false);
      console.log(studentWithRoom);
    } catch (error) {
      console.error("Error fetching resource details:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  

  // Function to handle changes in the search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Functions to handle the registration popup
  const handleOpenRegisterPopup = () => {
    setRegisterPopupOpen(true);
  };
  const handleCloseRegisterPopup = () => {
    setRegisterPopupOpen(false);
  };

  // Functions to handle the student popup
   const handleOpenPopup = (studentPopup) => {
    setSelectedStudent(studentPopup);
  };
  const handleClosePopup = () => {
    setSelectedStudent(null);
  };

  // Filter students based on the search query
  const filteredStudents = studentGrid.filter( (studentFilter) =>
    studentFilter && studentFilter.first_name && studentFilter.last_name && 
    studentFilter.roll_number &&
    studentFilter.roomNumber  &&
    (
      studentFilter.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studentFilter.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studentFilter.roomNumber.toString().includes(searchQuery) ||
      studentFilter.roll_number.toString().includes(searchQuery)
    )
  );

  const shouldApplyPadding = filteredStudents.length < 4;

  return (
    
    <div className="student">
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>STUDENT DETAILS</h2>
          </div>
        </div>

        <div className="stud-register-button-div">
          <button className="stud-register-button" onClick={handleOpenRegisterPopup}>REGISTER NEW STUDENT</button>
        </div>

        {/* Search Bar */}
        <div className="stud-search-bar">
          <input
            type="text"
            placeholder="Search by name, room number, or roll number"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div>
        {isLoading ? 
        (
          // LOADING SCREEN
          <div className='stud-loading'>
            <FaCircleNotch className="stud-loading-icon" />
          </div>
        ) : (
          filteredStudents.length !== 0 ? (
            <div
              className="stud-grid-container" 
                style={{ paddingBottom: shouldApplyPadding ? '107px' : '0'
              }}>
              {
                filteredStudents.length !== 0 &&
                filteredStudents.map((student) => (
                <div
                    onClick={() => handleOpenPopup(student)}
                    className="grid-item-content"
                >
                    <StudBlock
                    key={student?.roll_number}
                    student={student}
                    roomNumber={student.roomNumber}
                    token={token}
                    />
                </div>
              ))}
            </div>
            ) : (
              <div
                className="no-student-cont" 
                style={{ 
                  paddingBottom: '260px'
                }}>
                  NO STUDENTS
              </div> 
            )
          )
        }
        </div>
          
        
        {/* Popup for REGISTERING a Student */}
        
        {registerPopupOpen && (
          < RegPopup
            first_name={""} 
            last_name={""} 
            date_of_birth={""} 
            gender={""} 
            address={""} 
            contact_number={""} 
            blood_group={""} 
            photo={""} 
            roll_number={""} 
            email_address={""} 
            batch={""} 
            department={""} 
            course={""} 
            parent_first_name={""} 
            parent_last_name={""} 
            parent_email={""} 
            parent_contact_number={""}
            onClose={handleCloseRegisterPopup}
            registerMode={true}
          />
        )}

        {/* Popup on SELECTING a Student */}

        {selectedStudent && (
          <Popup
            name={selectedStudent.first_name+" "+selectedStudent.last_name}
            roll={selectedStudent.roll_number}
            dateOfBirth={selectedStudent.date_of_birth}
            address={selectedStudent.address}
            roomnum={selectedStudent.roomNumber}
            phoneNumber={selectedStudent.contact_number}
            bloodGroup={selectedStudent.blood_group}
            studentPopupPhoto={selectedStudent?selectedStudent.photo?.substr(13): ""}
            course={selectedStudent.course}
            parentName={selectedStudent.parent_first_name+" "+selectedStudent.parent_last_name}
            parentContactNum={selectedStudent.parent_contact_number}
            parentEmail={selectedStudent.parent_email}
            onClose={handleClosePopup}
            token={token}
          />
        )}

      </div>
    </div>
  );
};