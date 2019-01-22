import React from "react";
import {connect} from "react-redux";
import {createJob} from "../../../redux/actions/company-actions";

import LocationSearchInput from "../../shared/MapsAutocomplete";
import {CustomSelect} from "../../../components/form/CustomSelect";
import {InputField} from "../../../components/form/InputField";
import {NameInputSVG} from "../../../components/svg/NameInputSVG";
import {LocationSVG} from "../../../components/svg/LocationSVG";
import {MoneySVG} from "../../../components/svg/MoneySVG";
import {CameraSVG} from "../../../components/svg/CameraSVG";
import {CalendarSVG} from "../../../components/svg/CalendarSVG";
import {TextArea} from "../../../components/form/TextArea";
import {Select} from "../../../components/form/Select";

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
    jobType: "nature",
    jobBudget: "",
    jobDate: this.createValidDate(new Date()),
    jobDescription: "",
    jobAddress: "",
    loading: false,
    error: null,
    finished: null,
    jobInsurance: false,
    jobInsuranceAmount: "",
    jobInsuranceDue: this.createValidDate(new Date()),
    jobCountry: "Sweden",
    jobTaxation: 25,
    jobTotalBudget: 0,
    countries: [],
    serviceFee: 10,
    joblocationPlaceholder: "",
    jobdetailedAddress: {}
  };

  componentDidMount() {
    this.fetchCountries();
  }

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

  /**
   * Handles the change of an input.
   *
   * @param e
   */
  changeHandler = e => {
    const target = e.target.name;
    this.setState(
      {
        [`job${target}`]: e.target.value
      },
      () => {
        if (target === "Budget" || target === "Country") this.calculateAmount();
      }
    );
  };

  /**
   * Fetches countries + tax rates.
   */
  fetchCountries = () => {
    fetch("./tax_rates.json")
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

  /**
   * Calculates total amount of the job offer.
   */
  calculateAmount = () => {
    let {jobBudget, jobCountry, serviceFee, countries} = this.state;
    // converts budget into a number
    jobBudget = Number(jobBudget);
    // calculates the fee
    const calcFee = (jobBudget / 100) * serviceFee;
    // adds the fee to the budget
    let totalBudget = jobBudget + calcFee;
    // looks for correct taxation and converts it into number
    const jobTaxation = Number(
      countries.filter(country => country.name === jobCountry)[0].value
    );
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

  /**
   * Adds the new job and redirects to the
   * new created job page.
   *
   * @param e
   */
  submitHandler = e => {
    e.preventDefault();

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
      jobBudget,
      jobDate,
      jobDescription,
      showCustomSelect,
      loading,
      finished,
      jobInsurance,
      jobInsuranceAmount,
      jobInsuranceDue,
      jobCountry,
      serviceFee,
      jobTotalBudget,
      jobTaxation
    } = this.state;

    let today = new Date();
    today = this.createValidDate(today);

    return (
      <div>
        <h1>Create Job</h1>
        <div className="dashboard-container">
          <form onSubmit={this.submitHandler}>
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
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
            <Select
              value={jobCountry}
              name="Country"
              defaultText={"Choose your country"}
              svg={
                <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              changeHandler={this.changeHandler}
              options={this.state.countries}
            />
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
                <MoneySVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
              }
              value={jobBudget}
              changeHandler={this.changeHandler}
              type="number"
              name="Budget"
              placeholder="Budget"
              min="10"
            />
            {jobBudget !== "" && (
              <ul>
                <li>Netto amount: {this.formatNum(jobBudget)} €</li>
                <li>+ Taxes {jobTaxation}%</li>
                <li>+ Service fee {serviceFee}%</li>
                <hr/>
                <li>Total amount: {jobTotalBudget} €</li>
              </ul>
            )}
            <InputField
              svg={
                <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
              }
              value={jobDate || today}
              changeHandler={this.changeHandler}
              type="date"
              name="Date"
              min={today}
            />
            <label>
              Insurance payment:
              <input
                type="checkbox"
                name="Insurance"
                onChange={this.checkBoxChangeHandler}
                checked={jobInsurance}
              />
            </label>
            {jobInsurance && (
              <React.Fragment>
                <InputField
                  svg={
                    <MoneySVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
                  }
                  value={jobInsuranceAmount}
                  changeHandler={this.changeHandler}
                  type="number"
                  name="InsuranceAmount"
                  placeholder="Amount of insurance"
                  min="10"
                />
                <InputField
                  svg={
                    <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
                  }
                  value={jobInsuranceDue || today}
                  changeHandler={this.changeHandler}
                  type="date"
                  name="InsuranceDue"
                  min={today}
                />
              </React.Fragment>
            )}
            <TextArea
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={jobDescription}
              name="Description"
              changeHandler={this.changeHandler}
              placeholder="Job description"
            />
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
