
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

import './header.css';




const axios = require('axios').default;

const Header = (props) => {
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

//   const logout = () => {
//     setAnchorEl(null);
//     props.logoutUser();
//   }

//   const dropAccount = (event) => {
//     event.preventDefault();
//     let type = props.currentUser.type;
//     axios.delete("/api/" + type + "/" + props.currentUser.id).then(
//       response => {
//         closeWarn();
//         logout();
//         console.log("Successfully delete the user");
//       }
//     ).catch(err => {
//       setDropFailed(err.response.data);
//       console.log(err.response.data);
//     });
//   }

//   const resetPassword = (event) => {
//     event.preventDefault();
//     let type = props.currentUser.type;
//     axios.post("/api/" + type + "/resetPassword", {
//       id: props.currentUser.id,
//       password: oldPassword,
//       newPassword: newPassword
//     }).then(
//       response => {
//         closePasswordDialog();
//         console.log("Password update");
//       }
//     ).catch(err => {
//       setResetFailed(err.response.data);
//       console.log(err.response.data);
//     });
//   }

//   const resetPhone = (event) => {
//     event.preventDefault();
//     let type = props.currentUser.type;
//     axios.post("/api/" + type + "/resetPhone", {
//       id: props.currentUser.id,
//       phoneNumber: phoneNumber
//     }).then(
//       response => {
//         closePhoneDialog();
//         console.log("Phone update");
//       }
//     ).catch(err => {
//       console.log(err);
//     });
//   }

//   const resetAddress = (event) => {
//     event.preventDefault();
//     let type = props.currentUser.type;
//     axios.post("/api/" + type + "/resetAddress", {
//       id: props.currentUser.id,
//       address: address,
//       city: city,
//       state: state,
//       zip: zip
//     }).then(
//       response => {
//         closeAddressDialog();
//         console.log("Address update");
//       }
//     ).catch(err => {
//       console.log(err);
//     });
//   }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
         

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



          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            <Grid>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/Admindash"} className="link">
              Dashboard</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
              >
                <Link to={"/view"} className="link">
              View</Link>
              </Button>
                </Grid>
              
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon/>
              </IconButton>
            </Tooltip>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;