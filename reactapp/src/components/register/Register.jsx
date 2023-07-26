import React, { useState } from 'react';
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
  Snackbar,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    padding: '1rem',
    marginTop: '10rem',
  },
  form: {
    width: '100%',
    marginTop: '1rem',
  },
  submit: {
    // margin: '1rem 0 2rem',
    marginLeft:'220px',
    width:"450px",
    backgroundColor: '#fc8019',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0f64d8',
    },
  },
  errorText: {
    color: 'red',
    marginLeft:"225px"
  },
  register: {
    marginLeft: '250px',
  },
};

const Register = ({ changeUser }) => {
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
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const checkUsernameAvailability = () => {
    axios
      .get(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/${userType}/username/${userName}`)
      .then((response) => {
        setIsUsernameTaken(response.data);
      })
      .catch((err) => {
        setIsUsernameTaken(true);
      });
  };

  const registerUser = (event) => {
    event.preventDefault();
    if (passwordDifferent) {
      setRegisterFailed("Passwords don't match");
      return;
    }
    setRegisterFailed('');
    axios
      .post(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/${userType}/register`, {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    checkUsernameAvailability();
    registerUser(event);
  };

  return (
    <Grid container justifyContent="center">
      {/* <Grid item xs={12} sm={8} md={6} lg={4}> */}
      <Grid item xs={7} justifyContent="center" alignItems="center">
        <div className="box">
          <img src="data:image/png;base64,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"/>
          <br/>
          <Typography component="h1" variant="h5" style={{fontWeight:"800"}}>
            Create An Account
          </Typography>
            <Typography component="h1" variant="h6" align="center">
              Sign Up
            </Typography>
            <form style={styles.form} onSubmit={handleFormSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    style={{width:"450px"}}
                    id="userName"
                    type="text"
                    label="Username"
                    name="userName"
                    autoComplete="username"
                    value={userName}
                    onChange={handleChange}
                    error={isUsernameTaken}
                    helperText={isUsernameTaken ? 'Username already exists' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    style={{width:"450px"}}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
                      title: "Password must contain at least one uppercase letter, one lowercase letter, and one digit. Minimum length is 6 characters.",
                    }}
                  />
                </Grid>
                <Typography variant="body2" style={styles.errorText}>
                  {passwordDifferent && <i>Passwords don't match</i>}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    style={{width:"450px"}}
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
                    style={{width:"450px"}}
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    autoComplete="address"
                    value={address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    style={{width:"215px",marginLeft:"215px"}}
                    name="phoneNumber"
                    label="Phone number"
                    type="number"
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
                    style={{width:"215px",marginRight:"250px"}}
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
                    style={{width:"215px",marginLeft:"215px"}}
                    name="state"
                    label="State"
                    type="text"
                    id="state"
                    autoComplete="address-level1"
                    value={state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    style={{width:"215px",marginRight:"250px"}}
                    name="zip"
                    label="Zip Code"
                    type="number"
                    id="zip"
                    autoComplete="postal-code"
                    value={zip}
                    onChange={handleChange}
                  />
                </Grid>

                <Typography variant="h6" style={{marginLeft: '380px'}}>
                  Register as
                </Typography>
                <br/>
                <FormControl >
                <br/>
                  <RadioGroup
                    row
                    aria-labelledby="userType"
                    name="userType"
                    value={userType}
                    onChange={handleChange}
                    style={{ marginTop: '5px',marginLeft:"-200px" }}
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
                  variant="contained"
                  style={styles.submit}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          <br/>
          <br/>
            <Link to="/login" style={{ textDecoration: 'none',color:"black" }}>
            Have an Account ? Sign in
            </Link>
        </div>
      </Grid>
      <Grid item xs={5} container style={{marginBottom:"100px"}}>
            <img style={{marginBottom:"100px"}} alt="restuarant" height="675" width="630" src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"/>
      </Grid>
    </Grid>
  );
};

export default Register;