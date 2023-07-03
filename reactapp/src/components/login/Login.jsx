import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(10),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  Grid: {
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1a73e8',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0f64d8',
    },
  },
}));

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [loginFailed, setLoginFailed] = useState('');

  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'userType') {
      setUserType(value);
    }
  };

  const loginUser = (event) => {
    event.preventDefault();

    axios.post("/api/" + userType + "/login", { userName, password })
    .then(response => {
      props.changeUser(response.data, "login");
    })
      .catch((err) => {
        console.log(err.response.data);
        setUserName('');
        setPassword('');
        setLoginFailed(err.response.data);
      });
  };

  document.body.style.backgroundImage = 'none';
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div className="box">
          <Paper className={classes.root}>
            <Typography component="h1" variant="h5" align="center">
              Sign In
            </Typography>
            <form className={classes.form} noValidate onSubmit={loginUser}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="text"
                    id="Username"
                    label="UserName"
                    name="userName"
                    autoComplete="username"
                    value={userName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Grid>

                <Typography variant="h6" align="center" style={{ marginLeft: '180px' }}>
                  Login as
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    style={{ marginLeft: '80px', marginTop: '10px' }}
                    name="userType"
                    value={userType}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                    <FormControlLabel value="driver" control={<Radio />} label="Driver" />
                    <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </Grid>
            </form>
            {loginFailed && <p>{loginFailed}</p>}
            <Link to="/register" style={{ marginLeft: '100px', textDecoration: 'none' }}>
              Don't have an account? Sign Up
            </Link>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
