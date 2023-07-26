import React, { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const axios = require('axios').default;

export default function Header() {
    const [searchText, setSearchText] = useState("");
    const [restaurants, setRestaurants] = useState(undefined);

    useEffect(() => {
      findRestaurants(searchText);
    }, []);

    const findRestaurants = (query) => {
        if (query !== undefined && query !== "") {
          axios.get("http://localhost:8080/restaurant/all")
            .then(response => {
              const temp = response.data.filter(
                restaurant => restaurant.information.restaurantName === searchText
              );
              setSearchText("");
              setRestaurants(temp);
            })
        } else {
          axios.get("http://localhost:8080/restaurant/all")
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

    return (
        <AppBar className="Header" position="absolute" color="default">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                    Food Desk {/* Add the name "Food Desk" */}
                </Typography>
                <Paper component="form" onSubmit={handleSearch} style={{ width: 300, padding: '2px 4px', marginLeft: '400px' }}>
                    <InputBase
                        style={{ marginLeft: '10px', width: 200 }} 
                        placeholder="Search Restaurant or Food"
                        value={searchText}
                        onChange={handleChange}
                    />
                    <IconButton type="submit" aria-label="search" style={{ marginLeft: '5px' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Toolbar>
        </AppBar>
    );
}
