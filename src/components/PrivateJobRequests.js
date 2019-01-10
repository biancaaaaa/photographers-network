import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import PrivateJobFunctionality from "../contents/company/private-job/PrivateJobFunctionality";

const PrivateJobRequest = props => {
  const { user, location } = props;
  /* Initial check to see if this is the correct user(photographer) */
  let userQueryId = queryString.parse(location.search).user;
  console.log(location);
  const correctUser = true; //userQueryId === user.uid;

  return correctUser ? (
    <PrivateJobFunctionality {...props} />
  ) : (
    <h2>What are you doing in here, this is not the place to be!</h2>
  );
};

const mapStateToProps = state => ({
  user: state.firebase.profile
});

export default connect(mapStateToProps)(PrivateJobRequest);
