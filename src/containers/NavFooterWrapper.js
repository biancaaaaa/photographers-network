import React, {Component} from "react";
import fire from '../config/Fire';
import GbNavBar from '../components/gbNav';
import {GbFooter} from "../components/Footer";
import {InstagramSVG} from "../components/svg/InstagramSVG";
import {TwitterSVG} from "../components/svg/TwitterSVG";
import {FacebookSVG} from "../components/svg/FacebookSVG";

export const NavFooterWrapper = WrappedComponent => {
  return class extends Component {
    
    state = {
      userOn : false,
      links : [{txt: 'Home' , link:'home' , nav:true},{txt: 'Jobs' , link:'jobs' , nav:true},{txt: 'Sign in', link: 'signIn'}]
    }

    componentDidMount(){
      this.updateLinks(this.props.user)
    }


    updateLinks = (user) => {
      if(user){
        if(user.type=='company'){
          this.setState(()=>({
            userOn : true,
            links : [
              {txt: 'Dashboard' , link: 'dashboard' , nav:true},
              {txt: 'Sign out', clickHandler : this.logout}]
          }))
        }else{
          this.setState(()=>({
            userOn : true,
            links : [
              {txt: 'Dashboard' , link: 'dashboard' , nav:true},
              {txt: 'Sign out', clickHandler : this.logout}]
          }))
        }
      }else{
        this.setState(()=>({
          userOn : false,
          links : [
            {txt: 'Home' , link:'home' , nav:true},
            {txt: 'Jobs' , link:'jobs' , nav:true},
            {txt: 'Sign in', link: 'signIn'}
          ]
        }))
      }
    }

    componentWillReceiveProps(nextProps){
      this.updateLinks(nextProps.user)
    }

    logout = () => {
      fire.auth().signOut();
      this.props.history.replace('/');
    };

    render() {
      return (
        <React.Fragment>
          <GbNavBar
            righLinks={
              this.state.links
            }
            loggedIn={false}
          />
          <WrappedComponent {...this.props}/>
          <GbFooter
            socialMedias={[
              {
                icon: <InstagramSVG
                  classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>, link: '#'
              },
              {
                icon: <TwitterSVG
                  classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
                link: '#'
              },
              {
                icon: <FacebookSVG
                  classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
                link: '#'
              }]}
          />
        </React.Fragment>
      );
    }
  }
};