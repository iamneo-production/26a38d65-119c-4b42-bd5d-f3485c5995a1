import React from 'react';
import { Grid } from '@mui/material';
import EmptyDish from '../../card/EmptyDish';
import MenuCard from '../../card/MenuCard';



const axios = require('axios').default;

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu : undefined
    }
    this.getAllDishes = this.getAllDishes.bind(this);
  }

  componentDidMount() {
    this.getAllDishes();
  }

  getAllDishes() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/menu/" + this.props.currentUser.id).then(
      response => {
        this.setState({menu: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser ? (
      <>
      <EmptyDish getAllDishes={this.getAllDishes} currentUser={this.props.currentUser}/>
      <Grid container spacing={3} justify="space-evenly">
       {this.state.menu ? 
     ( this.state.menu.map((dish,index)=>(
          <Grid item xs={3} key={index}>
          <MenuCard dish={dish} getAllDishes={this.getAllDishes} currentUser={this.props.currentUser} />
        </Grid>
       ))):null 
      }
</Grid> 
</>
    ) : <div>The restaurant is not available</div>
  }
}

export default RestaurantMenu;