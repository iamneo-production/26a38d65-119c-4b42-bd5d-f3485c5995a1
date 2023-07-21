import React from 'react';
import { Grid, Typography,Stack} from '@mui/material';
import OrderCard from "../../card/OrderCard";
import './Restaurant.css'
const axios = require('axios').default;

class RestaurantOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getRestaurantOrders = this.getRestaurantOrders.bind(this);
  }
  
  componentDidMount() {
    this.getRestaurantOrders();
  }

  getRestaurantOrders() {
    axios.get("http://localhost:8080/restaurant/myActiveOrders/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <>
        <Stack  justifyContent="center" alignItems="center" className="order" >
            <Typography margin="70px" variant="h4">Active Orders </Typography>
            </Stack>
        <Grid container justifyContent="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} />
            </Grid>
          )) : 
          <Grid container justifyContent="center">
          <Typography variant="h5">NO ACTIVE ORDERS</Typography>
          </Grid>
          }
        </Grid>
      </>
    ) : <div />
  }
}

export default RestaurantOrder;