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
          link: "/dashboard/upcoming-jobs/photographer"
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
          link: "/dashboard/upcoming-jobs/company"
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
