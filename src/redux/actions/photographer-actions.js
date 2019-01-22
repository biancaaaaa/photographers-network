import { addNewNotification } from "../actions/notifications-action";


/**
 * Apply to a job offer (public job).
 * @param jobInfos
 * @param photographerData
 * @returns {function(*, *, {getFirestore: *})}
 */
export const applyForJob = (jobInfos, photographerData) => {
  return (dispatch, getState, { getFirestore }) => {
    const photographersWhichApplied = jobInfos.photographersWhichApplied || [];
    const photographersWhichAppliedIds =
      jobInfos.photographersWhichAppliedIds || [];
    const firestore = getFirestore();
    return firestore
      .collection("jobOffers")
      .doc(jobInfos.jobId)
      .set(
        {
          photographersWhichApplied: {
            ...photographersWhichApplied,
            [photographerData.uid]: {
              id: photographerData.uid,
              firstName: photographerData.firstName,
              lastName: photographerData.lastName,
              profileImageUrl: photographerData.profileImageUrl
            }
          },
          photographersWhichAppliedIds: [
            ...photographersWhichAppliedIds,
            photographerData.uid
          ]
        },
        { merge: true }
      )
      .then(() => {
        const notification = {
          title: `${photographerData.firstName} ${
            photographerData.lastName
          } applied for your job request "${jobInfos.title}".`,
          link: `/open-job/${jobInfos.jobId}`,
          read: false,
          createdAt: new Date().getTime(),
          recipientUserId: jobInfos.companyId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

/**
 * Adds a new photo to the portfolio.
 * @param imageFile
 * @param imageDescription
 * @param uid
 * @param photographerData
 * @returns {function(*, *, {getFirestore: *, getFirebase: *})}
 */
export function uploadPortofolioPhoto(
  imageFile,
  imageDescription,
  uid,
  photographerData
) {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const uniqueId = new Date().getTime();
    const portfolio = photographerData.portfolio || [];

    //create storage ref
    let storageRef = getFirebase()
      .storage()
      .ref(`${uid}/portfolio/${uniqueId}`);

    //upload file
    try {
      const snap = await storageRef.put(imageFile);
      const downloadUrl = await snap.ref.getDownloadURL();
      return getFirestore()
        .collection("users")
        .doc(uid)
        .set(
          {
            portfolio: [
              ...portfolio,
              {
                imageUrl: downloadUrl,
                imageDescription: imageDescription,
                id: uniqueId
              }
            ]
          },
          { merge: true }
        );
    } catch (err) {
      return new Promise((resolve, reject) => reject(err));
    }
  };
}

/**
 * Switches hireable for photographers.
 *
 * @param to
 * @param photographerId
 * @returns {function(*, *, {getFirestore: *})}
 */
export function switchHireable(to, photographerId) {
  return (dispatch, getState, { getFirestore }) => {
    return getFirestore()
      .collection("users")
      .doc(photographerId)
      .update({ hireable: to });
  };
}

/* PRIVATE JOB FUNCTIONALITY */
//Accept private request
export const acceptPrivateJobRequest = (
  jobId,
  title,
  companyId,
  photographerData
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    //Update the job in the DB and
    //send notification to the company
    return firestore
      .collection("jobRequests")
      .doc(jobId)
      .update({
        status: 'approved'
      })
      .then(() => {
        const notification = {
          title: `${photographerData.firstName} ${
            photographerData.lastName
          } accepted your private request for : "${title}". Go ahead and pay now!`,
          link: `/open-job/${jobId}`,
          read: false,
          createdAt: new Date().getTime(),
          recipientUserId: companyId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

//Reject private request
export const rejectPrivateJobRequest = (
  jobId,
  title,
  companyId,
  photographerData
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    //Update the job in the DB and
    //send notification to the company
    return firestore
      .collection("jobRequests")
      .doc(jobId)
      .update({
        status: 'rejected'
      })
      .then(() => {
        const notification = {
          title: `${photographerData.firstName} ${
            photographerData.lastName
          } declined your private request for : "${title}"`,
          link: `/private/job/${jobId}`,
          read: false,
          createdAt: new Date().getTime(),
          recipientUserId: companyId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};
