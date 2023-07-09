import React from 'react';
import { Link } from "react-router-dom";
import {
    Typography,
    CardContent,
    Collapse,
    IconButton,

    Grid,
    Box,
    MobileStepper,
    Button
        } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './../../styles/commonclasses.css';
import './../../styles/variable.css';


const axios = require('axios').default;

class RestaurantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments : undefined,
      expanded: false,
      activeStep: 0,
      maxSteps: 0
    }
    this.findComments = this.findComments.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    this.findComments();
  }

  findComments() {
    axios.get("/api/restaurant/getComments/" + this.props.restaurantId).then(
      response => {
        this.setState({comments : response.data, maxSteps: response.data.length});
      }
    ).catch(err => console.log(err));
  }

  handleExpandClick() {
    this.setState({expanded : !this.state.expanded});
  }

  handleNext() {
    this.setState({activeStep: this.state.activeStep + 1});
  }

  handleBack() {
    this.setState({activeStep: this.state.activeStep - 1});
  }

  render() {
    return this.props.userId && this.props.restaurantId && this.props.restaurantInfo && this.state.comments ? (
      <div className='max-width explore-section'>
         <div className='explore-grid'>

           <div className='explore-card cur-po'>
             <div className='explore-card-cover'>
                <Link to={"/customer/restaurant/" + this.props.restaurantId} className="link">
                  <img className="explore-card-image" src= {this.props.restaurantInfo.imageUrl} alt={this.props.restaurantInfo.restaurantName} />
               </Link>
             </div>
             <Typography style={{marginTop:'10px'}}>{this.props.restaurantInfo.restaurantName}</Typography>

          <div className='res-row '> 
         
        <div className='card-separator'></div>
        <div className='explore-bottom'>
          {/* <div className='res-bottom-text'>{this.props.restaurantInfo.description}</div> */}
        </div>
        </div>
        <IconButton
        onClick={this.handleExpandClick}
        aria-expanded={this.state.expanded}
      >
      <Typography><b>See Comments</b></Typography>
        {/* <ExpandMoreIcon /> */}
        
      </IconButton>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {this.state.comments.length > 0 ? 
            <Grid container justify="center">
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={this.state.comments[this.state.activeStep].rating} readOnly />
                <Typography color="textSecondary" variant="body2"><i>{this.state.comments[this.state.activeStep].content}</i></Typography>
              </Box>
              <Grid item xs={12}>
              
              </Grid>
            </Grid> 
            : <Typography variant="body1" color="primary"><i>This restaurant doesn't have any comments</i></Typography>}
        </CardContent>
      </Collapse>
           </div>
           
      </div>
    
      
      </div>
    ) : <div />;
  }
}

export default RestaurantCard;