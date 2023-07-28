import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  CardActions,
  Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import './../../styles/commonclasses.css';
import './../../styles/variable.css';

const axios = require('axios').default;

const DishCard = (props) => {
  const [number, setNumber] = useState(0);

  const handleAdd = () => {
    setNumber(number + 1);
    props.addDish('add', props.dish);
  };

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
