import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AttBlock = ({ id, name, roll, present, onAttendanceChange, date }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPresent, setNewPresent] = useState(present);

  // Hovering on Attendance Tile
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAttendanceChange = () => {
    onAttendanceChange(id, newPresent, date);
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setNewPresent(present);
    setIsFormOpen(false);
  };

  return (
    <div className="att-box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`att-container`}>
        <div
          className={`att-room ${newPresent.toLowerCase()}`}
          onClick={() => setIsFormOpen(true)}
        >
          <div className="att-room-no">ROOM NO</div>
          <div className="att-num">{id}</div>
        </div>

        {isHovered && present !== 'VACANT' && (
          <div className="hover-details">
            <div className="att-title">
              <ul>Name</ul>
              <ul>Roll No</ul>
              <ul>Status</ul>
            </div>
            <div>
              <ul>:</ul>
              <ul>:</ul>
              <ul>:</ul>
            </div>
            <div className="att-variable">
              <ul>{name}</ul>
              <ul>{roll}</ul>
              <ul>{present}</ul>
            </div>
          </div>
        )}

        {isFormOpen && (
          <div className="attendance-form">
            <div className="form-group">
              <label htmlFor={`present-${id}`}></label>
              <div className="checkbox-options">
                <label>
                  <input
                    type="radio"
                    name={`present-${id}`}
                    value="PRESENT"
                    checked={newPresent === 'PRESENT'}
                    onChange={() => setNewPresent('PRESENT')}
                  />
                  Present
                </label>
                <label>
                  <input
                    type="radio"
                    name={`present-${id}`}
                    value="ABSENT"
                    checked={newPresent === 'ABSENT'}
                    onChange={() => setNewPresent('ABSENT')}
                  />
                  Absent
                </label>
                <label>
                  <input
                    type="radio"
                    name={`present-${id}`}
                    value="ON-LEAVE"
                    checked={newPresent === 'ON-LEAVE'}
                    onChange={() => setNewPresent('ON-LEAVE')}
                  />
                  On Leave
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleAttendanceChange}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export const Attendance = () => {

  // TOKEN GENERATED ON LOGIN
  const user = useRef();
  user.current = JSON.parse(localStorage.getItem("userInfo"));
  let token = user.current.data.token;

  const [attGrid, setAttGrid] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('GROUND');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // FETCH ATTENDANCE DETAILS
  const fetchAttendanceData = async () => {
    try {
      const config={
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
        const response = await axios.get(
          `https://hosteler-backend.onrender.com/base/attendance/`,config
          );
          setAttGrid(response.data);
          console.log(10,attGrid)
        }
      catch (error) {
        console.error("Error fetching resource details:", error);
        }
      };
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const filteredRooms = attGrid.filter((room) => {
    if (selectedFloor === 'GROUND') {
      return room.id >= 1 && room.id <= 99;
    } else if (selectedFloor === '1ST FLOOR') {
      return room.id >= 100 && room.id <= 199;
    } else if (selectedFloor === '2ND FLOOR') {
      return room.id >= 200 && room.id <= 299;
    } else if (selectedFloor === '3RD FLOOR') {
      return room.id >= 300 && room.id <= 399;
    }
    return true;
  });

  return (
    <div className="attendance">
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>ATTENDANCE</h2>
          </div>
        </div>

        {/* <div className="date-picker">
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div> */}

        <div className="floor-buttons">
          <button
            className={selectedFloor === 'GROUND' ? 'active' : ''}
            onClick={() => handleFloorChange('GROUND')}
          >
            GROUND
          </button>
          <button
            className={selectedFloor === '1ST FLOOR' ? 'active' : ''}
            onClick={() => handleFloorChange('1ST FLOOR')}
          >
            1ST FLOOR
          </button>
          <button
            className={selectedFloor === '2ND FLOOR' ? 'active' : ''}
            onClick={() => handleFloorChange('2ND FLOOR')}
          >
            2ND FLOOR
          </button>
          <button
            className={selectedFloor === '3RD FLOOR' ? 'active' : ''}
            onClick={() => handleFloorChange('3RD FLOOR')}
          >
            3RD FLOOR
          </button>
        </div>

        <div className="att-grid-container">
          {filteredRooms.map((room, index) => (
            <div className="att-grid-item" key={index}>
              <AttBlock
                id={room.id}
                name={room.name}
                roll={room.roll}
                present={room.present}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};