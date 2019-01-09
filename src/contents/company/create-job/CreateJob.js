import React from "react";
import {connect} from "react-redux";
import {createJob} from "../../../redux/actions/company-actions";

import LocationSearchInput from "../../shared/MapsAutocomplete";
import {CustomSelect} from "../../../components/form/CustomSelect";
import {InputField} from "../../../components/form/InputField";
import {CameraSVG} from "../../../components/svg/CameraSVG";

// icon urls
import calendarIconURL from '../../../png-icons/calendar-icon.png';
import timelineIconURL from '../../../png-icons/timeline-icon.png';

const types = ["nature", "portrait", "dogs", "cats"];

class CreateJob extends React.Component {
  createValidDate = date => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}-${month >= 10 ? month : `0${month}`}-${
      day >= 10 ? day : `0${day}`
      }`;
  };

  state = {
    jobTitle: "",
    jobLocation: "",
    jobType: "Kind of photography",
    jobStartDate: "",
    jobEndDate: "",
    jobTime: "",
    jobDescription: "",
    jobAddress: "",
    loading: false,
    error: null,
    finished: null,
    countries: [],
    joblocationPlaceholder: "",
    jobdetailedAddress: {}
  };

  /**
   * Handles the change of an input.
   *
   * @param e
   */
  changeHandler = e => {
    const target = e.target.name;
    this.setState({
      [`job${target}`]: e.target.value
    });
  };

  onFocus = e => {
    e.currentTarget.type = "date";
  };

  onBlur = (e, type) => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = type;
  };

  onFocusTime = e => {
    e.currentTarget.type = "time";
  };

  onBlurTime = e => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Time";
  };

  /**
   * Adds the new job and redirects to the
   * new created job page.
   *
   * @param e
   */
  submitHandler = e => {
    e.preventDefault();

    if (this.state.jobType === "Kind of photography") {
      console.log("Choose a type of photography!");
      return;
    }

    this.setState({
      loading: true
    });

    this.props
      .createJob({
        ...this.state,
        jobDate: new Date(this.state.jobDate).getTime()
      })
      .then(data => {
        this.setState({
          loading: false,
          finished: true
        });

        setTimeout(() => {
          this.props.history.push(`/open-job/${data.id}`);
        }, 1000);
      })
      .catch(err => {
        this.setState({
          loading: false,
          finished: null,
          error: err
        });
      });
  };

  /**
   * Handler for custom select.
   *
   * @param type
   */
  optionSelectHandler = type => {
    this.setState({
      jobType: type
    });
  };

  /**
   * Toggles option box.
   */
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

  render() {
    const {
      jobTitle,
      joblocationPlaceholder,
      jobType,
      jobStartDate,
      jobEndDate,
      jobTime,
      jobDescription,
      showCustomSelect,
      loading,
      finished
    } = this.state;

    let today = new Date();
    today = this.createValidDate(today);

    return (
      <div className="red-bg">
        <h1 className="black-bg-header">Create a new job offert</h1>
        <div className="dashboard-container white-container">
          <form onSubmit={this.submitHandler} className="form-container">
            <InputField
              value={jobTitle}
              changeHandler={this.changeHandler}
              type="text"
              name="Title"
              placeholder="Title"
            />
            <InputField
              value={jobDescription}
              changeHandler={this.changeHandler}
              type="text"
              name="Description"
              placeholder="Description"
            />
            <div className="two-inputs-container">
              <InputField
                svg={
                  <img src={calendarIconURL} alt="calendar" className="gb-icon-small inputIcon"/>
                }
                value={jobStartDate}
                changeHandler={this.changeHandler}
                type="text"
                name="StartDate"
                placeholder="Start"
                min={today}
                onFocus={this.onFocus}
                onBlur={e => this.onBlur(e, 'Start')}
              />
              <InputField
                svg={
                  <img src={calendarIconURL} alt="calendar" className="gb-icon-small inputIcon"/>
                }
                value={jobEndDate}
                changeHandler={this.changeHandler}
                type="text"
                name="EndDate"
                placeholder="End"
                min={today}
                onFocus={this.onFocus}
                onBlur={e => this.onBlur(e, 'End')}
              />
            </div>
            <LocationSearchInput
              locationPlaceholder={joblocationPlaceholder}
              changeHandler={this.changeHandler}
            />
            <div className="two-inputs-container">
              <div
                className="custom-select gb-text-input gb-text-input-trans-background"
                onClick={this.showCustomSelectHandler}
              >
                <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
                {jobType}
                <CustomSelect
                  showCustomSelect={showCustomSelect}
                  optionsList={types}
                  optionSelectHandler={this.optionSelectHandler}
                />
              </div>
              <InputField
                svg={
                  <img src={timelineIconURL} alt="calendar" className="gb-icon-small inputIcon"/>
                }
                value={jobTime}
                changeHandler={this.changeHandler}
                type="text"
                name="Time"
                placeholder="Time"
                onFocus={this.onFocusTime}
                onBlur={this.onBlurTime}
              />
            </div>
            <input
              className="gb-btn gb-btn-large gb-btn-primary"
              type="submit"
              value={loading ? "Loading..." : finished ? "Done!" : "Create"}
              disabled={loading || finished}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  createJob: jobData => dispatch(createJob(jobData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJob);

/*
<InputField
  svg={
    <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
  }
  value={jobLocation}
  changeHandler={this.changeHandler}
  type="text"
  name="Location"
  placeholder="Location"
/>
<InputField
  svg={
    <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
  }
  value={jobAddress}
  changeHandler={this.changeHandler}
  type="text"
  name="Address"
  placeholder="Address"
/>
*/
