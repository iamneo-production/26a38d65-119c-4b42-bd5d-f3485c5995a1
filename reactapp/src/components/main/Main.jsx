import React, { useEffect, useState } from 'react';
import TopBar from '../topbar/Topbar';
import Login from '../login/Login';
import Register from '../register/Register';
import CustomerView from '../customerView/CustomerView';
import DriverView from '../driverView/DriverView';
import RestaurantView from '../restaurantView/RestaurantView';
import Welcome from '../Welcome/Welcome';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import './Main.css';
import axios from 'axios';

const Main = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
  const [currentUser, setCurrentUser] = useState(undefined);
  const [view, setView] = useState("Home");

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    if (userId && userType) {
      axios.get(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/${userType}/${userId}`).then(
        response => {
          setCurrentUser(response.data);
        }
      ).catch(err => console.log(err));
    }
  }

  const changeUser = (newUser, action) => {
    setCurrentUser(newUser);
    if (action === "login") {
      setUserId(newUser.id);
      setUserType(newUser.type);
      sessionStorage.setItem("userId", newUser.id);
      sessionStorage.setItem("userType", newUser.type);
    } else if (action === "logout") {
      sessionStorage.clear();
      setUserId(undefined);
      setUserType(undefined);
    }
  }

  const changeView = (type) => {
    setView(`${type}'s View`);
  }

  return (
    <Router>
      <Grid container justifyContent="flex-start">
        <Grid item xs={12}>
          <div className="grid-main">
            {userType && (
              <TopBar changeUser={changeUser} view={view} currentUser={currentUser} userType={userType} />
            )}
            <Switch>
              {/* Routes for different user types */}
              {userType === 'customer' ? (
                <Route path="/customer">
                  <CustomerView currentUser={currentUser} changeView={changeView} />
                </Route>
              ) : (
                <Redirect from="/customer" to="/login" />
              )}
              {userType === 'driver' ? (
                <Route path="/driver">
                  <DriverView currentUser={currentUser} changeView={changeView} />
                </Route>
              ) : (
                <Redirect from="/driver" to="/login" />
              )}
              {userType === 'restaurant' ? (
                <Route path="/restaurant">
                  <RestaurantView currentUser={currentUser} changeView={changeView} />
                </Route>
              ) : (
                <Redirect from="/restaurant" to="/login" />
              )}
              {/* Route for /welcome */}
              {/* <Route path="/welcome">
                <Welcome />
              </Route> */}
              {/* Route for /login */}
              {!userType ? (
                <Route path="/login">
                  <Login changeUser={changeUser} />
                </Route>
              ) : (
                <Redirect from="/login" to={`/${userType}`} />
              )}
              {/* Route for /register */}
              {!userType ? (
                <Route path="/register">
                  <Register changeUser={changeUser} />
                </Route>
              ) : (
                <Redirect from="/register" to={`/${userType}`} />
              )}
              {/* Redirect for the root URL */}
              <Redirect exact from="/" to="/login" />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </Router>
  );
}

export default Main;