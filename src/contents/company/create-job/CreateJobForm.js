import React from "react";
import { PropTypes } from "prop-types";

import { CustomSelect } from "../../../components/form/CustomSelect";
import { InputField } from "../../../components/form/InputField";
import { NameInputSVG } from "../../../components/svg/NameInputSVG";
import { MoneySVG } from "../../../components/svg/MoneySVG";
import { CameraSVG } from "../../../components/svg/CameraSVG";
import { CalendarSVG } from "../../../components/svg/CalendarSVG";
import { TextArea } from "../../../components/form/TextArea";
import LocationSearchInput from "../../shared/MapsAutocomplete";

const types = ["nature", "portrait", "dogs", "cats"];

// TODO: reduce private job request and job offer to one component
export default class CreateJobForm extends React.Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired
  };

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
    jobType: "nature",
    jobBudget: "",
    serviceFee: 10,
    jobTaxation: 25,
    jobTotalBudget: "",
    jobStartDate: this.createValidDate(new Date()),
    jobEndDate: this.createValidDate(new Date()),
    jobTime: "",
    jobDescription: "",
    jobAddress: "",
    joblocationPlaceholder: "",
    jobdetailedAddress: {},
    countries: [],
    jobInsurance: false,
    jobInsuranceAmount: '',
    jobInsuranceDue: '',
    requestAmount: ''
  };

  componentDidMount() {
    this.fetchCountries();
  }

  /**
   * Fetches countries + tax rates.
   */
  fetchCountries = () => {
    fetch("../tax_rates.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Work with JSON data here
        const res = Object.entries(data).map(([name, value]) => ({
          name,
          value
        }));
        this.setState({countries: res});
      });
  };

  changeHandler = e => {
    const target = e.target.name;
    this.setState({
      [`job${target}`]: e.target.value
    },
      () => {
        console.log(this.state);
        if (target === "Budget" || (target === "detailedAddress")) this.calculateAmount();
      });
  };

  /**
   * Calculates total amount of the job offer.
   */
  calculateAmount = () => {
    let {jobBudget, jobdetailedAddress, serviceFee, countries} = this.state;
    // converts budget into a number
    jobBudget = Number(jobBudget);
    // calculates the fee
    const calcFee = (jobBudget / 100) * serviceFee;
    // adds the fee to the budget
    let totalBudget = jobBudget + calcFee;
    // looks for correct taxation and converts it into number
    const jobTaxation = jobdetailedAddress.country ? Number(
      countries.filter(country => country.name === jobdetailedAddress.country)[0].value
    ) : 25;
    // calculates the tax
    const calcTax = (totalBudget / 100) * jobTaxation;
    // adds taxation to the budget and formats number
    totalBudget = this.formatNum(totalBudget + calcTax);
    this.setState({
      jobTotalBudget: totalBudget,
      jobTaxation
    });
  };

  /**
   * Rounds number to two digits.
   *
   * @param number
   * @returns {string}
   */
  formatNum = number => {
    return (Math.round(number * 100) / 100).toFixed(2);
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
   * Handles the change of a checkbox.
   *
   * @param e
   */
  checkBoxChangeHandler = e => {
    this.setState({
      [`job${e.target.name}`]: e.target.checked
    });
  };

  optionSelectHandler = type => {
    this.setState({
      jobType: type
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

  formSubmited = e => {
    e.preventDefault();
    /* send data to the parent */
    this.props.submitHandler({
      ...this.state,
      jobDate: new Date(this.state.jobDate).getTime()
    });
  };

  render() {
    const {
      jobTitle,
      jobType,
      jobBudget,
      jobStartDate,
      jobEndDate,
      jobTime,
      jobDescription,
      showCustomSelect,
      joblocationPlaceholder,
      jobInsurance,
      jobInsuranceDue,
      jobInsuranceAmount
    } = this.state;

    let today = new Date();
    today = this.createValidDate(today);

    return (
      <div className="create-job-page section-content with-padding">
        <h1>Create Job</h1>
        <form onSubmit={this.formSubmited}>
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobTitle}
            changeHandler={this.changeHandler}
            type="text"
            name="Title"
            placeholder="Name/Title"
          />
          <LocationSearchInput
            locationPlaceholder={joblocationPlaceholder}
            changeHandler={this.changeHandler}
          />
          <div
            className="custom-select gb-text-input gb-text-input-trans-background"
            onClick={this.showCustomSelectHandler}
          >
            <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            {jobType}
            <CustomSelect
              showCustomSelect={showCustomSelect}
              optionsList={types}
              optionSelectHandler={this.optionSelectHandler}
            />
          </div>
          <InputField
            svg={
              <MoneySVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            }
            value={jobBudget}
            changeHandler={this.changeHandler}
            type="number"
            name="Budget"
            placeholder="Budget"
            min="10"
          />
          <InputField
            svg={
              <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            }
            value={jobStartDate || today}
            changeHandler={this.changeHandler}
            type="date"
            name="StartDate"
            min={today}
          />
          <InputField
            svg={
              <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            }
            value={jobEndDate || today}
            changeHandler={this.changeHandler}
            type="date"
            name="EndDate"
            min={today}
          />
          <InputField
            svg={
              <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            }
            value={jobTime}
            changeHandler={this.changeHandler}
            type="time"
            name="Time"
            min={today}
          />
          <TextArea
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobDescription}
            name="Description"
            changeHandler={this.changeHandler}
            placeholder="Job description"
          />
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="Insurance"
              onChange={this.checkBoxChangeHandler}
              checked={jobInsurance}
            />
            <span className="checkmark"/>
            Insurance payment
          </label>
          {jobInsurance && (
            <div className="two-inputs-container">
              <InputField
                value={jobInsuranceAmount}
                changeHandler={this.changeHandler}
                type="number"
                name="InsuranceAmount"
                placeholder="Amount of insurance"
                min="10"
              />
              <InputField
                svg={
                  <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
                }
                value={jobInsuranceDue}
                changeHandler={this.changeHandler}
                onFocus={this.onFocus}
                onBlur={e => this.onBlur(e, "Due Date")}
                type="text"
                placeholder="Due Date"
                name="InsuranceDue"
                min={today}
              />
            </div>
          )}
          <input
            className="gb-btn gb-btn-large gb-btn-primary"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    );
  }
}

/*
<InputField
  svg={
    <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
  }
  value={jobLocation}
  changeHandler={this.changeHandler}
  type="text"
  name="Location"
  placeholder="Location"
/>
<InputField
  svg={
    <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
  }
  value={jobAddress}
  changeHandler={this.changeHandler}
  type="text"
  name="Address"
  placeholder="Address"
/>
*/
