import React, { Component } from "react";
import { connect } from "react-redux";
import ReactGA from "react-ga";

import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

function initializeReactGA() {
  ReactGA.initialize("UA-130910738-1");
}

class App extends Component {
  componentDidMount() {
    initializeReactGA();
  }
  render() {
    const { auth, profile } = this.props;
    if (profile.isLoaded) {
      return <Routes userOn={auth.uid} userType={profile.type} />;
    } else {
      return <h2>STILL LOADING FOR THE PROFILE DATA... HANG ON!</h2>;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(App);
