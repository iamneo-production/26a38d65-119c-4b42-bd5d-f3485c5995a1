import React, { useState, useEffect } from 'react';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import './../../styles/commonclasses.css';
import './../../styles/variable.css';

const axios = require('axios').default;

const RestaurantCard = (props) => {
  const [comments, setComments] = useState(undefined);
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);

  const findComments = () => {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/getComments/" + props.restaurantId)
      .then(response => {
        setComments(response.data);
        setMaxSteps(response.data.length);
      })
      .catch(err => console.log(err));
  };

<<<<<<< HEAD
  useEffect(() => {
    findComments();
  }, []);
=======
  findComments() {
    axios.get("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/getComments/" + this.props.restaurantId).then(
      response => {
        this.setState({comments : response.data, maxSteps: response.data.length});
      }
    ).catch(err => console.log(err));
  }
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return props.userId && props.restaurantId && props.restaurantInfo && comments ? (
    <div className='max-width explore-section'>
      <div className='explore-grid'>
        <div className='explore-card cur-po'>
          <div className='explore-card-cover'>
            <Link to={"/customer/restaurant/" + props.restaurantId} className="link">
              <img className="explore-card-image" src={props.restaurantInfo.imageUrl} alt={props.restaurantInfo.restaurantName} />
            </Link>
          </div>
          <Typography style={{ marginTop: '10px' }}>{props.restaurantInfo.restaurantName}</Typography>

          <div className='res-row '>
            <div className='card-separator'></div>
            <div className='explore-bottom'>
              {/* <div className='res-bottom-text'>{props.restaurantInfo.description}</div> */}
            </div>
          </div>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <Typography><b>See Comments</b></Typography>
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {comments.length > 0 ? (
                <Grid container justifyContent="center">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={comments[activeStep].rating} readOnly />
                    <Typography color="textSecondary" variant="body2">
                      <i>{comments[activeStep].content}</i>
                    </Typography>
                  </Box>
                  <Grid item xs={12}></Grid>
                </Grid>
              ) : (
                <Typography variant="body1" color="primary">
                  <i>This restaurant doesn't have any comments</i>
                </Typography>
              )}
            </CardContent>
          </Collapse>
        </div>
<<<<<<< HEAD
=======
        <IconButton
        onClick={this.handleExpandClick}
        aria-expanded={this.state.expanded}
      >
      <Typography><b>See Comments</b></Typography>
        <ExpandMoreIcon />
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
    
      
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
      </div>
    </div>
  ) : <div />;
};

export default RestaurantCard;
