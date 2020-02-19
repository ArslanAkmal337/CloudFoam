import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";
import AuthForm from "./AuthForm";

class LoginForm extends React.Component {
  state = { messageFromServer: "" };
  onSubmit = async (email, password) => {
    console.log("submited", email, password);

    if (password === "" || email === "") {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true
      });
    } else {
      try {
        const response = await axios.post("auth/login", {
          email,
          password
        });
        console.log(response);
        localStorage.setItem("JWT", response.data.token);
        this.setState({
          messageFromServer: response.data.message,
          loggedIn: true,
          showError: false,
          showNullError: false
        });
        this.props.fetchUser();
      } catch (error) {
        console.error(error);
        console.error(error.response.data);
        if (
          error.response.data === "bad username" ||
          error.response.data === "passwords do not match"
        ) {
          this.setState({
            showError: true,
            showNullError: false
          });
        }
      }
    }
  };

  render() {
    const { messageFromServer } = this.state;

    if (this.props.auth) {
      return <Redirect to="/dashboard" />;
    }

    if (messageFromServer === "") {
      return (
        <AuthForm
          headerText="Log-in to your account"
          submitText="Log In"
          text="Log In "
          messageQ="New to us? "
          messageTo="/signup"
          messageLinkText="Sign Up"
          onSubmit={this.onSubmit}
        />
      );
    }

    return null;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(LoginForm);
