import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import DriverOrder from "./mainpage/DriverOrder";
import DriverHome from "./mainpage/DriverHome";
import DriverHistory from "./mainpage/DriverHistory";
import PendingOrders from "./mainpage/PendingOrders";

class DriverView extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeView("Driver")
  }
  render() {
    return this.props.currentUser ? (
      <Router>
              <Switch>
                <Route path="/driver/home" render={props => <DriverHome {...props} currentUser={this.props.currentUser} />} />
                <Route path="/driver/pending" render={props => <PendingOrders {...props} currentUser={this.props.currentUser} />} />
                <Route path="/driver/order" render={props => <DriverOrder {...props} currentUser={this.props.currentUser} />} />
                <Route path="/driver/history" render={props => <DriverHistory {...props} currentUser={this.props.currentUser} />} />
                <Redirect path="/driver" to="/driver/home" />
              </Switch>
      </Router>
    ) : <div />;
  }
}

export default DriverView;