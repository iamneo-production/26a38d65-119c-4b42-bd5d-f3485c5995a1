import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css'; 

const Restaurants = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/all')
      .then(response => {
        const restaurantData = response.data;
        setRestaurants(restaurantData);
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteRestaurant(id);
  };

  const deleteRestaurant = (id) => {
    axios.delete(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/${id}`)
      .then(response => {
        console.log(`Restaurant with ID ${id} deleted successfully`);
        setRestaurants(prevRestaurants => prevRestaurants.filter(restaurant => restaurant.id !== id));
      })
      .catch(error => {
        console.error(`Error deleting restaurant with ID ${id}:`, error);
      });
  };

  return (
      props.currentUser ? (
    <div className="table-container">
      {restaurants.length === 0 ? (
        <h1 align="center" style={{marginTop:"170px"}}>No Restaurants found</h1>

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
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td>{restaurant.id}</td>
                <td>{restaurant.userName}</td>
                <td>{restaurant.phoneNumber}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>
                  <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
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

export default Restaurants;
