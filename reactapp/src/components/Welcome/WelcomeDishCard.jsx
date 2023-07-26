import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function WelcomeDishCard() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = () => {
    axios
      .get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/allDishes')
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.log('Error fetching dishes:', error);
      });
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3, // Set the number of images to show in a single row (horizontally)
  //   slidesToScroll: 1
  // };

  return (
    <div className='explore-grid'>
      
        {/* {dishes.map((dish) => (
          <div key={dish.id} className='explore-card cur-po'>
            <div className='explore-card-cover'>
              <Link to={"/login"} className="link">
                <img className='explore-card-image' src={dish.imageUrl} alt={dish.dishName} />
              </Link>
            </div>
            <Typography style={{ marginTop: '10px' }}>{dish.dishName}</Typography>
            <Typography style={{ marginTop: '10px' }}>{"$ " + dish.price}</Typography>
          </div>
        ))} */}
      
    </div>

  );
}

export default WelcomeDishCard;
