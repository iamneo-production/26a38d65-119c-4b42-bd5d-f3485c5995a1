import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import './DriverHomes.css';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class PendingOrders extends React.Component {
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

  getActiveOrder() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/myActiveOrder/" + this.props.currentUser.id).then(
      response => {
        this.setState({order: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.order ? (
      <div className= 'styling'>
        <Grid container justifyContent="space-evenly" spacing={3}>
          <Grid item xs={5}>
            <OrderCard order={this.state.order} userType={this.props.currentUser.type} getOrders={this.getActiveOrder} />
          </Grid>
        </Grid>
      </div>
    ) :
    <div > <Typography variant="h5"  component="h2"  style={{marginTop:"200px"}}><i>You don't have any pending order...</i></Typography></div>
  }
}

export default PendingOrders;