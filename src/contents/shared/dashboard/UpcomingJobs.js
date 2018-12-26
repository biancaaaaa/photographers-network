import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, isEmpty, firestoreConnect} from "react-redux-firebase";
// icon urls
import calendarIconURL from '../../../png-icons/calendar-icon.png';
import locationIconURL from '../../../png-icons/location-icon.png';
import timelineIconURL from '../../../png-icons/timeline-icon.png';
import mailIconURL from '../../../png-icons/mail-icon.png';

const weekdayOption = {weekday: 'long'};
const dateOption = {year: 'numeric', month: 'long', day: 'numeric'};
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const UpcomingJobs = ({match, upcomingJobsCompany, upcomingJobsPhotographer}) => {
  const isCompany = match.params.type === 'company';

  if (!isLoaded(upcomingJobsCompany) || !isLoaded(upcomingJobsPhotographer))
    return <div className="dashboard-container">Loading...</div>;

  if ((isCompany && isEmpty(upcomingJobsCompany)) ||
    (!isCompany && isEmpty(upcomingJobsPhotographer)))
    return <div className="dashboard-container">No upcoming jobs.</div>;

  const upcomingJobs = !isCompany ?
    upcomingJobsPhotographer : upcomingJobsCompany;

  const job = upcomingJobs.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))[0];

  const contactImg = isCompany ?
    job.photographer.profileImageUrl : job.company.profileImageUrl;
  const date = new Date(job.startDate);
  return (
    <div>
      <div className="time-box">
        <div className="col">
          <img src={calendarIconURL} alt="calendar-icon" className="icon"/>
          <h3 className="uppercase">{date.toLocaleString("en-US", weekdayOption)}</h3>
          <p className="small-grey-bold">{date.toLocaleString("en-US", dateOption)}</p>
        </div>
        <div className="col">
          <img src={timelineIconURL} alt="timeline-icon" className="icon"/>
          <h1>{formatTime(date)}</h1>
        </div>
        <div className="col">
          <img src={locationIconURL} alt="location-icon" className="icon"/>
          <h3>{job.location.city}</h3>
          <p className="small-grey-bold">{job.location.streetName}{job.location.streetNumber || ''}, <br/>133
            36 {job.location.city}</p>
        </div>
      </div>
      <div className="light-grey-box">
        <div className="light-grey-box-content">
          <h2 className="uppercase">{job.title}</h2>
          <p className="description">{job.description}</p>
          <div className="contact-container">
            <div className="white-circle" style={{backgroundImage: `url(${contactImg})`}}/>
            <div className="white-circle"><img src={mailIconURL} alt="mail-icon" className="icon"/></div>
            <p className="uppercase light small">{isCompany ? 'Photographer' : 'Company'}'s contacts</p>
          </div>
        </div>
      </div>
      <div className="black-yellow-box">
        <span className="uppercase light">Price Amount</span>
        <b>{job.priceAmount}€</b>
      </div>
    </div>
  );
};

function formatTime(date) {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  hours = hours.length > 1 ? hours : `0${hours}`;
  minutes = minutes.length > 1 ? minutes : `0${minutes}`;
  return `${hours}:${minutes}`;
}

const mapStateToProps = state => ({
  upcomingJobsCompany: state.firestore.ordered.upcomingJobsCompany,
  upcomingJobsPhotographer: state.firestore.ordered.upcomingJobsPhotographer,
  auth: state.firebase.auth
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
      return [
        {
          collection: 'jobOffers',
          where: ['photographer.uid', '==', props.auth.uid],
          storeAs: 'upcomingJobsPhotographer'
        },
        {
          collection: 'jobOffers',
          where: ['companyId', '==', props.auth.uid],
          storeAs: 'upcomingJobsCompany'
        }
      ]
    }
  )
)(UpcomingJobs);