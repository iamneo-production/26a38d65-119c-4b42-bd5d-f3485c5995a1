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
    margin: '1rem 0 2rem',
    backgroundColor: '#1a73e8',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0f64d8',
    },
  },
  errorText: {
    color: 'red',
  },
  userTypeLabel: {
    marginLeft: '200px',
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
      .get(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/customer/username/${userName}`)
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
    <Grid container justifyContent="center" style={{ marginBottom: '40px' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div className="box">
          <Paper style={styles.root}>
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
            <form style={styles.form} onSubmit={handleFormSubmit}>
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
                    error={isUsernameTaken}
                    helperText={isUsernameTaken ? 'Username already exists' : ''}
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
                    type="number"
                    id="zip"
                    autoComplete="postal-code"
                    value={zip}
                    onChange={handleChange}
                  />
                </Grid>
                <Typography variant="h6" align="center" style={styles.userTypeLabel}>
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
                  style={styles.submit}
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
