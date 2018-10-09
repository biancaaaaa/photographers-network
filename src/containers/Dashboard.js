import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import fire from '../config/Fire';
import { DashboardViewWithNav } from "../components/dashboardComponents/DashboardView";

export default class Dashboard extends Component {
  state = {
    photographer: {
      headerLinks: [
        {
          name: "Home",
          active: true
        },
        {
          name: "Applied Jobs",
          active: false}
      ]
    },
    company: {
      headerLinks: [
        {
          name: "Home",
          active: true
        },
        {
          name: "My Jobs",
          active: false
        },
      ]
    },
  };
  database = fire.database().ref();

  setComponentToShow = (name, type) => {
    const activeType = this.state[type];
    let headerLinks = [...activeType.headerLinks];
    headerLinks.forEach(link => {
      link.active = link.name === name;
    });
    this.setState({ [type]: { headerLinks } });
  };

  render() {
    const { user, loading } = this.props;
    let activeType = '';
    let activeComponent = '';
    if (!loading && user) {
      activeType = this.state[user.type];
      activeType.headerLinks.map((link) => {
        if (link.active) activeComponent = link.name;
      });
    } 
    
    return (
      <React.Fragment>
        {
          loading === false ? (
            user ? (
              <DashboardViewWithNav
                type={user.type}
                user={user}
                {...this.props}
                linkHandler={this.setComponentToShow}
                headerLinks={activeType.headerLinks}
                activeComponent={activeComponent}
                loading={loading}
              />
            ) : (
              <Redirect to='/' />
            )
          ) : (
            <LoadingPage />
          )
        }
      </React.Fragment>
    );
  }
}