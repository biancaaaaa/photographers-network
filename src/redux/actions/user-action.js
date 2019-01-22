import fire from "../../config/Fire";
import {
  actionStarted,
  actionError,
  actionSuccess,
} from "./generalLoadingErrorSucces-actions";

// -------------------- ASYNC ACTIONS THUNK -------------------- //
/**
 * Signs user out.
 *
 * @returns {function(*)}
 */
export function signOutUser() {
  return dispatch => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("user is out");
      })
      .catch(err => {
        console.log("some error with the signOut, in action");
        console.error(err);
        dispatch(actionError(err));
      });
  };
}

/**
 * Signs user in.
 *
 * @param email
 * @param password
 * @returns {function(*)}
 */
export function signUserInAsync(email, password) {
  return dispatch => {
    //Set loading to true
    dispatch(actionStarted());

    //Send the request to firebase, and wait for response
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //If it succed turn succes to true and loading false
        dispatch(actionSuccess());
      })
      .catch(() => dispatch(actionError()));
  };
}

/**
 * Signs up a new user
 *
 * @param newUser
 * @returns {function(*, *, {getFirebase: *, getFirestore: *})}
 */
export const sigUpUser = newUser => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(actionStarted());

    const firebase = getFirebase();
    const firestore = getFirestore();

    const detailedAddress = newUser.detailedAddress;
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        let userInformations = {
          type: newUser.type,
          profileImageUrl:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          uid: resp.user.uid,
          locations: {
            [new Date().getTime()]: {
              city: detailedAddress.city,
              streetName: detailedAddress.streetName,
              country: detailedAddress.country,
              geolocation: new firebase.firestore.GeoPoint(
                detailedAddress.lat,
                detailedAddress.long
              ),
              home: true,
              streetNumber: detailedAddress.streetNumber || null
            }
          }
        };

        if (newUser.type === "photographer") {
          userInformations = {
            ...userInformations,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            photographerType: newUser.photographerType
          };
        } else {
          userInformations = {
            ...userInformations,
            companyName: newUser.companyName
          };
        }
        console.log(userInformations);
        console.log("here");

        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set(userInformations);
      })
      .then(() => {
        console.log("succes?");
        dispatch(actionSuccess());
      })
      .catch(err => {
        console.log(err);
        dispatch(actionError(err));
      });
  };
};
