import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '900px',
    height: '100%',
    padding: theme.spacing(4),
    marginTop: theme.spacing(7),
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
  textField: {
    '& .MuiOutlinedInput-root': {
      fontSize: '1.2rem',
      padding: '12px',
    },
    '& .MuiFormLabel-root': {
      fontSize: '1.2rem',
    },
  },
}));

const Support = (props) => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [query, setquery] = useState('');

  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'userName') {
      setuserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'message') {
      setMessage(value);
    } else if (name === 'query') {
      setquery(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const names = [
    'I need help with my foodcourt online order.',
    'I found incorrect/outdated information on a page.',
    'There is a photo/review that is bothering me and I would like to report it.',
    'The website/app are not working the way they should.',
    'I would like to give feedback/suggestions.',
    'I need some help with my blog.',
    'Other',
  ];

  return (
    <Grid container justify="center" style={{ marginBottom: '40px', marginLeft: '-80px' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div className="box">
          <Paper className={classes.root}>
            <Typography component="h1" variant="h5" align="center">
              Support
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    type="text"
                    label="UserName"
                    name="userName"
                    autoComplete="userName"
                    value={userName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="mobile"
                    label="Mobile"
                    type="mobile"
                    id="mobile"
                    autoComplete="mobile"
                    value={mobile}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    label="Message"
                    id="message"
                    autoComplete="message"
                    value={message}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    select
                    name="query"
                    label="How can I help you?"
                    id="query"
                    value={query}
                    onChange={handleChange}
                    className={classes.textField}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

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

export default Support;