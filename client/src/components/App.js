import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import About from "./About";
import Careers from "./Careers";
import Dashboard from "./Dashboard";
import Prices from "./Prices";
import Homepage from "./Homepage";
import LoginForm from "./logging/LoginForm";
import SignupForm from "./logging/SignupForm";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/signup" exact component={SignupForm} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/prices" exact component={Prices} />
          <Route path="/about" exact component={About} />
          <Route path="/careers" exact component={Careers} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(App);
