import { addNewNotification } from "./notifications-action";
import {
  actionStarted,
  actionError,
  actionSuccess
} from "./generalLoadingErrorSucces-actions";

/**
 * Create Job
 *
 * @param jobData
 * @param sentTo
 * @param sentToId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const createJob = (jobData, sentTo = null, sentToId = null) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebaseStoreData = getState().firebase;
    const firebase = getFirebase();

    //take out the lat and long, to make them geoPoints
    const { lat, long, ...jobAdress } = jobData.jobdetailedAddress;

    return getFirestore()
      .collection("jobOffers")
      .add({
        startDate: jobData.jobStartDate,
        endDate: jobData.jobEndDate,
        time: jobData.jobTime,
        title: jobData.jobTitle,
        requestedSkill: jobData.jobType,
        location: {
          ...jobAdress,
          streetNumber: jobData.jobdetailedAddress.streetNumber || null,
          geolocation: new firebase.firestore.GeoPoint(lat, long)
        },
        description: jobData.jobDescription,
        nettoAmouont: jobData.jobBudget,
        payout: false,
        priceAmount: jobData.jobTotalBudget,
        status: sentTo ? "private" : "open",
        downPaymentAmountStatus: "none",
        photographer: "none",
        companyId: firebaseStoreData.auth.uid,
        company: {
          companyName: firebaseStoreData.profile.companyName,
          profileImageUrl: firebaseStoreData.profile.profileImageUrl
        },
        createdAt: new Date().getTime(),
        sentTo: sentTo,
        sentToId: sentToId,
        insurance: jobData.jobInsurance,
        insuranceAmount: jobData.jobInsuranceAmount,
        insuranceDue: jobData.jobInsuranceDue,
        insurancePaymentStatus: "none",
        tax: {
          percentage: jobData.jobTaxation
        }
      });
  };
};

/**
 * Accept an aplicat for an job
 *
 * @param companyData
 * @param photographerData
 * @param jobData
 * @returns {function(*, *, {getFirestore: *})}
 */
export const acceptApplicantForJob = (
  companyData,
  photographerData,
  jobData
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("jobOffers")
      .doc(jobData.jobId)
      .update({
        photographer: {
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          uid: photographerData.id,
          profileImageUrl: photographerData.profileImageUrl
        },
        status: "in progress",
        downPaymentAmountStatus: "done"
      })
      .then(() => {
        const notification = {
          createdAt: new Date().getTime(),
          link: `/progress-job/${jobData.jobId}`,
          read: false,
          title: `${companyData.companyName} accepted you for ${jobData.title}`,
          recipientUserId: photographerData.id
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

/**
 * Delete a job
 *
 * @param jobId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const deleteCurrentJob = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("jobOffers")
      .doc(jobId)
      .delete();
  };
};

/**
 * Decline an aplicat for the job (Do we really need it?)
 *
 * @param jobData
 * @param photographerId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const declineApplicantForJob = (jobData, photographerId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    let photographersWhichApplied = jobData.photographersWhichApplied;

    return firestore
      .collection("jobOffers")
      .doc(jobData.jobId)
      .update({
        photographersWhichApplied: {
          ...photographersWhichApplied,
          [photographerId]: {
            ...photographersWhichApplied[photographerId],
            declined: true
          }
        }
      })
      .then(() => {
        const notification = {
          title: `${
            jobData.company.companyName
          } has declined your application for ${jobData.title}.`,
          link: `/open-job/${jobData.jobId}`,
          read: false,
          time: new Date().getTime(),
          recipientUserId: photographerId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

/**
 * Create a new private job request,
 * sent to a specific photographer
 *
 * @param jobData
 * @param company
 * @param photographerData
 * @returns {function(*, *, {getFirestore: *})}
 */
export const createPrivateJob = (jobData, company, photographerData) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const sentToData = {
      uid: photographerData.uid,
      firstName: photographerData.firstName,
      lastName: photographerData.lastName,
      profileImageUrl: photographerData.profileImageUrl
    };

    const firebase = getFirebase();

    //take out the lat and long, to make them geoPoints
    const { lat, long, ...jobAdress } = jobData.jobdetailedAddress;

    //add the job to the jobOffers
    return getFirestore().collection('jobRequests').add({
      photographer: sentToData,
      status: 'pending',
      company,
      startDate: jobData.jobStartDate,
      endDate: jobData.jobEndDate,
      time: jobData.jobTime,
      title: jobData.jobTitle,
      requestedSkill: jobData.jobType,
      location: {
        ...jobAdress,
        streetNumber: jobData.jobdetailedAddress.streetNumber || '1',
        geolocation: new firebase.firestore.GeoPoint(lat, long)
      },
      description: jobData.jobDescription,
      nettoAmouont: jobData.jobBudget,
      payout: false,
      priceAmount: jobData.jobTotalBudget,
      downPaymentAmountStatus: "none",
      createdAt: new Date().getTime(),
      insurance: jobData.jobInsurance,
      insuranceAmount: jobData.jobInsuranceAmount,
      insuranceDue: jobData.jobInsuranceDue,
      insurancePaymentStatus: "none",
      tax: {
        percentage: jobData.jobTaxation
      }
    }).then(
      response => {
        //response is the new created job
        //add notification to the photographer
        const notification = {
          createdAt: new Date().getTime(),
          link: `/private/job/${response.id}?user=${photographerData.uid}`,
          read: false,
          recipientUserId: photographerData.uid,
          title: `${company.companyName} has sent you a private job request.`
        };
        return dispatch(addNewNotification(notification));
      }
    );
  };
};

export const setDownPaymentStatus = jobId => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    return getFirestore().collection('jobRequests').doc(jobId).update({
      downPaymentAmountStatus: 'done'
    })
      .then(() => dispatch(actionSuccess()))
      .catch(err => dispatch(actionError(err)));
  }
};
/*
export const createPrivateJob = (jobData, company, photographerData) => {
  return (dispatch, getState, { getFirestore }) => {
    const sentToData = {
      uid: photographerData.uid,
      firstName: photographerData.firstName,
      lastName: photographerData.lastName,
      profileImageUrl: photographerData.profileImageUrl
    };
    //add the job to the jobOffers
    return dispatch(createJob(jobData, sentToData, photographerData.uid)).then(
      response => {
        //response is the new created job
        //add notification to the photographer
        const notification = {
          createdAt: new Date().getTime(),
          link: `/private/job/${response.id}?user=${photographerData.uid}`,
          read: false,
          recipientUserId: photographerData.uid,
          title: `${company.companyName} has sent you a private job request.`
        };
        return dispatch(addNewNotification(notification));
      }
    );
  };
};*/

/**
 * Sent an open job request as
 * private request to a photographer
 *
 * @param jobData
 * @param company
 * @param photographerData
 * @returns {function(*, *, {getFirestore: *})}
 */
export const sendPrivateRequestFromExistingJobs = (
  jobData,
  company,
  photographerData
) => {
  return (dispatch, getState, { getFirestore }) => {
    //Update the job data
    const firestore = getFirestore();

    return firestore
      .collection("jobOffers")
      .doc(jobData.id).delete()
      .then(() => {
        return firestore.collection('jobRequests').doc(jobData.id).set({
          ...jobData,
          status: 'pending',
          company,
          photographer: photographerData
        });
      })
      .then(data => {
        //add notification to the photographer
        const notification = {
          createdAt: new Date().getTime(),
          link: `/private/job/${jobData.id}?user=${photographerData.uid}`,
          read: false,
          recipientUserId: photographerData.uid,
          title: `${company.companyName} has sent you a private job request.`
        };
        return dispatch(addNewNotification(notification));
      })
      .catch(err => dispatch(actionError(err)));
  };
};
/*
export const sendPrivateRequestFromExistingJobs = (
  jobData,
  company,
  photographerData
) => {
  return (dispatch, getState, { getFirestore }) => {
    //Update the job data
    const firestore = getFirestore();

    return firestore
      .collection("jobOffers")
      .doc(jobData.id)
      .update({
        sentTo: {
          uid: photographerData.uid,
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          profileImageUrl: photographerData.profileImageUrl
        },
        sentToId: photographerData.uid
      })
      .then(data => {
        //add notification to the photographer
        const notification = {
          createdAt: new Date().getTime(),
          link: `/private/job/${jobData.id}?user=${photographerData.uid}`,
          read: false,
          recipientUserId: photographerData.uid,
          title: `${company.companyName} has sent you a private job request.`
        };
        return dispatch(addNewNotification(notification));
      });
  };
};
*/

/**
 * Make private declined job to public
 *
 * @param jobId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const makePrivateJobPublic = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionStarted());
    firestore
      .collection("jobOffers")
      .doc(jobId)
      .update({
        status: "open"
      })
      .then(() => {
        dispatch(actionSuccess());
      })
      .catch(err => {
        dispatch(actionError(err));
      });
  };
};

/**
 * Accept the work
 *
 * @param jobId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const acceptWork = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("jobOffers")
      .doc(jobId)
      .update({
        status: "closed"
      })
      .then(() => dispatch({ type: "ACCEPT_WORK_SUCCESS" }));
  };
};
