import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {
  Grid, Typography
} from '@material-ui/core';
import RestaurantCard from "../../card/RestaurantCard";
import "./Customer.css";
const axios = require('axios').default;

const CustomerHome = ({ currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState(undefined);

  useEffect(() => {
    findRestaurants(searchText);
  }, []);

  const findRestaurants = (query) => {
    if (query !== undefined && query !== "") {
      axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/all")
        .then(response => {
          const temp = response.data.filter(
            restaurant => restaurant.information.restaurantName===searchText
          );
          setSearchText("");
          setRestaurants(temp);
        })
    } else {
      axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/all")
        .then(response => {
          const temp = response.data.filter(
            restaurant => restaurant.information != null && restaurant.menu != null
          );
          setSearchText("");
          setRestaurants(temp);
        })
        .catch(err => console.log(err));
    }
  }

  const handleChange = (event) => {
    setSearchText(event.target.value);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    findRestaurants(searchText);
  }

  return currentUser ? (
    <div>
      <Grid container justifyContent="center">
        <Grid>
          <Paper component="form" onSubmit={handleSearch} style={{ width: 500, padding: '2px 4px', display: "flex", marginLeft: '450px',borderRadius:"20px" }}>
            <InputBase
              style={{ marginLeft: '10px', width: 325}}
              placeholder="Search Restaurant or Food"
              value={searchText}
              onChange={handleChange}
            />
            <IconButton type="submit" aria-label="search" style={{ marginLeft: '50px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid xs={12}>
          <br />
          <br />
          <br />
          {restaurants && restaurants.length !== 0 ?(<div>
          <Typography variant="h4" align='center' style={{ marginLeft: '450px' }}>Top Brands</Typography></div>):<Grid/>}

          <div className="cardbody">
            <Grid container justifyContent="space-evenly" spacing={4} style={{marginLeft:"140px"}}>
              {restaurants && restaurants.length !== 0 ? restaurants.map(restaurant => (
                <Grid xs={4} key={restaurant.id}>
                  <RestaurantCard userId={currentUser.id} restaurantId={restaurant.id} restaurantInfo={restaurant.information} />
                </Grid>
              )) : <Typography variant="h5" component="h2" style={{marginLeft:"100px"}} ><i>No result matches your search, please try again...</i></Typography>}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : <div />;
}

export default CustomerHome;