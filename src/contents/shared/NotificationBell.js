import React from "react";
import bellIconURL from '../../png-icons/bell.png';
import NotificationBox from './NotificationBox';

class NotificationBell extends React.Component {
  state = {
    showBox: false
  };

  /**
   * Toggle notification box.
   */
  toggleBox = () => {
    this.setState(prevState => ({
      showBox: !prevState.showBox
    }));
  };

  render() {
    const {showBox} = this.state;
    return (
      <React.Fragment>
        <NotificationBox showBox={showBox} closeHandler={this.toggleBox}/>
        <div className="notification-bell" onClick={this.toggleBox}>
          <img className="bellIcon" src={bellIconURL} alt="bell"/>
        </div>
      </React.Fragment>
    );
  }
}

export default NotificationBell;