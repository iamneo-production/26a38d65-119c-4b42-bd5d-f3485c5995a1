// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// function WelcomeDishCard() {
//   const [dishes, setDishes] = useState([]);

//   useEffect(() => {
//     fetchDishes();
//   }, []);

//   const fetchDishes = () => {
//     axios
//       .get('http://localhost:8080/restaurant/allDishes')
//       .then((response) => {
//         setDishes(response.data);
//       })
//       .catch((error) => {
//         console.log('Error fetching dishes:', error);
//       });
//   };

//   // const settings = {
//   //   dots: true,
//   //   infinite: true,
//   //   speed: 500,
//   //   slidesToShow: 3, // Set the number of images to show in a single row (horizontally)
//   //   slidesToScroll: 1
//   // };

//   return (
//     // <div className='explore-grid'>
//     //   <Slider {...settings}>
//     //     {dishes.map((dish) => (
//     //       <div key={dish.id} className='explore-card cur-po'>
//     //         <div className='explore-card-cover'>
//     //           <Link to={"/login"} className="link">
//     //             <img className='explore-card-image' src={dish.imageUrl} alt={dish.dishName} />
//     //           </Link>
//     //         </div>
//     //         <Typography style={{ marginTop: '10px' }}>{dish.dishName}</Typography>
//     //         <Typography style={{ marginTop: '10px' }}>{"$ " + dish.price}</Typography>
//     //       </div>
//     //     ))}
//     //   </Slider>
//     // </div>
// <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
//   <ol class="carousel-indicators">
//     <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
//     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//   </ol>
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img class="d-block w-100" src="https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*" alt="First slide"/>
//     </div>
//     <div class="carousel-item">
//       <img class="d-block w-100" src="https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*" alt="Second slide"/>
//     </div>
//       {dishes.map((dish) => (
//     <div class="carousel-item">

//       <img class="d-block w-100" src="https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*" alt="Third slide"/>
//     </div>
//   </div>
//   <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="sr-only">Previous</span>
//   </a>
//   <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="sr-only">Next</span>
//   </a>
// </div>
//   );
// }

// export default WelcomeDishCard;
