import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Admindash from './mainpage/Admindash';
import View from './mainpage/view';
import Header from './header';
import {
    AppBar, Toolbar, Typography
  } from '@material-ui/core';
import './header.css';


class AdminView extends React.Component {
  render() {
    return (
      <Router>
        <Grid container justify="flex-start">
          <Grid>
          <AppBar className="topbar" position="absolute" color="secondary">
        <Header/>
              </AppBar>
          </Grid>
          <Grid item sm={9}>
            <div className="grid">
              <Switch>
                <Route path="/Admin/dashboard" component={Admindash} />
                <Route path="/Admin/view" component={View} />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Router>
    );
  }
}

export default AdminView;