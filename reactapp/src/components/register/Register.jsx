import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(4),
    marginTop: theme.spacing(10),
  },
  form: {
    width: '100%',
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

const Register = ({ changeUser }) => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [passwordDifferent, setPasswordDifferent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [userType, setUserType] = useState('customer');
  const [registerFailed, setRegisterFailed] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userName') setUserName(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'validatePassword') setValidatePassword(value);
    else if (name === 'phoneNumber') setPhoneNumber(value);
    else if (name === 'address') setAddress(value);
    else if (name === 'city') setCity(value);
    else if (name === 'state') setState(value);
    else if (name === 'zip') setZip(value);
    else if (name === 'userType') setUserType(value);
  };

  const retypePassword = (event) => {
    const { value } = event.target;
    setValidatePassword(value);
    setPasswordDifferent(value !== password);
  };

  const registerUser = (event) => {
    event.preventDefault();
    if (passwordDifferent) {
      setRegisterFailed("Passwords don't match");
      return;
    }
    setRegisterFailed('');
    axios
      .post(`http://localhost:8080/api/${userType}/register`, {
        userName,
        password,
        phoneNumber,
        address,
        city,
        state,
        zip,
      })
      .then((response) => {
        changeUser(response.data, 'login');
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
        setRegisterFailed(err.response.data);
      });
  };

  return (
    <Grid container justify="center" style={{ marginBottom: '40px' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div className="box">
          <Paper className={classes.root}>
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={registerUser}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    type="text"
                    label="Username"
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
                    autoComplete="new-password"
                    value={password}
                    onChange={handleChange}
                  />
                </Grid>
                <Typography variant="body2" color="error">
                  {passwordDifferent && <i>Passwords don't match</i>}
                </Typography>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="validatePassword"
                    label="Confirm Password"
                    type="password"
                    id="validatePassword"
                    autoComplete="new-password"
                    value={validatePassword}
                    onChange={retypePassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    autoComplete="address"
                    value={address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone number"
                    type="text"
                    id="phoneNumber"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label="City"
                    type="text"
                    id="city"
                    autoComplete="address-level2"
                    value={city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="state"
                    label="State"
                    type="text"
                    id="state"
                    autoComplete="address-level1"
                    value={state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="zip"
                    label="Zip Code"
                    type="text"
                    id="zip"
                    autoComplete="postal-code"
                    value={zip}
                    onChange={handleChange}
                  />
                </Grid>

                <Typography
                  variant="h6"
                  align="center"
                  style={{ marginLeft: '200px' }}
                >
                  Register as
                </Typography>

                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="userType"
                    name="userType"
                    value={userType}
                    onChange={handleChange}
                    style={{ marginLeft: '80px', marginTop: '10px' }}
                  >
                    <FormControlLabel
                      value="customer"
                      control={<Radio />}
                      label="Customer"
                    />
                    <FormControlLabel
                      value="driver"
                      control={<Radio />}
                      label="Driver"
                    />
                    <FormControlLabel
                      value="restaurant"
                      control={<Radio />}
                      label="Restaurant"
                    />
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
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
