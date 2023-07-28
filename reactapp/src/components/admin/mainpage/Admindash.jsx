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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import '../../../styles/commonclasses.css'
import '../../../styles/variable.css';



const axios = require('axios').default;

class Admindash extends React.Component {


  render() {
    return(

      <div className='max-width explore-section'>
         <div className='explore-grid'>

           <div className='explore-card cur-po'>
             <div className='explore-card-cover'>
              <h1>Customers</h1>
           </div>
           </div>
           <div className='explore-card cur-po'>
             <div className='explore-card-cover'>
              <h1>Drivers</h1>
           </div>
           </div>
           <div className='explore-card cur-po'>
             <div className='explore-card-cover'>
              <h1>Restaurants </h1>
           </div>
           </div>
           </div>

        
     </div>)

  }
}

export default Admindash;

