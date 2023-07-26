import React from "react";
import { AppBar,Toolbar,Box,Typography,IconButton,Button,Dialog,DialogTitle,
  DialogContent,DialogActions,Card,FormControl,Radio,FormControlLabel,RadioGroup,FormLabel} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import { Link,Redirect } from "react-router-dom";

class Header extends React.Component{

  state = {
    type: "",
    open: false,
    submitted: false,
    redirectToAdmin:false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };

  handleLoginSubmit = () => {
    if (this.state.type === "user") {
      this.setState({ submitted: true });
    } else if (this.state.type === "admin") {
      this.setState({ redirectToAdmin: true });
    }
  };

    render(){
      return(
            <>
            <Box sx={{ flexGrow: 1 }} className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
             <AdbIcon  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,letterSpacing:"2px" }}>
            FOOD COURT
          </Typography>
          {/* <Link to={"/landing"} className="link"> */}
          <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
          {/* </Link> */}

          <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <Card sx={{ boxShadow:"none", }}>
              
            <FormControl component="fieldset">
          <FormLabel component="legend">Login as a</FormLabel>
      <RadioGroup
        row
        aria-label="type"
        name="type"
        value={this.state.type}
        onChange={this.handleChange}
       >
    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
    <FormControlLabel value="user" control={<Radio />} label="User" />
  </RadioGroup>
</FormControl>

            </Card>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleLoginSubmit} color="primary">
                    Submit
                  </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
            </>
        )
    }
}

export default Header;