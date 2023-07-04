import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Typography,  Dialog,TextField
} from '@material-ui/core';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import SettingsIcon from '@mui/icons-material/Settings';
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
    axios.delete("/api/" + type + "/" + props.currentUser.id).then(
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
    axios.post("/api/" + type + "/resetPassword", {
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
    axios.post("/api/" + type + "/resetPhone", {
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
    axios.post("/api/" + type + "/resetAddress", {
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
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } , color:'black'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              {/* <MenuIcon /> */}
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
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FoodCourt
          </Typography>
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

              Information
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

          <Link to={"/restaurant/history"} >
              History</Link>
              </Button>
              </Grid>
              }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <SettingsIcon/> */} settings
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
                {/* <MenuItem>
                  <Typography textAlign="center" onClick={openWarnDialog}>Drop My Account</Typography>
                </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserMenu;