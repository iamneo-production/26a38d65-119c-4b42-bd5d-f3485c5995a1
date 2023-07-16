import React from 'react';
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Grid
      } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

import './../../styles/commonclasses.css';
import './../../styles/variable.css';

const axios = require('axios').default;

class DishCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number : 0
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.removeDish = this.removeDish.bind(this);
  }

  handleAdd() {
    this.setState({number: this.state.number + 1});
    this.props.addDish("add", this.props.dish);
  }

  handleMinus() {
    this.setState({number: this.state.number - 1});
    this.props.addDish("minus", this.props.dish);
  }

  removeDish() {
    axios.post("https://8080-bbafabdbdfaeddbefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/removeDish", {
      restaurantId : this.props.currentUser.id,
      dish : this.props.dish
    }).then(
      response => {
        this.props.getAllDishes();
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.dish && this.props.currentUser ? (
        <div className='max-width explore-section'>

         <div className='explore-grid'>
            <div className='explore-card cur-po'>
             <div className='explore-card-cover'>
              <img className="explore-card-image" src= {this.props.dish.imageUrl} alt={this.props.dish.dishName} />
              </div>
              <Typography style={{marginTop:'10px'}}>{this.props.dish.dishName}</Typography>
              <Typography style={{marginTop:'10px'}}>{"$ " + this.props.dish.price}</Typography>

              
              
              </div>
              
        </div>

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
              <DeleteIcon />
            </IconButton>
          </Grid>
          }
        </CardActions>


   
      </div>
    ) : <div />;
  }
}

export default DishCard;