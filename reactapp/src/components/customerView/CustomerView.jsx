import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import CustomerHome from "./mainpage/CustomerHome";
import DisplayRestaurant from "./mainpage/DisplayRestaurant";
import ShopCart from "./mainpage/ShopCart";
import CustomerOrder from "./mainpage/CustomerOrder";
import CustomerHistory from "./mainpage/CustomerHistory";
import Support from '../support/Support';


class CustomerView extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeView("Customer")
  }
  render() {
    return this.props.currentUser ? (
      <Router>

        <Grid container justifyContent="flex-start">
         
          <Grid  sm={9}>
            <div className="grid">
              <br/>
              <br/>
              <Switch>
                <Route path="/customer/home" render={props => <CustomerHome {...props} currentUser={this.props.currentUser} />} />
                <Route path="/customer/cart" render={props => <ShopCart {...props} currentUser={this.props.currentUser} />} />
                <Route path="/customer/orders" render={props => <CustomerOrder {...props} currentUser={this.props.currentUser} />} />
                <Route path="/customer/history" render={props => <CustomerHistory {...props} currentUser={this.props.currentUser} />} />
                <Route path="/customer/support" render={props => <Support {...props} currentUser={this.props.currentUser} />} />
                <Route path="/customer/restaurant/:restaurantId" render={props => <DisplayRestaurant {...props} currentUser={this.props.currentUser} />} />
                <Redirect path="/customer" to="/customer/home" />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Router>
    ) : <div />;
  }
}

export default CustomerView;