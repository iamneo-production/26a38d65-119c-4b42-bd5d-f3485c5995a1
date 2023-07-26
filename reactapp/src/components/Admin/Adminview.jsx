
import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import Admindash from './mainpage/Admindash';
import Customers from './mainpage/Customers';
import Restaurants from './mainpage/Restaurants';
import Drivers from './mainpage/Drivers';


class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeView("Admin")
  }
  render() {
    return this.props.currentUser ? (
      <Router>

        <Grid container justifyContent="center">
         
              <br/>
              <br/> 
              <Switch>
              <Route exact path="/admin/admindash"  render={props => <Admindash {...props} currentUser={this.props.currentUser} />} />
              <Route exact path="/admin/customers" render={props => <Customers {...props} currentUser={this.props.currentUser} />} />
              <Route exact path="/admin/drivers" render={props => <Drivers {...props} currentUser={this.props.currentUser} />} />
              <Route exact path="/admin/restaurants" render={props => <Restaurants {...props} currentUser={this.props.currentUser} />} />
              <Redirect path="/admin" to="/admin/admindash"/>
              </Switch>
           
        </Grid>
      </Router>
    ) : <div />;
  }
}

export default AdminView;