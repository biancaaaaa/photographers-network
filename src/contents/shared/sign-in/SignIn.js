import React, { Component } from "react";
import { connect } from "react-redux";
import { signUserInAsync } from "../../../redux/actions/user-action";
import { EmailSVG } from "../../../components/svg/EmailSVG";
import { PasswordSVG } from "../../../components/svg/PasswordSVG";
import { Error } from "../../../components/Error";
import { InputField } from "../../../components/form/InputField";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    type: "photographer",
    errorMessage: "",
    error: false
  };

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    this.props.signInUser(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <div className="section-content with-padding">
          <form onSubmit={this.login}>
            <h1>Sign in</h1>
            <InputField
              wrapperClass="gb-input-wrapper"
              svg={
                <EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
              }
              value={this.state.email}
              changeHandler={this.handleChange}
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputField
              wrapperClass="gb-input-wrapper"
              svg={
                <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
              }
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

const mapDispatchToProps = dispatch => ({
  signInUser: (email, password) => dispatch(signUserInAsync(email, password))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);