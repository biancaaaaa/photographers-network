import React from "react";
import { PropTypes } from "prop-types";
import { LinkLists } from "../LinkLists";
import { Link } from "react-router-dom";
import { RightUserOn } from "./RightUserOn";
import { connect } from "react-redux";
import { signOutUser } from "../../redux/actions/user-action";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import mainLogo from "../../logo.png";
import { BurgerMenuSVG } from "../../components/svg/BurgerMenuSVG";

class GbNavBar extends React.Component {
  state = {
    sticky: false,
    showNotificationBox: false,
    links: [{ txt: "Sign in", link: "signIn" }],
    homeLink: "home",
    userLinks: [],
    navExpanded: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.stickyNav);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.stickyNav);
  }

  stickyNav = e => {
    this.setState({
      sticky: window.pageYOffset > 0
    });
  };

  showNotificationsHandler = () => {
    this.setState(prev => {
      return {
        showNotificationBox: !prev.showNotificationBox
      };
    });
  };

  //Handle the transition of the navAside
  expandHandler = () => {
    const translated = this.state.navExpanded;
    const toBeTranslated = document.querySelector(".gb-app-wrapper");
    const body = document.querySelector("body");

    //Set the translated class to the page-wrapper as well, stop the scroll on body
    if (translated) {
      toBeTranslated.classList.remove("translated");
      body.style.overflowY = "visible";
    } else {
      toBeTranslated.classList.add("translated");
      body.style.overflowY = "hidden";
    }

    this.setState(prevState => ({
      navExpanded: !prevState.navExpanded
    }));
  };

  render() {
    const { userData: user, signOutUser, auth, profile } = this.props;
    const { navExpanded } = this.state;

    let righLinks = [{ txt: "Sign in", link: "signIn" }];
    let homeLink = "home";
    let userLinks;

    const { showNotificationBox } = this.state;
    return (
      <React.Fragment>
        <div
          className={`gb-nav-aside gb-background-black ${
            navExpanded ? "translated" : ""
          }`}
        />
        {navExpanded && (
          <div onClick={this.someClick} className="gb-app-black-overlay" />
        )}
        <div
          className={`gb-navbar ${navExpanded ? "translated" : ""} ${
            this.state.sticky ? "sticky dark-blue" : ""
          }`}
        >
          <div onClick={this.someClick} style={{ zIndex: 10 }}>
            <BurgerMenuSVG classes="gb-icon gb-icon-white gb-icon-medium" />
          </div>
          <Link to={`/${homeLink}`} className="center-content">
            <img
              src={mainLogo}
              alt="logo"
              className="gb-icon-medium gb-icon-fill-white"
            />
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const notifications = state.firestore.ordered.unreadNotifications;
  return {
    newNotifications: notifications ? notifications.length > 0 : false,
    auth: state.firebase.auth,
    userOn: state.firebase.auth.uid,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "notifications",
        where: [
          ["recipientUserId", "==", props.auth.uid],
          ["read", "==", false]
        ],
        storeAs: "unreadNotifications"
      }
    ];
  })
)(GbNavBar);

GbNavBar.propTypes = {
  righLinks: PropTypes.arrayOf(PropTypes.object),
  userImageUrl: PropTypes.string,
  profileLink: PropTypes.string
};

/*
 <ul className="right-content">
   <LinkLists
     links={righLinks}
     txtClasses="gb-text-white gb-paragraph-medium"
   />
   {auth.uid && (
     <RightUserOn
       showNotificationsHandler={this.showNotificationsHandler}
       newNotifications={this.props.newNotifications}
       showNotificationBox={showNotificationBox}
       user={user}
       userImageUrl={profile.profileImageUrl}
       userLinks={userLinks}
     />
   )}
 </ul>
*/

/*
if (auth.uid) {
     righLinks = [];
     homeLink = "dashboard";

     const company = profile.type === "company";

     let specificLinks = [
       {
         txt: company ? "Create job" : "Jobs",
         link: company ? "createJob" : "jobs"
       }
     ];

     if (company) {
       specificLinks.push({
         txt: "Search for photographers",
         link: "search-photographers"
       });
     }

     userLinks = [
       {
         txt: "Profile",
         link: `profile/${auth.uid}`
       },
       {
         txt: "Dashboard",
         link: "dashboard"
       },
       {
         txt: "Edit profile",
         link: "ProfileEdit"
       },
       {
         txt: "Payouts",
         link: `payouts/${profile.type}`
       },
       ...specificLinks,
       { txt: "Sign out", clickHandler: signOutUser }
     ];
   }
   */
