import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import API from "../../utils/API";
import "./Auth.scss";

class Auth extends Component {

  state = {
    loggedIn: false,
    username: "",
    password: "",
    confirmPassword: "",
    user: null,
    message: "",
    email:null,
   currentPlan:""
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.login({
        username: this.state.username,
        password: this.state.password
      }).then(user => {
        console.log(user);
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/home';
        }
        else if (user.data.message) {
          this.setState({
            message: user.data.message
          })
        }
      });
    }
  }

  handleSignup = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.signup({
        username: this.state.username,
        password: this.state.password,
        email:this.state.email,
        currentPlan:this.state.currentPlan
      }).then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/profile';
        } else {
          console.log("something went wrong :(")
          console.log(user.data);
          this.setState({
            message: user.data
          })
        }
      });
    }
  }

  render() {
    return (<div className="row"><div className="card col-6 offset-3 noLogged">
      <div className="authBox">
        {(this.props.action === "login") ? (
          <Login
            username={this.state.username}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        ) : (
            <Signup
              username={this.state.username}
              password={this.state.password}
              confirmPassword={this.state.confirmPassword}
              handleSignup={this.handleSignup}
              handleInputChange={this.handleInputChange}
              message={this.state.message}
              email={this.state.email}
            />
          )}
      </div>
      </div></div>
    )
  }
}



export default Auth;