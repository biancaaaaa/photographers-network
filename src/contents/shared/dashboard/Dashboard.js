// dependencies
import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { DashboardView } from "../../../components/dashboard/DashboardView";

class Dashboard extends Component {
  state = {
    photographer: {
      headerLinks: [
        {
          name: "Upcoming Jobs",
          link: "/dashboard/upcoming-jobs"
        },
        {
          name: "Payout",
          link: "/dashboard/payout/photographer"
        },
        {
          name: "Billing information",
          link: "/dashboard/billing-information"
        },
        {
          name: "Recent jobs",
          link: "/dashboard/recent-jobs"
        }
      ]
    },
    company: {
      headerLinks: [
        {
          name: "Upcoming Jobs",
          link: "/dashboard/upcoming-jobs"
        },
        {
          name: "Payout",
          link: "/dashboard/payout/company"
        },
        {
          name: "Billing information",
          link: "/dashboard/billing-information"
        },
        {
          name: "Photographer",
          link: "/dashboard/photographer"
        }
      ]
    }
  };

  /**
   * Sets the clicked element to active.
   * @param name
   * @param type
   */
  setComponentToShow = (name, type) => {
    const activeType = this.state[type];
    let headerLinks = [...activeType.headerLinks];
    headerLinks.forEach(link => {
      link.active = link.name === name;
    });
    this.setState({ [type]: { headerLinks } });
  };

  render() {
    const { profile, auth } = this.props;
    let activeType = "";
    let activeComponent = "";
    if (!profile.isEmpty) {
      activeType = this.state[profile.type];
      activeType.headerLinks.map(link => {
        if (link.active) activeComponent = link.name;
        return null;
      });
    }
    return (
      <DashboardView
        type={profile.type}
        profile={profile}
        auth={auth}
        {...this.props}
        linkHandler={this.setComponentToShow}
        headerLinks={activeType.headerLinks}
        activeComponent={activeComponent}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(Dashboard);
