import React, { Component } from "react";
import GbNavBar from "../components/gbNav";
import { SearchInput } from "../components/SearchInput";
import { GbFooter } from "../components/Footer";
import { InstagramSVG } from "../components/svg/InstagramSVG";
import { TwitterSVG } from "../components/svg/TwitterSVG";
import { FacebookSVG } from "../components/svg/FacebookSVG";
import fire from "../config/Fire";
import { PhotographerResults } from "../components/PhotographerResults";

export default class SearchPhotographer extends Component {
  state = {
    searchValue: "",
    photographerResults: []
  };
  database = fire.database().ref();


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  search = (e, location) => {
    e.preventDefault();
    let photographers = [];
    this.database.child("locations").child(location).child("photographer").once("value")
      .then(snapshots => {
        snapshots.forEach(snap => {
          let data = snap.val();
          photographers.push({
            uid: snap.key,
            photoURL: data.photoURL,
            displayName: data.displayName,
            location: location
          });
        });
      })
      .then(() => {
        this.setState({ photographerResults: photographers });
      });
  };

  logout = () => {
    fire.auth().signOut();
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className='search-photographer section-content normalized'>
          <GbNavBar
            righLinks={this.props.user ? [{txt: 'Sign out', clickHandler: this.logout}] : ([{
              txt: 'Sign in',
              link: 'signIn'
            }])
            }
            loggedIn={false}
          />
          <h1 className="gb-title-medium">Search for a photographer in</h1>
          <SearchInput name="searchValue" value={this.state.searchValue}
                       placeholder="Type in a city/location..." changeHandler={this.handleChange}
                       searchHandler={this.search}/>
          <PhotographerResults photographers={this.state.photographerResults}/>
        </div>
        <GbFooter
          socialMedias={[
            {
              icon: <InstagramSVG classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
              link: '#'
            },
            {icon: <TwitterSVG classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>, link: '#'},
            {
              icon: <FacebookSVG classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
              link: '#'
            }]}
        />
      </React.Fragment>
    );
  }
}
