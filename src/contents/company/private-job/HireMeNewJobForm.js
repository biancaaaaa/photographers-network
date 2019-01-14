import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createPrivateJob } from "../../../redux/actions/company-actions";
import { Redirect } from "react-router-dom";

import CreateJobForm from "../create-job/CreateJobForm";

class HireMeNewJobForm extends React.Component {
  state = {
    loading: false,
    error: null,
    succes: null
  };
  static propTypes = {
    backHandler: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    photographerId: PropTypes.string.isRequired,
    photographerName: PropTypes.string.isRequired
  };

  //Submit the form, create a new
  //private job
  submitHandler = values => {
    //Set up the loading
    this.setState({
      loading: true,
      error: null,
      succes: null
    });
    //Get the infos from the props
    const { company, photographerData, createPrivateJob } = this.props;

    //Send the call to the actions and start the process
    //off adding new job and notification to the DB
    createPrivateJob(values, company, photographerData)
      .then(data => {
        this.setState({
          loading: false,
          error: null,
          succes: true
        });
        setTimeout(() => {
          this.setState({
            redirect: true
          });
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          error: err,
          succes: null
        });
      });
  };

  render() {
    const { backHandler } = this.props;
    const { loading, error, succes, redirect } = this.state;

    //redirect to dashboard after 1s of succes
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div style={{ zIndex: 120 }} className="z">
        <h2 className="send-job-offer-back" onClick={backHandler}>
          BACK
        </h2>
        {loading ? (
          <h2>Loading.....</h2>
        ) : error ? (
          <h2>Error...</h2>
        ) : succes ? (
          <h2>Succes</h2>
        ) : (
          ""
        )}
        <CreateJobForm submitHandler={this.submitHandler} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPrivateJob: (jobData, company, photographerData) =>
    dispatch(createPrivateJob(jobData, company, photographerData))
});

export default connect(
  null,
  mapDispatchToProps
)(HireMeNewJobForm);
