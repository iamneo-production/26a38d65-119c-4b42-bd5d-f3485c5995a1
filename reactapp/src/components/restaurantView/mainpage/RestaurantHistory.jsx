import React from 'react';
import { Grid, Typography,Stack } from '@mui/material';
import OrderCard from "../../card/OrderCard";
import './Restaurant.css';
const axios = require('axios').default;

class RestaurantHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getRestaurantHistory = this.getRestaurantHistory.bind(this);
  }

  componentDidMount() {
    this.getRestaurantHistory();
  }

  getRestaurantHistory() {
    axios.get("http://localhost:8080/restaurant/myOrderHistory/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <div>
        <Stack  justifyContent="center" alignItems="center" className="order" >
<Typography margin="70px" variant="h4" color="white">Your Past Orders </Typography>
</Stack>
        <Grid container justifyContent="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={this.props.currentUser.type} />
            </Grid>
          )) : 
          <Grid container justifyContent="center">
          <Typography variant="h5"><i>You don't have any past orders...</i></Typography>
          </Grid>
          }
          
        </Grid>
      </div>
    ) : <div />
  }
}

export default RestaurantHistory;