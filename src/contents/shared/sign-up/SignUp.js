import React, { Component } from "react";
import { connect } from "react-redux";
import { sigUpUser } from "../../../redux/actions/user-action";
import { actionReset } from "../../../redux/actions/generalLoadingErrorSucces-actions";

import { SingUpView } from "../../../components/SignUpView";
import { Breadcrumbs } from "./BreadCrumbs";
import { PhotographerDescription } from "./PhotographerDescription";
import { OptionalStep } from "./OptionalStep";
import { checkSignUpForm } from "../../../helper functions/checkSignupForm";

class SignUp extends Component {
  state = {
    currentStep: 0,
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    password2: "",
    locationPlaceholder: "",
    detailedAddress: {},
    photographerType: "",
    showCustomSelect: false
  };

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeStep = step => {
    console.log(step);
    //check for the second step
    if (
      step == 2 &&
      !checkSignUpForm({ type: this.props.type, ...this.state })
    ) {
      return;
    }

    this.setState({ currentStep: step });
  };

  optionSelectHandler = type => {
    this.setState({
      photographerType: type
    });
  };

  showCustomSelectHandler = () => {
    this.setState(
      prevState => ({
        showCustomSelect: !prevState.showCustomSelect
      }),
      () => {
        if (this.state.showCustomSelect === true) {
          window.addEventListener("click", e => {
            if (!e.target.classList.contains("custom-select")) {
              this.setState({
                showCustomSelect: false
              });
            }
          });
        }
      }
    );
  };

  signup = e => {
    e.preventDefault();
    this.props.signUserUp(this.state);
  };

  //Reset the general loading when unmountin
  componentWillUnmount() {
    this.props.actionReset();
  }

  render() {
    const {
      currentStep,
      locationPlaceholder,
      showCustomSelect,
      photographerType
    } = this.state;
    const { loadingDB, type, successDB, errorDB, closeHandler } = this.props;

    let component = <div />;
    switch (currentStep) {
      case 0:
        component =
          type === "photographer" ? (
            <PhotographerDescription changeHandler={this.changeStep} />
          ) : (
            <p>Company Description</p>
          );
        break;
      case 1:
        component = (
          <SingUpView
            stepHandler={this.changeStep}
            changeHandler={this.handleChange}
            type={type}
            {...this.state}
          />
        );
        break;
      case 2:
        component = (
          <OptionalStep
            locationPlaceholder={locationPlaceholder}
            type={type}
            photographerType={photographerType}
            showCustomSelect={showCustomSelect}
            showCustomSelectHandler={this.showCustomSelectHandler}
            optionSelectHandler={this.optionSelectHandler}
            loadingDB={loadingDB}
            successDB={successDB}
            handleChange={this.handleChange}
          />
        );
        break;
      default:
        component = <p>No fitting component!</p>;
        break;
    }
    return (
      <React.Fragment>
        <div className="black-content-section">
          <Breadcrumbs
            crumbsAmount={3}
            activeCrumb={currentStep}
            clickHandler={this.changeStep}
          />
          <div className="selected-content">
            <form onSubmit={this.signup}>{component}</form>
            <p className="terms">Terms & Conditions</p>
            {errorDB && <div className="error-message">{errorDB.message}</div>}
          </div>
          <div onClick={closeHandler} className="round-close-btn">
            +
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  loadingDB: state.generalLoadingErrorSucces.loading,
  errorDB: state.generalLoadingErrorSucces.error,
  successDB: state.generalLoadingErrorSucces.succes
});

const mapDispatchToProps = dispatch => ({
  signUserUp: userData => dispatch(sigUpUser(userData)),
  actionReset: () => dispatch(actionReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
