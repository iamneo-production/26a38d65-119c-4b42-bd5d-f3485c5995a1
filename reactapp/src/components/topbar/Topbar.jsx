import React, { useState, useEffect } from 'react';
import {
  AppBar
} from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import './TopBar.css';
import UserMenu from "./UserMenu"
import axios from 'axios';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#ef5350'
    }
  },
});

const Topbar = (props) => {
  const [view, setView] = useState(props.view);

  useEffect(() => {
    if (view !== props.view) {
      setView(props.view);
    }
  }, [props.view]);

  const logoutUser = () => {
    const type = props.currentUser.type;
    props.changeUser(undefined, "logout");
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/" + type + "/logout", {}).then(
      () => {
        console.log("Successfully log out");
      }
    ).catch(err => {
      console.log(err);
    });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar className="topbar" position="absolute" color="secondary">
        <UserMenu currentUser={props.currentUser} logoutUser={logoutUser} userType={props.userType}/>
      </AppBar>
    </MuiThemeProvider>
  );
}

export default Topbar;