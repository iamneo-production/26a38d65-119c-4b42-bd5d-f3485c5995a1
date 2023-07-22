import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class DriverOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: undefined
    }
    this.getActiveOrder = this.getActiveOrder.bind(this);
  }

  componentDidMount() {
    this.getActiveOrder();
  }

<<<<<<< HEAD
  getActiveOrder() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/myActiveOrder/" + this.props.currentUser.id).then(
=======
  getPendingOrders() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/api/driver/pendingOrders/" + this.props.currentUser.id).then(
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
      response => {
        this.setState({order: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
<<<<<<< HEAD
    return this.props.currentUser && this.state.order ? (
      <div>
        <Grid container justify="space-evenly" spacing={3}>
          <Grid item xs={5}>
            <OrderCard order={this.state.order} userType={this.props.currentUser.type} getOrders={this.getActiveOrder} />
          </Grid>
=======
    return this.props.currentUser && this.state.orders ? (
      <div className= 'styling'>
        <Grid container justifyContent="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={this.props.currentUser.type} getOrders={this.getPendingOrders} />
            </Grid>
          )) : <Typography variant="h5"  style = {{marginBottom: '100px' }}><i>There is no available order...</i></Typography>}
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
        </Grid>
      </div>
    ) : <Typography variant="h5"><i>You don't have any active order...</i></Typography>
  }
}

export default DriverOrder;