import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  TextField,
  Button,
  Grid,
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
    backgroundColor: '#fc8019',
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
        console.log(response.data);
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
      <Grid item xs={6} style={{marginRight:"60px"}} alignItems="center" justifyContent="center">
      <img style={{borderRadius:"50px",marginRight:"60px"}} alt="restuarant" width="630" height="600" src="https://fooddesk.dexignlab.com/react/demo/static/media/pic-5.7dba4fa4b2b813e643ad.jpg"/>
      </Grid>
      <Grid item xs={6} sm={8} md={6} lg={4} style={{marginTop:"80px"}}>
        <div className="box">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAAtCAYAAADiOoTVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAoqSURBVHgB7ZzNbtvKFcf/Q0mOncWNgOIC9s0i8hPERtdF6Cdw/AS2N93eeF/AI6D72Nu7ifIEdp7ASjddFXG76aqIAvTWLorb6l6gsWNRnJ7DD5scDkVSom25mR8gyOLHcDg8Z87X0IDFYrFYLBaLxWKxWCwWi8VisVgspRGYkiv57ZqDxpoCOqgIXXRA5w1a8rwPi+UBUUlhlFzu+MLZVkq9op9tzM6AutAfwe8uyfMBLJY5p7TCjLsr3ysFiXoUJdsRIWRj/x9dWCxzTKHCKNluj7H0hv58idvnuIGLXSGHQ1gsc0iz6IA7VBbmJV2PLNhwA5aZuJLLOw7EdnKbD29vQf7rFP+nKNmhyf3LUXIbWYTThjzbQ01MVJhx97t9ilfuSlli3JFclpQQkKiBK/mUkhPq+0onQb1ryrNjPGBEmIxx09sa1+50mXERUMOxwich1OnDSNBc0v0JN7nFnyGxZSJXYTjAHyslcQ8IiP0LudyrIxEgMOZB3KlyjoL6RF8PWmGKKDMulMmEI8KjPbky8KG6C/K8h68YJ2+HD2cf90gT4hUs80SHXLw3pDgfaTLr4CvFqDDsC9Isu4N7hCa2bU44wDJvdFoQJ1+r0hhdshFGHYd8V9wzI9Hq0FftQSq5Goce1EHe/kVcGrN0rMAjtbRDbsoLUui1qK0BB5bkrrwr6+dz/NAQapPiw7WonSG1M+R2rqAOy7ii3BdfPKZUv3I5XlFhTWswY03rmOM3X4k2xS1tbpfc4xeG4jQrDSeDcpMzFIe6jnBeTHuPeWPN96jgv50lpgpLJGJN397A572iDG2tAdE8wg+OHvpJchtZz27VpEKUACkq2JLAqo08YQiEHI9fF1tv0Zsk+EU1Ma5p+coXHAumrk99iwWtyrhwEkZvS2/velvJeyTBO3Bw0TUJqNd9ug3lH2DyWPepBLGVPD+IuyE+pvuI9y155sa/o7E7MNxLKZlwYCmE/PYjFSZAilxEnnk/8LIhfUewSgJLH8q5umonz+0JFRcThYn7KrSU8iywILFV1rdnFDJQlnL3SO29omNPdLebFZmUpYfisXapBHGECvAzmEVZGKswBbCAolodqu2geaQLAidRKq67i92ea8IHXjpz2UGNNPFI0pduDdzkfYaWpfx16dg1UpqU0pktGf7MlsJ0fa43ocy1AmVOW9So7fdVvI1mtmG3CfWXZcwDo+YIFwu/iNd/v0CNULZn05PfPcvuSddf8lLrPMhUo+hF8csOsrN5x8Miu2/BuR49VNOsG7dD55MgcL0r004gEHEqN8xcKuS3E56DGq1LjJCDId3HO73tMRZc+joO3aHMPVK8oXabuDxl18kLhFu8RsJ6sKUhYU66Zm66CdUjgd4N/gqstDhJKmVUnO2hAFZMgzIPvIrJrZTCqN+iBfz1NxCtx5gHFvgz+kxK/Ach+x5qQgVBpMq6TVr9xaPUtiHIOyafeCvxu0+C0IdmDWim5KKgDH85m7qgG9yA45Fc4aA4VUxMC4Ryke2z3k6P3JqBaaaelWiCSEFKHAh/zljtJWOcJin+1f5KmwL518mDOLgn45GThLlxggTFdOQe76nEs6PgfWKQzkRxi16mGE6KN/NIW5hfPf2Gbn0+lOWGx1j40xP6/gl3DAnAc32bTyGpvo0FgR4kC7ab2NzmWCZcipIVdM8wK7LbM8YXbifpzkVuz2J7bJghTe4EbxvLlU0VZZfuAtNY0X23Pc1l8pXhXBGMW6wwfaTGUe3Q2Lq8qt2H/56EvE9CXrqoTP16FiVIdHanySamY5iffvyFJKJW92dmuD9Xv/4Z94Aw+ON5a7HYz9a3kXXoRH+2tXZPTQ+L3R6Y0ujNpSeeoS+ma97sU7n7pkdkAnERpHrNYxVa3fRHty4RCRdNmVasd1hxuHBKcd1HUqCTsrFLeG56/Pka0y59SlkY8QNZR+n8kea/b7A0LlyYeSf8bfWf4of63DFmmrRyiVaHpix96NvfDhS3/Cdvn6K4qO6aAc2umypznXGhS1QFduGoTrXegH80IYHgkvK4bNVJ8Ksu1B16JWKePDJKIeTZZ/r6jLnh35gn1O9XnonfnWWKugLO82yc4gwjv1vbnp9JioqQabyLn5tYHIwzx4q1Ce08R42EiYusSzhh9TMnMkqtEhZIxyEL8kduc5ULvJRidslle0n388JwapmFutx20sK0OWVPbu76NK+RzIcVmVPIElEqU3SS2zxPccZGpo4LM0SZ1DNnh6I/+9DiG6436EU/UqyXJqHkB6skb/6Sevgco5jaiayai5oIaiNhdisFxSOHN33JjFW7gctjXShNtaVFXATHcKx2SbFavH1M1mupe86xTRDfsNJyMiM5RlG9SSKHyG091ZIpnbCGU/01EluHmYAymG5+YJTpuc64sDDl5fdjYQmFKdPOm6QfHlbeTf696gfH58Q3pnZM/SkDuTlPWKDjDyswF22jFQF6/DIYC3WTgjeMFb9LlazTsMXgwi7HIcnPCMESqCBbltlHFiQ+n5MrPtRb7TIdFEBZTX5efW2zS4kRUzwVTFy0j2MlRd+pQrTRzQ3WOpEPidtAiJ7pVeSo86lZegxva9YXnmZdGsMDNiHbpJv7m+tCrcaBffRi08ecY+MZ2LQvtdTGdC9VKFoaU5EtPXBmITNZSISKzvfnItMnvCOBDp57NE6GuEz0wjVu6FDSYB/psRpQP1bD8/OXxkT7PkBPwGivxpvaIIYNXKzyBGi0MC20qOCEtgr96Xo/VAj0usvbyesFyz24gKUd28JogHvGgeKaS56va1QWVshkFiyyDrsT2mjn7NtLthMJ+1TZnRoZ+lyMNGSZxnBMY9VBOBG6hra4cHhtrXmcTEtwEBYXj6IMW3oFhTIdn0UE45iNqXR5zHFl21SIDiZNx9x40PG3uC2UOGA3gs0+Wxbzcg/Vm4d3+3mgG1Drcfq0CHqAeybrFQnYVsl2coWygUe7ongF9wA3lf/a4NmaCpUbeS+RcbDO+0veo3GhKrtPZqUx9ujtQvfsACVhl87YdiCP3yZWRGfxou25MUxzwvL3GmjHOXW2LKYDRkAXcwIrjYNH6zScuznCEMyM7IZNeoCsAGSxNvhB57ejumz+84SSJ7OGPMvrS3z+OvXnE2ZnGK3jOgzduTM3ymDlwvsn3qPCp7iPeYXDUGnUBrtrpv2h4vKEcr6DinBx2NCvYP0fT+BsxfVaUNJjmJiqz1vWfdvcTp2kPjiQjU00zzzTvn8St6PQGAYZoSna4XiTXzeepR+3SR33yILcDNz0xrCF/w7uwvPgWIaLxfE6uHh7YW2Lq6qoMUVZguNmeq2WxTI3FKaVyWdm4b2rQDP4v2SwWOaU0qsnbtk9G1Kw3K0SwFks90Gl5UZRBVnmvOc9DRykHvLaHvu/lS0PganX50WV6c40isNZCh+N06KMi8VisVgsFovFYrFYLBaLxWKxWCwWywPmf7gzT6xUGw6TAAAAAElFTkSuQmCC" alt="food-desk"/>
          <br/>
          <Typography component="h1" variant="body1" style={{fontWeight:"800"}}>
            Welcome Back!!
          </Typography>
            <br/>
            <Typography component="h5" variant="body1" align="center">
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

                <Typography variant="h6" align="center" style={{ marginLeft: '200px' }}>
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
                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
               
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
          {/* </Paper> */}
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;