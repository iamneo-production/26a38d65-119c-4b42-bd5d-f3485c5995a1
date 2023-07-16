import React from 'react';
import {
  Card,
  Stack,
 Button,
  CardContent,
  TextField } from '@mui/material'
import "./Card.css";
import { CardHeader } from '@material-ui/core';
const axios = require('axios').default;

class EmptyDish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishName: "",
      imageUrl: "",
      price : 0
    }
    this.addToMenu = this.addToMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addToMenu(event) {
    event.preventDefault();
    axios.post("https://8080-bbafabdbdfaeddbefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/addToMenu", {
      restaurantId : this.props.currentUser.id,
      dishName : this.state.dishName,
      imageUrl : this.state.imageUrl,
      price : this.state.price
    }).then(
      response => {
        this.props.getAllDishes();
        this.setState({dishName : "", imageUrl : "", price : 0})
      }
    ).catch(err => console.log(err));
  }

  handleChange(content) {
    this.setState(content);
  }

  render() {
    return this.props.currentUser ? (
      <Card sx={{marginLeft:"500px",width:"400px",
      marginTop:"50px",
            justifyContent:"center",
            alignContent:"center",
            alignItems:"center"
            }}>
              <CardHeader title="Add Dish"/>
                <CardContent >
                    <form onSubmit={this.addToMenu}>
                    <Stack spacing={3} >
                        <TextField 
                        InputProps={{
                            style:{
                                borderRadius:"15px",
                                height:"45px",
                            }
                        }}
                        variant='outlined'
                        required
                        autoFocus
                        label="Dish Name"
                        type="text"
                        value={this.state.dishName}
              onChange={event => this.handleChange({dishName: event.target.value})}
                        />
                        <TextField 
                        variant='outlined'
                        required
                        label="Image url"
                        type="text"
                        InputProps={{
                            style:{
                                borderRadius:"10px",
                                height:"45px"
                            }
                        }}
                        value={this.state.imageUrl}
              onChange={event => this.handleChange({imageUrl: event.target.value})}
                        />
                        <TextField 
                        variant='outlined'
                        InputProps={{
                            style:{
                                borderRadius:"10px",
                                height:"45px"
                            }
                        }}
                        required
                        label="Price"
                        type="text"
                        value={this.state.price}
              onChange={event => this.handleChange({price: event.target.value})}/>       
                        <Button type="submit" variant="contained" size="small">Add</Button>
                    </Stack>             
                    </form>                   
                </CardContent>
            </Card>
    ) : <div />;
  }
}

export default EmptyDish;