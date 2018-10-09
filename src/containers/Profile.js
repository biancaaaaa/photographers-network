import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import fire from '../config/Fire';
import {ProfileCard} from "../components/ProfileCard";
import {LinkLists} from "../components/LinkLists";
import PhotographerContent from "./PhotographerContent";
import CompanyContent from "./CompanyContent";
import LoadingPage from "../components/LoadingPage";
import {NavFooterWrapper} from "./NavFooterWrapper";


class Profile extends Component {
  state = {
    pageLinks: [
      {txt: "Facebook", link: "www.facebook.com"},
      {txt: "Twitter", link: "www.twitter.com"}
    ],
    uid: this.props.match.params.uid || '',
    fetchedUserData: false,
    userData: null,
  };
  database = fire.database().ref();

  componentDidMount() {
    this.fetchUserInformation();
  }

  fetchUserInformation = () => {
    const {uid} = this.state;
    this.database.child('users').child(uid).once('value')
      .then(snap => {
        if(!snap.exists()) {
          this.props.history.replace('/');
          return -1;
        }
        let data = snap.val();
        let userData = {
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
          type: data.type,
        };
        this.setState({userData: userData, fetchedUserData: true});
      });
  };

  render() {
    const {user, loading} = this.props;
    const {fetchedUserData, userData, uid, pageLinks} = this.state;

    let otherUser = true;
    let loaded = false;
    let currUser = null;

    if (!loading && fetchedUserData) {
      if (user) {
        otherUser = user.uid !== uid;
      }
      currUser = userData;
      loaded = true;
      console.log("loaded everything!");
    }

    return (
      <React.Fragment>
        {
          loaded ?
            (user ?
              (
                <ProfileView user={currUser}
                             isOtherUser={otherUser}
                             logoutHandler={this.logout}
                             pageLinks={pageLinks}
                             uid={uid}
                />
              ) :
              (<Redirect to="/"/>)) : (<LoadingPage/>)
        }
      </React.Fragment>
    );
  }
}

const ProfileView = ({isOtherUser, user, logoutHandler, pageLinks}) => (
  <div className='profile'>
    <ProfileCard
      backgroundImg='https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340'
      profileImg="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
      type={user.type}
    >
      {user.displayName}
    </ProfileCard>

    <div className="profile-content">
      <LinkLists links={pageLinks}
                 txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
                 liClasses="footer-nav-item"/>
    </div>

    {isOtherUser ?
      (<div>Not your own profile</div>) :
      (user.type === "photographer" ?
          (<PhotographerContent/>) :
          (<CompanyContent/>)
      )
    }
  </div>
);

export const ProfileWithNav = NavFooterWrapper(Profile);
