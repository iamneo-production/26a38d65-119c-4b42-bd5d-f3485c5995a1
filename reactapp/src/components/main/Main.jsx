import React, { useEffect, useState } from 'react';
import TopBar from '../topbar/Topbar';
import Login from '../login/Login';
import Register from '../register/Register';
import CustomerView from '../customerView/CustomerView';
import DriverView from '../driverView/DriverView';
import RestaurantView from '../restaurantView/RestaurantView';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import './Main.css';
import axios from 'axios';
import AdminView from '../Admin/Adminview';

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
            <Switch>
              {userType && userType === "customer" && (
                <TopBar changeUser={changeUser} view={view} currentUser={currentUser} userType={userType} />
              )}
              {userType && userType === "driver" && (
                <TopBar changeUser={changeUser} view={view} currentUser={currentUser} userType={userType} />
              )}
              {userType && userType === "restaurant" && (
                <TopBar changeUser={changeUser} view={view} currentUser={currentUser} userType={userType} />
              )}
              {userType && userType === "admin" && (
                <TopBar changeUser={changeUser} view={view} currentUser={currentUser} userType={userType} />
              )}
            </Switch>
            <Switch>
              {userType && userType === "customer" ? (
                <Route path="/customer" render={props => <CustomerView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Redirect path="/customer" to="/login" />
              )}
              {userType && userType === "driver" ? (
                <Route path="/driver" render={props => <DriverView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Redirect path="/driver" to="/login" />
              )}
              {userType && userType === "restaurant" ? (
                <Route path="/restaurant" render={props => <RestaurantView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Redirect path="/restaurant" to="/login" />
              )}
              {userType && userType === "admin" ? (
                <Route path="/admin" render={props => <AdminView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Redirect path="/admin" to="/login" />
              )}
              {!userType ? (
                <Route path="/login" render={props => <Login {...props} changeUser={changeUser} />} />
              ) : (
                <Redirect path="/login" to={`/${userType}`} />
              )}
              {!userType ? (
                <Route path="/register" render={props => <Register {...props} changeUser={changeUser} />} />
              ) : (
                <Redirect path="/register" to={`/${userType}`} />
              )}
               {!userType ? (
                <Route path="/admin" render={props => <Register {...props} changeUser={changeUser} />} />
              ) : (
                <Redirect path="/admin" to={`/${userType}`} />
              )}
              <Redirect path="/" to="/login" />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </Router>
  );
}

export default Main;