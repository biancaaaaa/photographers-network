import React, { Component } from "react";
import { connect } from "react-redux";
import { signUserInAsync } from "../../../redux/actions/user-action";
import { actionReset } from "../../../redux/actions/generalLoadingErrorSucces-actions";

import { EmailSVG } from "../../../components/svg/EmailSVG";
import { PasswordSVG } from "../../../components/svg/PasswordSVG";
import { Error } from "../../../components/Error";
import { InputField } from "../../../components/form/InputField";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signIn = e => {
    e.preventDefault();
    this.props.signInUser(this.state.email, this.state.password);
  };

  //Reset the general loading/error
  componentWillUnmount() {
    this.props.actionReset();
  }

  render() {
    const { loadingAuth, errorAuth, succesAuth } = this.props;

    return (
      <React.Fragment>
        <div className="section-content with-padding signin-page-wrapper">
          <div className="fade-black-overlay" />
          <form onSubmit={this.signIn}>
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
              {loadingAuth ? (
                <input
                  type="submit"
                  disabled={true}
                  style={{ opacity: 0.5 }}
                  className="gb-btn gb-btn-transparent"
                  value="Loading..."
                />
              ) : succesAuth ? (
                <input
                  type="submit"
                  disabled={true}
                  style={{ opacity: 1 }}
                  className="gb-btn gb-btn-transparent"
                  value="Success"
                />
              ) : (
                <input
                  type="submit"
                  className="gb-btn gb-btn-transparent"
                  value="Sign in"
                />
              )}
            </div>
            {errorAuth && <Error message="Auth failed!" />}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signInUser: (email, password) => dispatch(signUserInAsync(email, password)),
  actionReset: () => dispatch(actionReset())
});

const mapStateToProps = state => ({
  loadingAuth: state.generalLoadingErrorSucces.loading,
  errorAuth: state.generalLoadingErrorSucces.error,
  succesAuth: state.generalLoadingErrorSucces.succes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
