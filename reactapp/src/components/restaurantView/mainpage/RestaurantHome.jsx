import React from 'react';
import './Restaurant.css';
import { Typography, CardContent,Card,Grid,CardHeader,Stack } from '@mui/material';

const axios = require('axios').default;

class RestaurantHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant : undefined
    }
    this.getRestaurant = this.getRestaurant.bind(this);
  }

  componentDidMount() {
    this.getRestaurant();
  }

  getRestaurant() {
    let restaurantId = this.props.currentUser.id;
    axios.get("http://localhost:8080/restaurant/" + restaurantId).then(
      response => {
        this.setState({restaurant : response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.state.restaurant ? (
      <>
      <Grid container >
          <Grid item xs={7} container alignItems="center" justifyContent="center">
          <Card  sx={{boxShadow:"none"}}>
                <CardHeader titleTypographyProps={{variant:'h3'}}
                title={"Get Started with online ordering"}
                subheader={"Please update your profile and get more customers"}/>
          <CardContent>
      <Typography variant='body1' color="primary">Click Update on NavBar to update profile  </Typography>
    </CardContent>
  </Card>
  <Stack direction="row">
          <Card className="status">
              <CardHeader title="Restuarant Status"/>
              <CardContent >
              {this.state.restaurant.information !== null ? <Typography color="green">verified</Typography> : <Typography color="error">Not Verified</Typography>}
              </CardContent>
            
          </Card>
          <Card className="status" sx={{marginLeft:"150px"}}>
              <CardHeader title="Menu Status"
              />
              <CardContent>
              {this.state.restaurant.menu && this.state.restaurant.menu.length !== 0 ? <Typography color="green">verified</Typography> : <Typography color="error">Not Verified</Typography>}
              </CardContent> 
          </Card>
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

export default RestaurantHome;