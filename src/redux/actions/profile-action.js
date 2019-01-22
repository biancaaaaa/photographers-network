import {
  actionError,
  actionStarted,
  actionSuccess
} from "./generalLoadingErrorSucces-actions";

// -------------------- ASYNC ACTIONS THUNK -------------------- //
/**
 * Updates concerning user info, depending,
 * if company or photographer.
 *
 * @param firstName
 * @param lastName
 * @param detailedAddress
 * @param companyName
 * @param type
 * @param homeAddressId
 * @param userLocations
 * @returns {function(*, *, {getFirestore: *})}
 */
export const updateUserInfo = (firstName,
                               lastName,
                               detailedAddress,
                               companyName,
                               type,
                               homeAddressId,
                               userLocations) => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    dispatch(actionStarted());
    const firestore = getFirestore();
    const firebase = getFirebase();

    let infoToUpdate = {};

    //if it is company add
    if (type === "company") {
      infoToUpdate = {
        ...infoToUpdate,
        companyName
      };
    }
    //if it is photographer add
    else {
      infoToUpdate = {
        ...infoToUpdate,
        firstName,
        lastName
      };
    }

    //if the home adress was change, update it
    if (detailedAddress) {
      //extract the lat and long, in order to
      const {lat, long, ...restAdressData} = detailedAddress;

      infoToUpdate = {
        ...infoToUpdate,
        locations: {
          ...userLocations,
          [String(homeAddressId)]: {
            ...restAdressData,
            streetNumber: detailedAddress.streetNumber || null,
            home: true,
            geolocation: new firebase.firestore.GeoPoint(lat, long)
          }
        }
      };
    }

    return firestore
      .collection("users")
      .doc(getState().firebase.auth.uid)
      .update({
        ...infoToUpdate
      })
      .then(() => {
        dispatch(actionSuccess(infoToUpdate));
      })
      .catch(err => dispatch(actionError(err)));
  };
};

/**
 * Updates the profile picture.
 *
 * @param file
 * @param userId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const updatePhotoURL = (file, userId) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      const storageRef = await getFirebase()
        .storage()
        .ref(`${userId}/avatar`);
      const task = await storageRef.put(file);
      const url = await task.ref.getDownloadURL();
      return await getFirestore()
        .collection("users")
        .doc(userId)
        .set({profileImageUrl: url}, {merge: true});
    } catch (err) {
      return new Promise((resolve, reject) => reject(err));
    }
  };
};

/**
 * Sets the bank credentials of a user.
 *
 * @param bankCredentials
 * @returns {function(*, *, {getFirestore: *})}
 */
export const setBankCredentials = bankCredentials => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore
      .collection("users")
      .doc(getState().firebase.auth.uid)
      .update({bankCredentials})
      .then(() => {
        dispatch(actionSuccess(bankCredentials));
      })
      .catch(err => dispatch(actionError(err)));
  };
};

export const setDescription = description => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore
      .collection("users")
      .doc(getState().firebase.auth.uid)
      .update({description})
      .then(() => {
        dispatch(actionSuccess(description));
      })
      .catch(err => dispatch(actionError(err)));
  }
};

/**
 * Make a photographer premium
 * @param uid
 */
export const markAsPremium = uid => (dispatch, getState, {getFirestore}) =>
  getFirestore()
    .collection("users")
    .doc(uid)
    .update({
      premium: true
    });
