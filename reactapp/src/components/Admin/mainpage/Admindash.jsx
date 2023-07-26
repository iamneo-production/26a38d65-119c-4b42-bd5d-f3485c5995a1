import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import '../../../styles/commonclasses.css';
import '../../../styles/variable.css';

const Admindash = (props) => {
  const [customers, setCustomers] = useState(0);
  const [drivers, setDrivers] = useState(0);
  const [restaurants, setRestaurants] = useState(0);

  useEffect(() => {
    axios.get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/customer/count')
      .then(response => {
        const customerCount = response.data;
        setCustomers(customerCount);
      })
      .catch(error => {
        console.error('Error fetching customers count:', error);
      });

    axios.get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/count')
      .then(response => {
        const driverCount = response.data;
        setDrivers(driverCount);
      })
      .catch(error => {
        console.error('Error fetching drivers count:', error);
      });

    axios.get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/count')
      .then(response => {
        const restaurantCount = response.data;
        setRestaurants(restaurantCount);
      })
      .catch(error => {
        console.error('Error fetching restaurants count:', error);
      });
  }, []);

  return (
    props.currentUser ? (
      <div className='max-width explore-section'>
        <div className='explore-grid'>
          <div className='explore-card cur-po'>
            <div className='explore-card-cover'>
              <br />
              <br />
              <Typography variant='h4' component='h2'>Customers</Typography>
              <Typography variant='h1' component='h1'>{customers}</Typography>
            </div>
          </div>
          <div className='explore-card cur-po'>
            <div className='explore-card-cover'>
              <br />
              <br />
              <Typography variant='h4' component='h2'>Drivers</Typography>
              <Typography variant='h1' component='h1'>{drivers}</Typography>
            </div>
          </div>
          <div className='explore-card cur-po'>
            <div className='explore-card-cover'>
              <br />
              <br />
              <Typography variant='h4' component='h2'>Restaurants</Typography>
              <Typography variant='h1' component='h1'>{restaurants}</Typography>
            </div>
          </div>
        </div>
      </div>
    ) : <div />
  );
};

export default Admindash;
