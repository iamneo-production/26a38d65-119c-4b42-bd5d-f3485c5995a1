import React, { useState } from 'react';
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

const styles = {
  root: {
    padding: '1rem',
    marginTop: '10rem',
  },
  form: {
    width: '100%',
    marginTop: '1rem',
  },
  submit: {
    margin: '1rem 0',
    backgroundColor: '#1a73e8',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0f64d8',
    },
  },
};

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [loginFailed, setLoginFailed] = useState('');

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

    axios
      .post(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/${userType}/login`, { userName, password })
      .then((response) => {
        props.changeUser(response.data, 'login');
      })
      .catch((err) => {
        console.log(err.response.data);
        setUserName('');
        setPassword('');
        setLoginFailed(err.response.data);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div className="box">
          <Paper style={styles.root}>
            <Typography component="h1" variant="h5" align="center">
              Sign In
            </Typography>
            <form style={styles.form} onSubmit={loginUser}>
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
                <Button type="submit" fullWidth variant="contained" style={styles.submit}>
                  Submit
                </Button>
              </Grid>
            </form>

            {loginFailed && <p>{loginFailed}</p>}
            <br />
            <br />
            <Link to="/register" style={{ marginLeft: '0px', textDecoration: 'none' }}>
              Don't have an account? Sign Up
            </Link>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
