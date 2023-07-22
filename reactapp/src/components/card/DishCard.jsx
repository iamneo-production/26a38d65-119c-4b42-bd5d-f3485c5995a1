import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Grid
<<<<<<< HEAD
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
=======
      } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
import './../../styles/commonclasses.css';
import './../../styles/variable.css';

const axios = require('axios').default;

const DishCard = (props) => {
  const [number, setNumber] = useState(0);

<<<<<<< HEAD
  const handleAdd = () => {
    setNumber(number + 1);
    props.addDish('add', props.dish);
  };
=======
  removeDish() {
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/removeDish", {
      restaurantId : this.props.currentUser.id,
      dish : this.props.dish
    }).then(
      response => {
        this.props.getAllDishes();
      }
    ).catch(err => console.log(err));
  }
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

  const handleMinus = () => {
    setNumber(number - 1);
    props.addDish('minus', props.dish);
  };

  const removeDish = () => {
    axios
      .post('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/removeDish', {
        restaurantId: props.currentUser.id,
        dish: props.dish,
      })
      .then((response) => {
        props.getAllDishes();
      })
      .catch((err) => console.log(err));
  };

  return props.dish && props.currentUser ? (
    <div className='max-width explore-section'>
      <div className='explore-grid'>
        <div className='explore-card cur-po'>
          <div className='explore-card-cover'>
            <img
              className='explore-card-image'
              src={props.dish.imageUrl}
              alt={props.dish.dishName}
            />
          </div>
          <Typography style={{ marginTop: '10px' }}>
            {props.dish.dishName}
          </Typography>
          <Typography style={{ marginTop: '10px' }}>
            {'$ ' + props.dish.price}
          </Typography>
        </div>
      </div>

<<<<<<< HEAD
      <CardActions style={{ backgroundColor: '#e6f7ff' }}>
        {props.currentUser.type !== 'restaurant' ? (
          <Grid container justifyContent='center' alignItems='center'>
            <IconButton disabled={number === 0} onClick={handleMinus}>
              <RemoveIcon />
            </IconButton>
            <Typography variant='h5'>{number}</Typography>
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Grid>
        ) : (
          <Grid container justifyContent='center' alignItems='center'>
            <IconButton onClick={removeDish}>
=======
           <CardActions style={{backgroundColor: "#e6f7ff"}}>
          {this.props.currentUser.type !== "restaurant" ?


          <Grid container justify="center" alignItems="center">
            <IconButton disabled={this.state.number === 0} onClick={this.handleMinus}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5">{this.state.number}</Typography>
            <IconButton onClick={this.handleAdd}>
              <AddIcon />
            </IconButton>
          </Grid> : 
          <Grid container justify="center" alignItems="center">
            <IconButton onClick={this.removeDish}>
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </CardActions>
    </div>
  ) : (
    <div />
  );
};

export default DishCard;
