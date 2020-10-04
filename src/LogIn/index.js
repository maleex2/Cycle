import React, { Component } from "react";
import { withRouter } from "react-router";
import LogInView from "./LogInView";
import app from "../base";

class LoginPage extends Component {
  LoginHandler = async event => {
    // Don't reload, get target form
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");

    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <LogInView onSubmit={this.LoginHandler} />;
  }
}

export default withRouter(LoginPage);
