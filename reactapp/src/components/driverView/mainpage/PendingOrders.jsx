import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import './DriverHomes.css';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     minHeight: '100vh',
//     paddingRight: '20px',
//     margin: '40px',
//   },
// };

class PendingOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: undefined
    }
    this.getActiveOrder = this.getActiveOrder.bind(this);
  }

  componentDidMount() {
    this.getActiveOrder();
  }

  getActiveOrder() {
    axios.get("https://8080-bbafabdbdfaeddbefbefebaadcfefeaeaadbdbabf.project.examly.io/driver/myActiveOrder/" + this.props.currentUser.id).then(
      response => {
        this.setState({order: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.order ? (
      <div className= 'styling'>
        <Grid container justify="space-evenly" spacing={3}>
          <Grid item xs={5}>
            <OrderCard order={this.state.order} userType={this.props.currentUser.type} getOrders={this.getActiveOrder} />
          </Grid>
        </Grid>
      </div>
    ) :
    <div className= 'styling'> <Typography variant="h5"  style = {{marginBottom: '100px' }} className="styling"><i>You don't have any pending order...</i></Typography></div>
  }
}

export default PendingOrders;