// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const AttBlock = ({ roomnum, name, roll, present, onAttendanceChange, date }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [newPresent, setNewPresent] = useState(present);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   const handleAttendanceChange = () => {
//     onAttendanceChange(roomnum, newPresent, date);
//     setIsFormOpen(false);
//   };

//   const handleCancel = () => {
//     setNewPresent(present);
//     setIsFormOpen(false);
//   };

//   return (
//     <div className="att-box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className={`att-container`}>
//         <div
//           className={`att-room ${newPresent.toLowerCase()}`}
//           onClick={() => setIsFormOpen(true)}
//         >
//           <div className="att-room-no">ROOM NO</div>
//           <div className="att-num">{roomnum}</div>
//         </div>

//         {isHovered && present !== 'VACANT' && (
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
//               <ul>{name}</ul>
//               <ul>{roll}</ul>
//               <ul>{present}</ul>
//             </div>
//           </div>
//         )}

//         {isFormOpen && (
//           <div className="attendance-form">
//             <div className="form-group">
//               <label htmlFor={`present-${roomnum}`}></label>
//               <div className="checkbox-options">
//                 <label>
//                   <input
//                     type="radio"
//                     name={`present-${roomnum}`}
//                     value="PRESENT"
//                     checked={newPresent === 'PRESENT'}
//                     onChange={() => setNewPresent('PRESENT')}
//                   />
//                   Present
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name={`present-${roomnum}`}
//                     value="ABSENT"
//                     checked={newPresent === 'ABSENT'}
//                     onChange={() => setNewPresent('ABSENT')}
//                   />
//                   Absent
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name={`present-${roomnum}`}
//                     value="ON-LEAVE"
//                     checked={newPresent === 'ON-LEAVE'}
//                     onChange={() => setNewPresent('ON-LEAVE')}
//                   />
//                   On Leave
//                 </label>
//               </div>
//             </div>
//             <div className="form-actions">
//               <button className="btn btn-primary" onClick={handleAttendanceChange}>
//                 Save
//               </button>
//               <button className="btn btn-secondary" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// export const Attendance = () => {
  
//   const [attArray, setAttArray] = useState([]);
//   const [selectedFloor, setSelectedFloor] = useState('GROUND');
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleFloorChange = (floor) => {
//     setSelectedFloor(floor);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleAttendanceChange = (roomnum, newPresent, date) => {
//     const updatedArray = attArray.map((room) => {
//       if (room.roomnum === roomnum && room.date.getTime() === date.getTime()) {
//         return { ...room, present: newPresent };
//       }
//       return room;
//     });
//     setAttArray(updatedArray);
//   };

//   useEffect(() => {
//     // Fetch attendance data based on selectedFloor and selectedDate
//     // Replace this with your actual API call or data retrieval logic
//     const fetchAttendanceData = async () => {
//       // Simulating API call delay with setTimeout
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Sample attendance data for demonstration
//       const attendanceData = [
//         // GROUND FLOOR: Room numbers 1-99
//         { roomnum: 1, name: 'John Doe', roll: 123, present: 'PRESENT', date: new Date("2023-07-10") },
//         { roomnum: 2, name: 'Jane Smith', roll: 456, present: 'ON-LEAVE', date: new Date("2023-07-10") },
//         { roomnum: 3, name: 'Alice Johnson', roll: 789, present: 'ABSENT', date: new Date("2023-07-10") },
//         { roomnum: 99, name: 'Some Name', roll: 999, present: 'PRESENT', date: new Date("2023-07-11") },
//         // Add more attendance data for different floors and dates
//       ];

//       setAttArray(attendanceData);
//     };

//     fetchAttendanceData();
//   }, [selectedFloor, selectedDate]);

//   const filteredRooms = attArray.filter((room) => {
//     if (selectedFloor === 'GROUND') {
//       return room.roomnum >= 1 && room.roomnum <= 99;
//     } else if (selectedFloor === '1ST FLOOR') {
//       return room.roomnum >= 100 && room.roomnum <= 199;
//     } else if (selectedFloor === '2ND FLOOR') {
//       return room.roomnum >= 200 && room.roomnum <= 299;
//     } else if (selectedFloor === '3RD FLOOR') {
//       return room.roomnum >= 300 && room.roomnum <= 399;
//     }
//     return true; // If none of the floors match, return all rooms
//   });

//   return (
//     <div className="attendance">
//       <div id="team" className="text-center">
//         <div className="container">
//           <div className="col-md-8 col-md-offset-2 section-title">
//             <h2>ATTENDANCE</h2>
//           </div>
//         </div>

//         <div className="date-picker">
//           <DatePicker selected={selectedDate} onChange={handleDateChange} />
//         </div>

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

//         <div className="att-grid-container">
//           {filteredRooms.map((room, index) => (
//             <div className="att-grid-item" key={index}>
//               <AttBlock
//                 roomnum={room.roomnum}
//                 name={room.name}
//                 roll={room.roll}
//                 present={room.present}
//                 onAttendanceChange={handleAttendanceChange}
//                 date={selectedDate}
//               />
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };