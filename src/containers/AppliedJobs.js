
import React, { Component } from "react";
import LoadingPage from "../components/LoadingPage";
import fire from '../config/Fire';
import { GbCard50 } from '../components/gbCard50';

export default class AppliedJobs extends Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.loading === false ?
            <AppliedJobsFetch {...this.props} /> :
            <LoadingPage />
        }
      </React.Fragment>
    );
  }
}

class AppliedJobsFetch extends Component {
  state = {
    loadedDb: false,
    jobList: []
  };

  database = fire.database().ref();

  componentDidMount() {
    this.fetchJobs();
  }

  
  fetchJobs() {
    const { user } = this.props;
    let jobs = [];
    this.database
      .child('photographer')
      .child(user.uid)
      .child('applied-jobs')
      .once('value', snap => {
        snap.forEach(job => {
          jobs.push(job.val());
        });
      })
      .then(() => {
        this.setState({ jobList: jobs });
      });
  }

  render() {
    const { jobList } = this.state;
    return (
      <div>
        {
          jobList.map(job => (
              <GbCard50
                key={job.jobDescription.jobbId}
                cardLink={`job/${job.jobDescription.jobbId}`}
                type='half-left'
                source={{
                  txt : job.jobDescription.companyName,
                  link : `/profile/${job.jobDescription.company}`
                }}
                postedTime={job.jobDescription.date}
                category={job.jobDescription.type}
              >
                {job.jobDescription.title}
              </GbCard50>
          ))
        }
      </div>
    );
  }
}