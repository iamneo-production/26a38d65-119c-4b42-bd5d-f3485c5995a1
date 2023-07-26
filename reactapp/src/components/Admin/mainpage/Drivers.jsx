import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css'; 

const Drivers = (props) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/all')
      .then(response => {
        const driverData = response.data;
        setDrivers(driverData);
      })
      .catch(error => {
        console.error('Error fetching driver data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteDriver(id);
  };

  const deleteDriver = (id) => {
    axios.delete(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/${id}`)
      .then(response => {
        console.log(`Driver with ID ${id} deleted successfully`);
        setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== id));
      })
      .catch(error => {
        console.error(`Error deleting driver with ID ${id}:`, error);
      });
  };

  return (
    props.currentUser ? (
    <div className="table-container">
      {drivers.length === 0 ? (
        <h1 align="center" style={{marginTop:"170px"}}>No drivers found</h1>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User name</th>
              <th>Phone number</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.userName}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.city}</td>
                <td>{driver.state}</td>
                <td>
                  <button onClick={() => handleDelete(driver.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
) : <div />
);
};

export default Drivers;
