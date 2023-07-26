import React from 'react';
import { Grid, Typography} from '@mui/material';
import OrderCard from "../../card/OrderCard";
import './Restaurant.css'
import axios from 'axios';

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
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/myActiveOrders/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <>
        <br/>
        <br/>
        <br/>
        <Grid container justifyContent="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} />
            </Grid>
          )) : 
          <Grid container justifyContent="center">
          <Typography variant="h5" style={{marginTop:"170px",marginLeft:"100px"}}>NO ACTIVE ORDERS</Typography>
          </Grid>
          }
        </Grid>
      </>
    ) : <div />
  }
}

export default RestaurantOrder;