import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";
import AuthForm from "./AuthForm";

class SignupForm extends React.Component {
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
        const response = await axios.post("auth/register", {
          email,
          password
        });
        console.log(response);
        this.setState({
          messageFromServer: response.data.message,
          showError: false,
          loginError: false,
          registerError: false
        });
        this.props.fetchUser();
      } catch (error) {
        console.error(error);
        console.error(error.response.data);
        if (error.response.data === "username or email already taken") {
          this.setState({
            showError: true,
            loginError: true,
            registerError: false
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
          headerText="Create a new account"
          submitText="Sign Up"
          text="Sign Up "
          messageQ="Already have an account? "
          messageTo="/login"
          messageLinkText="Log In"
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

export default connect(mapStateToProps, actions)(SignupForm);
