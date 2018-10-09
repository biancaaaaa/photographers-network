import React, { Component } from "react";
import fire from "../config/Fire";
import { EmailSVG } from "../components/svg/EmailSVG";
import { PasswordSVG } from "../components/svg/PasswordSVG";
import { Error } from "../components/Error";
import { InputField } from "../components/InputField";
import GbNavBar from '../components/gbNav';

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    type: "photographer",
    errorMessage: "",
    error: false,
    links : [{txt: 'Home' , link:'home' , nav:true}]

  };
  componentDidMount(){
   this.props.setLoadingTrue();
  }
 
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

 
  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((signInData) => {
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        this.setState({ error: true, errorMessage: error.message });
      });
  };


  render() {
    return (
      <div>
          <GbNavBar
            righLinks={
              this.state.links
            }
            loggedIn={false}
          />
        <div className="section-content">
          <form onSubmit={this.login} className="gb-margin-top-40">
            <h1>Sign in</h1>
            <InputField
              wrapperClass="gb-input-wrapper "
              svg={<EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
              value={this.state.email}
              changeHandler={this.handleChange}
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputField
              wrapperClass="gb-input-wrapper"
              svg={<PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
              value={this.state.password}
              changeHandler={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className="btn-container">
              <input
                type="submit"
                className="gb-btn gb-btn-large gb-btn-primary"
                value="Sign in"
              />
            </div>
            {this.state.error && <Error message={this.state.errorMessage} />}
          </form>
        </div>
      </div>
    );
  }
}