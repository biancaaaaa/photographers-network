// dependencies
import React, {Component} from "react";
import {Redirect} from "react-router-dom";

// component
import PhotoUpload from "../../shared/PhotoUpload";
import WithModal from "../../../RenderProp/WithModal";
import {Button} from "../../../components/Button";
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";
import {submitWork} from "../../../redux/actions/single-job-action-photographer";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";
import {
  removeFromDatabase,
  removeFromStorage
} from "../../../redux/actions/photo-upload-action";

class SubmitWork extends Component {
  state = {
    images: [],
    jobId: this.props.match.params.jobid,
    loading: true,
    submitted: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.jobid)
      this.setState({
        jobId: nextProps.match.params.jobid
      });
  }

  componentDidMount() {
    // sets listener
    this.props.firestore.setListener({
      collection: "jobOffers",
      doc: this.props.match.params.jobid
    });
  }

  /**
   * Removes image from database and storage.
   *
   * @param id
   */
  removeImage = id => {
    this.props.removeFromDB("jobOffers", this.state.jobId, `submittedWork.${id}`);
    this.props.removeFromStorage(`${this.props.auth.uid}/submitted-works/${this.state.jobId}/${id}`);
  };

  /**
   * Submits the uploaded work to company.
   */
  submit = () => {
    const {profile, jobsData} = this.props;
    const {jobId} = this.state;
    const jobDescription = jobsData[jobId];
    this.props.submitWorkForJob(jobId);
    const notification = {
      title: `${profile.firstName} ${
        profile.lastName
        } submitted his work for "${jobDescription.title}".`,
      link: `/progress-job/${jobId}`,
      read: false,
      createdAt: new Date().getTime(),
      recipientUserId: jobDescription.companyId
    };
    this.props.addNotification(notification);
    this.setState({submitted: true});
  };

  render() {
    const {jobId} = this.state;
    const {auth, jobOfferData, jobRequestData} = this.props;
    if (!isLoaded(jobOfferData) || !isLoaded(jobRequestData)) return <LoadingPage/>;
    const isOffer = jobOfferData[jobId];
    const jobsData = isOffer ? jobOfferData : jobRequestData;
    console.log(jobsData);
    if (!jobsData[jobId]) return <div>Job not found!</div>;
    const images = Object.values(jobsData[jobId].submittedWork || {});
    return (
      <div className="section-content with-padding">
        {!this.state.submitted ?
          <React.Fragment>
            Submit your work here!
            <WithModal className="portofolio-add" closeItemClass="close">
              {({showModal, closeModalListener}) => (
                <PhotoUpload
                  collection={isOffer ? 'jobOffers' : 'jobRequests'}
                  doc={jobId}
                  databaseRef={`photographer/${auth.uid}/applied-jobs/${jobId}/submitted-work`}
                  storageRef={`${auth.uid}/submitted-works/${jobId}`}
                  closeModalListener={closeModalListener}
                  showModal={showModal}
                  descriptionField={false}
                  callback={this.forceUpdate.bind(this)}
                />
              )}
            </WithModal>

            <div className="image-container">
              {
                images.map((img, key) =>
                  <div className="single-image-container" key={img.id}>
                    <img src={img.url} alt={img.id}/>
                    <div className="img-hover" onClick={() => this.removeImage(img.id)}>REMOVE</div>
                  </div>
                )
              }
              {
                images.length > 0 &&
                <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={this.submit}>Submit to
                  company</Button>
              }
            </div>
          </React.Fragment> :
          <Redirect to={`/progress-job/${jobId}`}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  jobOfferData: state.firestore.data.jobOffers,
  jobRequestData: state.firestore.data.jobRequests
});

const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch(addNewNotification(notification)),
  submitWorkForJob: jobId => dispatch(submitWork(jobId)),
  removeFromDB: (collection, doc, field) =>
    dispatch(removeFromDatabase(collection, doc, field)),
  removeFromStorage: storageRef => dispatch(removeFromStorage(storageRef))
});

export default compose(
  firestoreConnect(props => [
      {
        collection: "jobOffers",
        doc: props.match.params.jobid
      },
      {
        collection: 'jobRequests',
        doc: props.match.params.jobid
      }
    ]
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SubmitWork);

/*
 state = {
    images: [],
    jobId: this.props.match.params.jobid,
    loading: true,
    submitted: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.jobid)
      this.setState({
        jobId: nextProps.match.params.jobid
      });
  }

  /**
   * Removes image from database and storage.
   *
   * @param id
   
  removeImage = id => {
   this.props.removeFromDB("jobOffers", this.state.jobId, `submittedWork.${id}`);
   this.props.removeFromStorage(`${this.props.auth.uid}/submitted-works/${this.state.jobId}/${id}`);
 };

 /**
  * Submits the uploaded work to company.
  
 submit = () => {
   const {profile, jobsData} = this.props;
   const {jobId} = this.state;
   const jobDescription = jobsData[jobId];
   this.props.submitWorkForJob(jobId);
   const notification = {
     title: `${profile.firstName} ${
       profile.lastName
     } submitted his work for "${jobDescription.title}".`,
     link: `/progress-job/${jobId}`,
     read: false,
     time: new Date(),
     recipientUserId: jobDescription.companyId
   };
   this.props.addNotification(notification);
   this.setState({ submitted: true });
 };

 render() {
   const {jobId} = this.state;
   console.log(jobId);
   const {auth, jobsData} = this.props;
   if(!isLoaded(jobsData)) return <LoadingPage/>;
   const images = Object.values(jobsData.submittedWork || {});
   console.log(images);
   return (
       <div className="section-content with-padding">
         {!this.state.submitted ?
           <React.Fragment>
             Submit your work here!
             <WithModal className="portofolio-add" closeItemClass="close">
               {({showModal, closeModalListener}) => (
                 <PhotoUpload
                   collection={'jobOffers'}
                   doc={jobId}
                   databaseRef={`photographer/${auth.uid}/applied-jobs/${jobId}/submitted-work`}
                   storageRef={`${auth.uid}/submitted-works/${jobId}`}
                   closeModalListener={closeModalListener}
                   showModal={showModal}
                   descriptionField={false}
                   callback={this.forceUpdate.bind(this)}
                 />
               )}
             </WithModal>

             <div className="image-container">
               {
                 images.map((img, key) =>
                   <div className="single-image-container" key={img.id}>
                     <img src={img.url} alt={img.id}/>
                     <div className="img-hover" onClick={() => this.removeImage(img.id)}>REMOVE</div>
                   </div>
                 )
               }
               {
                 images.length > 0 &&
                 <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={this.submit}>Submit to
                   company</Button>
               }
             </div>
           </React.Fragment> :
           <Redirect to={`/progress-job/${jobId}`}/>
         }
       </div>
   );
 }
 */