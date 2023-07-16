import React from 'react';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import { Grid,Stack,TextField,Typography,RadioGroup
,Radio,Button,FormControl,FormControlLabel,FormLabel } from '@mui/material';
const axios = require('axios').default;

class RestaurantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information : undefined,
      status : "close",
      name: "",
      description : "",
      imageUrl : "",
      tag1 : "",
      tag2 : "",
      tag3 : "",
      alert : ""
    }
    this.getInformation = this.getInformation.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getInformation();
  }

  getInformation() {
    let restaurantId = this.props.currentUser.id;
    axios.get("https://8080-bbafabdbdfaeddbefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/information/" + restaurantId).then(
      response => {
        this.setState({
          information : response.data,
          status : response.data.open ? "open" : "close",
          name : response.data.restaurantName ? response.data.restaurantName : "",
          description : response.data.description ? response.data.description : "",
          imageUrl : response.data.imageUrl ? response.data.imageUrl : "",
          tag1 : response.data.tag1 ? response.data.tag1 : "",
          tag2 : response.data.tag2 ? response.data.tag2 : "",
          tag3 : response.data.tag3 ? response.data.tag3 : "",
        });
      }
    ).catch(err => console.log(err));
  }

  updateInformation(event) {
    event.preventDefault();
    axios.post("https://8080-bbafabdbdfaeddbefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/information/", {
      restaurantId : this.props.currentUser.id,
      status : this.state.status === "open" ? true : false,
      name : this.state.name,
      description : this.state.description,
      imageUrl : this.state.imageUrl,
      tag1 : this.state.tag1,
      tag2 : this.state.tag2,
      tag3 : this.state.tag3,
    }).then(response => {
      this.setState({alert : "The restaurant information has been updated"})
    }).catch(err => console.log(err));
  }

  handleChange(content) {
    this.setState(content);
  }

  render() {
    return this.state.information ? (
      <>
        <Grid container >
            <Grid item xs={7} container justifyContent="center" alignItems="center" alignContent='center'>
            <Stack  justifyContent="center" alignItems="center">
                <FastFoodIcon className='icon'/>
                <Typography component="h1" variant="h5">
                    Update Restaurant Profile
          </Typography>
          <Typography variant="body1" color="error">
          {this.state.alert}
        </Typography>
        <form onSubmit={this.updateInformation}>
        <Stack  justifyContent="center" alignItems="center">
        <TextField
        sx={{width:"450px"}}
            variant="outlined"
            margin="normal"
            required
            label="Restaurant Name"
            type="text"
            autoFocus
            value={this.state.name}
            onChange={event => this.handleChange({name: event.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"450px"}}
            label="Description"
            type="text"
            value={this.state.description}
            onChange={event => this.handleChange({description: event.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"450px"}}
            label="Image Url"
            type="text"
            value={this.state.imageUrl}
            onChange={event => this.handleChange({imageUrl: event.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"450px"}}
            label="Address"
            type="text"
            value={this.state.address}
            onChange={event => this.handleChange({address: event.target.value})}
          />
          <Stack direction="row" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"140px",marginRight:"13px"}}
            label="Tag1"
            type="text"
            value={this.state.tag1}
            onChange={event => this.handleChange({tag1: event.target.value})}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"140px",marginRight:"13px"}}
            label="Tag2"
            type="text"
            value={this.state.tag2}
            onChange={event => this.handleChange({tag2: event.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"140px"}}
            label="Tag3"
            type="text"
            value={this.state.tag3}
            onChange={event => this.handleChange({tag3: event.target.value})}
          />
         </Stack>

          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{width:"450px"}}
            label="Contact No."
            type="number"
            value={this.state.contact}
            onChange={event => this.handleChange({contact: event.target.value})}
          />
          
          <FormControl component="fieldset">
            <FormLabel component="legend">Restaurant Status </FormLabel>
            <RadioGroup row aria-label="status" name="status"  value={this.state.status} onChange={event => this.handleChange({status: event.target.value})}>
              <FormControlLabel value="open" control={<Radio />} label="Open" />
              <FormControlLabel value="close" control={<Radio />} label="Close" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          </Stack>
        </form>
        </Stack>

            </Grid>
            <Grid item xs={5}>
            <img alt="restuarant" height="675" width="630" src="https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=600"/>
            </Grid>
        </Grid>
        </>
         ) : <div />;
  }
}

export default RestaurantInfo;