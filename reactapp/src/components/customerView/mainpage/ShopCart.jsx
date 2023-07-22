import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import OrderCard from "../../card/OrderCard";
import PaymentGateway from '../../card/PaymentGateway';
const axios = require('axios').default;

class ShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    };
    this.getCartOrders = this.getCartOrders.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    this.getCartOrders();
  }

  getCartOrders() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/customer/myCart/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  checkout() {
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/order/checkoutAll", {orders: this.state.orders}).then(
      response => {
        this.getCartOrders();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { orders } = this.state;
    const totalSum = orders && orders.length > 0 ? orders.reduce((sum, order) => sum + order.price, 0) : 0;

    if (!this.props.currentUser || !orders) {
      return <div />;
    }

    return (
      <div>
        <Grid container justifyContent="space-evenly" spacing={5}>
          {orders.length > 0 ? (
            orders.map(order => (
              <Grid item key={order.id} xs={5}>
                <OrderCard order={order} userType={this.props.currentUser.type} getOrders={this.getCartOrders} />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" style={{ marginLeft: '45%', marginTop: '15%' }}>
              <i>Your Shopping Cart is Empty...</i>
            </Typography>
          )}
          {orders.length > 0 && (
            <Grid item xs={12}>
              <div className="checkoutBox">
                <Grid container justify="flex-end">
                  <Grid item>
                    <PaymentGateway price={totalSum}>
                      <Button variant="outlined" color="secondary" size="medium" onClick={this.checkout}>
                        Check out all orders
                      </Button>
                    </PaymentGateway>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default ShopCart;