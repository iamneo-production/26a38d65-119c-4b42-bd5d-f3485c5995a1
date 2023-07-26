import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import './DriverHomes.css';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class DriverOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getPendingOrders = this.getPendingOrders.bind(this);
  }

  componentDidMount() {
    this.getPendingOrders();
  }

  getPendingOrders() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/pendingOrders/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <div className= 'styling'>
        <Grid container justifyContent="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={this.props.currentUser.type} getOrders={this.getPendingOrders} />
            </Grid>
          )) : <Typography variant="h5"  style = {{marginBottom: '100px' }}><i>There is no available order...</i></Typography>}
        </Grid>
       
      </div>
      
    ) :
    <div className='styling'> <Typography variant="h5" style = {{marginBottom: '100px' }} className="styling"><i>You already have an pending order in delivery...</i></Typography></div>
  }
}

export default DriverOrder;