import React from 'react';
import { Grid, Typography} from '@mui/material';
import OrderCard from "../../card/OrderCard";
import './Restaurant.css';
import axios from 'axios';

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
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/myOrderHistory/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <div>
        <br/>
        <br/>
        <br/>
        <Grid container justifyContent="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={this.props.currentUser.type} />
            </Grid>
          )) : 
          <Grid container justifyContent="center">
          <Typography variant="h5" style={{marginTop:"170px",marginLeft:"100px"}}><i>You don't have any past orders...</i></Typography>
          </Grid>
          }
          
        </Grid>
      </div>
    ) : <div />
  }
}

export default RestaurantHistory;