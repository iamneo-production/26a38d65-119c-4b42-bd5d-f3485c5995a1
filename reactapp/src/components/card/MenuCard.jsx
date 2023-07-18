import React from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import "./Card.css";
const axios = require('axios').default;

class MenuCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number : 0,
      openDialog: false,
      newPrice: ''
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.removeDish = this.removeDish.bind(this);
    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.closeUpdateDialog = this.closeUpdateDialog.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleAdd() {
    this.setState({number: this.state.number + 1});
    this.props.addDish("add", this.props.dish);
  }

  updatePrice(){
      
    alert("Updated");
    this.closeUpdateDialog();


    // const updatedPrice = parseFloat(this.state.newPrice);
    // if (!isNaN(updatedPrice)) {
    //   axios.post("/api/restaurant/updateDishPrice", {
    //     restaurantId: this.props.currentUser.id,
    //     dish: this.props.dish,
    //     newPrice: updatedPrice
    //   }).then(
    //     response => {
    //       this.props.getAllDishes();
    //     }
    //   ).catch(err => console.log(err));
    //   this.closeUpdateDialog();
    // }

  }

  handleMinus() {
    this.setState({number: this.state.number - 1});
    this.props.addDish("minus", this.props.dish);
  }
  openUpdateDialog() {
    this.setState({ openDialog: true });
  }

 
  handlePriceChange(event) {
    this.setState({ newPrice: event.target.value });
  }

  closeUpdateDialog() {
    this.setState({ openDialog: false });
  }


  removeDish() {
    axios.post("https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/restaurant/removeDish", {
      restaurantId : this.props.currentUser.id,
      dish : this.props.dish
    }).then(
      response => {
        this.props.getAllDishes();
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.dish && this.props.currentUser 
    ? (
      <Grid style={{marginTop:"50px"}}>
            <Card className="menuCard" style={{backgroundColor:"#fafafa"}}>

            <CardHeader style={{height:"30px"}}
          titleTypographyProps={{variant:'body1'}}
          title={this.props.dish.dishName}
          subheader={this.props.dish.price}/>
            <CardContent sx={{borderRadius:"10px"}}>
            <img  className="dishCardImage" alt="dishImage" src= {this.props.dish.imageUrl}/>
            </CardContent>
          <CardActions >
          {this.props.currentUser.type !== "restaurant" ?
          <Grid container justify="center" alignItems="center">
            <IconButton disabled={this.state.number === 0} onClick={this.handleMinus}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5">{this.state.number}</Typography>
            <IconButton onClick={this.handleAdd}>
              <AddIcon />
            </IconButton>
          </Grid> : 
          <Grid container justifyContent="center"  alignItems="center">
            <IconButton color="inherit" onClick={this.removeDish}>
              <DeleteIcon  />
            </IconButton>
            <IconButton color="inherit" onClick={this.openUpdateDialog}>
                    <EditIcon />
                  </IconButton>
          </Grid>
          }
          </CardActions>

            </Card>

            <Dialog  open={this.state.openDialog} onClose={this.closeUpdateDialog}>
            <DialogTitle>Update Dish Price</DialogTitle>
            <DialogContent>
              <TextField
                label="New Price"
                variant="outlined"
                value={this.state.newPrice}
                onChange={this.handlePriceChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeUpdateDialog}>Cancel</Button>
              <Button onClick={this.updatePrice} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>


            </Grid>
    ) : <div />;
  }
}

export default MenuCard;