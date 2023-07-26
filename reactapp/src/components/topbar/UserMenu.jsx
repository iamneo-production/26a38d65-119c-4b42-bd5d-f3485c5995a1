import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Typography,  Dialog,TextField
} from '@material-ui/core';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Divider,Grid
}
from '@material-ui/core';




const axios = require('axios').default;

const UserMenu = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [warnOpen, setWarnOpen] = useState(false);
  const [resetFailed, setResetFailed] = useState("");
  const [dropFailed, setDropFailed] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleChange = (content) => {
    // Helper function to update state
    switch (Object.keys(content)[0]) {
      case 'oldPassword':
        setOldPassword(content.oldPassword);
        break;
      case 'newPassword':
        setNewPassword(content.newPassword);
        break;
      case 'phoneNumber':
        setPhoneNumber(content.phoneNumber);
        break;
      case 'address':
        setAddress(content.address);
        break;
      case 'city':
        setCity(content.city);
        break;
      case 'state':
        setState(content.state);
        break;
      case 'zip':
        setZip(content.zip);
        break;
      default:
        break;
    }
  }

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

  const openWarnDialog = () => {
    setWarnOpen(true);
    setAnchorEl(null);
  }

  const closeWarn = () => {
    setWarnOpen(false);
    setDropFailed("");
  }

  const openPasswordDialog = () => {
    setPasswordDialogOpen(true);
    setAnchorEl(null);
  }

  const closePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setOldPassword("");
    setNewPassword("");
    setResetFailed("");
  }

  const openPhoneDialog = () => {
    setPhoneDialogOpen(true);
    setAnchorEl(null);
  }

  const closePhoneDialog = () => {
    setPhoneDialogOpen(false);
    setPhoneNumber("");
  }

  const openAddressDialog = () => {
    setAddressDialogOpen(true);
    setAnchorEl(null);
  }

  const closeAddressDialog = () => {
    setAddressDialogOpen(false);
    setAddress("");
    setCity("");
    setState("");
    setZip("");
  }

  const logout = () => {
    setAnchorEl(null);
    props.logoutUser();
  }

  const dropAccount = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.delete("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/" + type + "/" + props.currentUser.id).then(
      response => {
        closeWarn();
        logout();
        console.log("Successfully delete the user");
      }
    ).catch(err => {
      setDropFailed(err.response.data);
      console.log(err.response.data);
    });
  }

  const resetPassword = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/" + type + "/resetPassword", {
      id: props.currentUser.id,
      password: oldPassword,
      newPassword: newPassword
    }).then(
      response => {
        closePasswordDialog();
        console.log("Password update");
      }
    ).catch(err => {
      setResetFailed(err.response.data);
      console.log(err.response.data);
    });
  }

  const resetPhone = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/" + type + "/resetPhone", {
      id: props.currentUser.id,
      phoneNumber: phoneNumber
    }).then(
      response => {
        closePhoneDialog();
        console.log("Phone update");
      }
    ).catch(err => {
      console.log(err);
    });
  }

  const resetAddress = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/" + type + "/resetAddress", {
      id: props.currentUser.id,
      address: address,
      city: city,
      state: state,
      zip: zip
    }).then(
      response => {
        closeAddressDialog();
        console.log("Address update");
      }
    ).catch(err => {
      console.log(err);
    });
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } , color:'black'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',

              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' ,color: 'black'},
              }}
            >
              
         
              
            </Menu>
            <Dialog open={warnOpen} onClose={closeWarn}>
        <div className="dialog">
          <Typography variant="h6" color="error">Warn!!!</Typography>
          <Typography variant="h6">Do you want to drop your account?</Typography>
          <Typography color="textSecondary"><i>(This will erase your order information as well)</i></Typography>
          <Typography variant="body1" color="error">
            {dropFailed}
          </Typography>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={dropAccount}
          >
            Yes
          </Button>
          <Button onClick={closeWarn}>No</Button>
        </div>
      </Dialog>
      <Dialog open={passwordDialogOpen} onClose={closePasswordDialog}>
        <div className="dialog">
          <form onSubmit={resetPassword}>
            <Typography component="h1" variant="h5">
              Reset Your Password
            </Typography>
            <Typography variant="body1" color="error">
              {resetFailed}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Old Password"
              type="password"
              value={oldPassword}
              autoFocus
              onChange={event => setOldPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Password
            </Button>
            <Button onClick={closePasswordDialog}>Cancel</Button>
          </form>
        </div>
      </Dialog>
      <Dialog open={phoneDialogOpen} onClose={closePhoneDialog}>
        <div className="dialog">
          <form onSubmit={resetPhone}>
            <Typography component="h1" variant="h5">
              Reset Your Phone Number
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Phone Number"
              type="text"
              value={phoneNumber}
              autoFocus
              onChange={event => setPhoneNumber(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Phone Number
            </Button>
            <Button onClick={closePhoneDialog}>Cancel</Button>
          </form>
        </div>
      </Dialog>
      <Dialog open={addressDialogOpen} onClose={closeAddressDialog}>
        <div className="dialog">
          <form onSubmit={resetAddress}>
            <Typography component="h1" variant="h5">
              Reset Your Address
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Address"
              type="text"
              value={address}
              autoFocus
              onChange={event => setAddress(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="City"
              type="text"
              value={city}
              onChange={event => setCity(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="State"
              type="text"
              value={state}
              onChange={event => setState(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Zip Code"
              type="text"
              value={zip}
              onChange={event => setZip(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Address
            </Button>
            <Button onClick={closeAddressDialog}>Cancel</Button>
          </form>
        </div>
      </Dialog>


          </Box>
          
          
          <img src="data:image/png;base64,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"/>
         
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {props.userType==='customer'?
            <Grid>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/customer/home"} className="link">
              Home</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/customer/cart"} className="link">
              Cart</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/customer/orders"} className="link">
              Orders
              </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/customer/history"} className="link">
              History</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/customer/support"} className="link">
              Support</Link>
              </Button>
              </Grid>
              :
              
             props.userType==='driver'?
              <Grid>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/driver/home"} className="link">
              Home</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/driver/pending"} className="link">
              Pending Orders</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/driver/order"} className="link">
              Active Orders</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/driver/history"} className="link">
              History</Link>
              </Button>
              </Grid>:
              props.userType==='restaurant'?
              
              <Grid>
              <Button
                onClick={handleCloseNavMenu}
              >
          <Link to={"/restaurant/home"} className="link">

              Home 
              </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
          <Link to={"/restaurant/order"} className="link">

              Active Orders
              </Link>

              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
          <Link to={"/restaurant/information"} className="link">
              Update
              </Link>

              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
          <Link to={"/restaurant/menu"} className="link">

              Menu
              </Link>

              </Button>

              <Button
                onClick={handleCloseNavMenu}
              >

          <Link to={"/restaurant/history"} className="link">
              History</Link>
              </Button>
              </Grid>:
              <Grid>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/admin/admindash"} className="link">
              Dashboard</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/admin/customers"} className="link">
              Customers</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/admin/drivers"} className="link">
              Drivers</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/admin/restaurants"} className="link">
              Restaurants</Link>
              </Button>
                </Grid>
              }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={openPasswordDialog}>Change Password</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={ openPhoneDialog}>Update Contact Information</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={openAddressDialog}>Update Address</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={logout}>Logout</Typography>
                  </MenuItem>
                
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserMenu;