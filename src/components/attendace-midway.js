// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { FaCalendarDay,FaCircleNotch } from 'react-icons/fa';

// const AttBlock = ({ room , token, handlePopupOpen }) => {

//   const [isHovered, setIsHovered] = useState(false);

//   // Hovering on Attendance Tile
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };
//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div className="att-box" onClick={() => handlePopupOpen(room)}
//      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className={`att-container ${
//                 room.status === "PRESENT"
//                   ? "present"
//                   : room.status === "ABSENT"
//                   ? "absent"
//                   : room.status === "LEAVE"
//                   ? "leave"
//                   : "vacant"
//               }`}
//           >
//         <div
//           className={"att-room"}
//         >
//           <div className="att-room-no">ROOM NO</div>
//           <div className="att-num">{room.room_number}</div>
//         </div>

//         {isHovered && room.occupancy_status !== 'VACANT' && (
//           <div className="hover-details">
//             <div className="att-title">
//               <ul>Name</ul>
//               <ul>Roll No</ul>
//               <ul>Status</ul>
//             </div>
//             <div>
//               <ul>:</ul>
//               <ul>:</ul>
//               <ul>:</ul>
//             </div>
//             <div className="att-variable">
//               <ul>{room.studentName}</ul>
//               <ul>{room.student}</ul>
//               <ul>{room.status}</ul>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };


// const RoomPopup = ({ room, token, onClose, handleMouseLeave }) => {

//   const [selectedStatus, setSelectedStatus] = useState(room.status);

//   const handleAttendanceChange = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.put(
//         `https://hosteler-backend.onrender.com/base/attendance/update/${room.student}/`,
//         { status: selectedStatus },
//         config
//       );
      
//       setRoomStatus(selectedStatus);
//       onClose();
//       handleMouseLeave();

//     } catch (error) {
//       console.error("Error approving leave:", error);
//     }
//   };
  
//   const setRoomStatus = (newStatus) => {
//     setSelectedStatus(newStatus);
//   };
//   useEffect(() => {
//   }, [selectedStatus]);

//   return (
//     <div className="room-popup">
//       <div className="room-popup-content">
//         <h1>ROOM NO</h1>
//         <h2>{room.room_number}</h2>
//         <div className="room-checkbox-options">

//           <label>
//             <input
//               type="radio"
//               name={`status-${room.room_number}`}
//               value="PRESENT"
//               checked={selectedStatus  === 'PRESENT'}
//               onChange={() => setSelectedStatus('PRESENT')}
//             />
//             Present
//           </label>

//           <label>
//             <input
//               type="radio"
//               name={`status-${room.room_number}`}
//               value="ABSENT"
//               checked={selectedStatus  === 'ABSENT'}
//               onChange={() => setSelectedStatus('ABSENT')}
//             />
//             Absent
//           </label>

//         </div>
//         <button className="room-btn btn-primary" onClick={handleAttendanceChange}>
//           Update
//         </button>
//         <button className="room-btn btn-primary" onClick={onClose}>Close</button>

//       </div>
//     </div>
//   );
// };

// export const Attendance = () => {

//   // TOKEN GENERATED ON LOGIN
//   const user = useRef();
//   user.current = JSON.parse(localStorage.getItem("userInfo"));
//   let token = user.current.data.token;

//   // ATTENDANCE GRID
//   const [attGrid, setAttGrid] = useState([]);
//   const [selectedFloor, setSelectedFloor] = useState('1ST FLOOR');
//   const [isLoading, setIsLoading] = useState(false);

//   // NEW DATE SELECTION & FORMATTING
//   const [todayDate, setTodayDate] = useState(new Date());

//   const handleDateChange = async (date) => {
//     setIsLoading(true);
//     setSelectedDate(date);
//     await fetchAttendanceData();
//     setIsLoading(false);
//   };
//   const getYesterdayDate = () => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
//     return yesterday;
//   };

//   const [yesterdayDate, setYesterdayDate] = useState(getYesterdayDate());
//   const [selectedDate, setSelectedDate] = useState(getYesterdayDate());

//   const formatDateToYYYYMMDD = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//  // FETCH ATTENDANCE DETAILS
//   const fetchAttendanceData = async () => {
//     try {
//       setIsLoading(true);
//       const config={
//           headers:{
//             Authorization: `Bearer ${token}`
//           }
//         }

//         const responseRoom = await axios.get(
//           `https://hosteler-backend.onrender.com/base/room/`,config
//         );

//         const roomDataPromises = responseRoom.data;
//         const vacantRooms = roomDataPromises.filter(room => room.occupancy_status === "VACANT");
//         const occupiedRooms = roomDataPromises.filter(room => room.occupancy_status === "OCCUPIED");
        
//         const roomsWithDetailsPromises = occupiedRooms.map(async room => {

//           const response = await axios.get(
//             `https://hosteler-backend.onrender.com/base/attendance/${room.student}/${formatDateToYYYYMMDD(selectedDate)}/`,config
//           );
//           // console.log(10,room); //Basic Occupied Room
          
//           const studentDataPromises = response.data.map(async att => {
//             const studentResponse = await axios.get(
//               `https://hosteler-backend.onrender.com/base/student/${att.student}/`,
//               config
//               );
//               const student = studentResponse.data;
//               return {
//                 ...att,
//                 studentName: `${student.first_name} ${student.last_name}`
//               };
//             });

//             const roomsWithStudentName = await Promise.all(studentDataPromises);
//             // console.log(20,roomsWithStudentName) //Attendance with Name

//           return {
//               ...room,
//               status: `${roomsWithStudentName[0]?.status}`,
//               studentName: `${roomsWithStudentName[0]?.studentName}`,
//               date: `${roomsWithStudentName[0]?.date}`
//             }
//           })

//           const roomsWithDetails = await Promise.all(roomsWithDetailsPromises);
//           console.log(30,roomsWithDetails)

//           const hostelRooms = [...vacantRooms, ...roomsWithDetails];
//           hostelRooms.sort((a, b) => a.room_number - b.room_number);

//           setAttGrid(hostelRooms);
//           setIsLoading(false);
//           console.log(attGrid)
//       }
//       catch (error) {
//         console.error("Error fetching resource details:", error);
//         }
//       };

//   useEffect(() => {
//     fetchAttendanceData();
//   }, [selectedDate]);

//   // FLOOR OPTIONS
//   const handleFloorChange = (floor) => {
//     setSelectedFloor(floor);
//   };

//   const filteredRooms = attGrid.filter((room) => {
//     if (selectedFloor === 'GROUND') {
//       return room.room_number >= 1 && room.room_number <= 99;
//     } else if (selectedFloor === '1ST FLOOR') {
//       return room.room_number >= 100 && room.room_number <= 199;
//     } else if (selectedFloor === '2ND FLOOR') {
//       return room.room_number >= 200 && room.room_number <= 299;
//     } else if (selectedFloor === '3RD FLOOR') {
//       return room.room_number >= 300 && room.room_number <= 399;
//     }
//     return true;
//   });

//   // INDIVIDUAL ROOM SELECTION
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [popupVisible, setPopupVisible] = useState(false);

//   const handlePopupOpen = (room) => {
//     setSelectedRoom(room);
//     setPopupVisible(true);
//   };
//   const handlePopupClose = () => {
//     setSelectedRoom(null);
//     setPopupVisible(false);
//   };

//   // NEW ATTENDANCE BUTTON
//   const [dateAttendanceCreated, setDateAttendanceCreated] = useState(yesterdayDate);

//   const handleNewAttendance = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       console.log(config)
//        const responseNew = await axios.get(
//         `https://hosteler-backend.onrender.com/base/attendance/create/`,
//         config
//         );
//     } catch (error) {
//       console.error("Error creating new attendance:", error);
//     }
//   };
  
//   return (
//     <div className="attendance">
//       <div id="team" className="text-center">
//         <div className="container">
//           <div className="col-md-8 col-md-offset-2 section-title">
//             <h2>ATTENDANCE</h2>
//           </div>
//         </div>

//         {/* <div className='new-att-button'>
//           {dateAttendanceCreated === selectedDate ? (
//             `New attendance has been created for ${formatDateToYYYYMMDD(new Date())}`
//           ) : (
//             <button onClick={handleNewAttendance}>
//               Create New Attendance for {formatDateToYYYYMMDD(todayDate)}
//             </button>
//           )}
//         </div> */}

//         {/* CALENDAR */}
//         <div className="date-picker">
//           <FaCalendarDay className="calendar-icon"/>
//           <DatePicker
//             onChange={handleDateChange}
//             selected={selectedDate}
//             dateFormat="yyyy-MM-dd"
//             maxDate={yesterdayDate}
//           />
//         </div>

//         {/* FLOOR BUTTONS */}
//         <div className="floor-buttons">
//           <button
//             className={selectedFloor === 'GROUND' ? 'active' : ''}
//             onClick={() => handleFloorChange('GROUND')}
//           >
//             GROUND
//           </button>
//           <button
//             className={selectedFloor === '1ST FLOOR' ? 'active' : ''}
//             onClick={() => handleFloorChange('1ST FLOOR')}
//           >
//             1ST FLOOR
//           </button>
//           <button
//             className={selectedFloor === '2ND FLOOR' ? 'active' : ''}
//             onClick={() => handleFloorChange('2ND FLOOR')}
//           >
//             2ND FLOOR
//           </button>
//           <button
//             className={selectedFloor === '3RD FLOOR' ? 'active' : ''}
//             onClick={() => handleFloorChange('3RD FLOOR')}
//           >
//             3RD FLOOR
//           </button>
//         </div>

//         {isLoading ? 
//         (
//           // LOADING SCREEN
//           <div className='att-loading'>
//             <FaCircleNotch className="att-loading-icon" />
//           </div>
//         ) : 
//         (
//           // ATTENDANCE GRID 
//           <div className="att-grid-container">
//             {filteredRooms.length !==0 && filteredRooms.map((room) => (
//               <div className="att-grid-item">
//                 <AttBlock
//                   key={room?.room_number}
//                   room={room}
//                   token={token}
//                   status={room.status}
//                   handlePopupOpen={handlePopupOpen}
//                 />
//               </div>
//             ))}
//           </div>
//         )
//         }

//         {popupVisible && selectedRoom && (
//           <RoomPopup
//             room={selectedRoom}
//             token={token}
//             onClose={handlePopupClose}
//           />
//         )}

//       </div>
//     </div>
//   );
// };