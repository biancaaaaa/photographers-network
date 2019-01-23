import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import {Link} from 'react-router-dom';

const dateOption = {year: 'numeric', month: 'long', day: 'numeric'};

class NotificationBox extends React.Component {
  state = {
    links: [
      {
        name: 'New',
        active: true
      },
      {
        name: 'Unread',
        active: false
      },
      {
        name: 'Archive',
        active: false
      }
    ]
  };

  /**
   * Set clicked link to active.
   *
   * @param index
   */
  handleLink = index => {
    let links = [...this.state.links];
    links = links.map(link => {
      link.active = false;
      return link;
    });
    links[index].active = true;
    this.setState({links});
  };

  render() {
    const {notifications, closeHandler, showBox} = this.props;
    const {links} = this.state;
    // figure out, what's the active link
    const activeLink = links.filter(link => link.active)[0];

    // show loading, if notifications are not loaded yet
    if (!isLoaded(notifications)) return <p>Loading...</p>;
    // sort notifications descending according to the created date
    notifications.sort((a,b) =>  b.createdAt - a.createdAt);
    // figure out, which notes to show
    let notesToShow = notifications;
    if (activeLink.name === 'Unread')
      notesToShow = notifications.filter(note => !note.read);
    return (
      <div className="notification-box" style={!showBox ? {height: 0} : {height: 'calc(100vh - 70px)'}}>
        <div className="notification-header">
          {
            links.map((link, key) => (
              <div key={key}
                   className={`header-link ${link.active && 'active'}`}
                   onClick={() => this.handleLink(key)}
              >
                {link.name}
              </div>
            ))
          }
        </div>
        <ul className="notification-list">
          {
            notesToShow.map(note => (
              <li className="notification" key={note.id}>
                <Link to={note.link} className="notification-title" onClick={closeHandler}>{note.title}</Link>
                <p className="notification-date">{new Date(note.createdAt).toLocaleString("en-US", dateOption)}</p>
              </li>
            ))
          }
        </ul>
        <div className="close-icon" onClick={closeHandler}>x</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.firestore.ordered.notifications,
  auth: state.firebase.auth
});

export default compose(
  connect(
    mapStateToProps
  ),
  firestoreConnect(props => [
    {
      collection: "notifications",
      where: [["recipientUserId", "==", props.auth.uid]]
    }
  ])
)(NotificationBox);