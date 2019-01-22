import React, { Component } from "react";
import Home50hCard from "../../../components/Home50hCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { TextTopGalleryBottomSection } from "../../../components/home/TextTopGalleryBottomSection";
import { PartenersList } from "../../../components/PartenersList";
import { ReviewBox } from "../../../components/profile/ReviewBox";
import GallerySlider from "../../../components/GallerySlider";

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

class Home extends Component {
  state = {
    showModal: false
  };

  showThisModal = modalName => {
    this.setState({
      showModal: modalName
    });
  };

  render() {
    if (this.props.auth.uid) return <Redirect to="/dashboard" />;
    return (
      <div className="home-page">
        <div className="header">
          <Home50hCard
            backgroundUrl="https://images.unsplash.com/photo-1516807947649-1054add6bc97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11be05062d1f7ba80ca7d217e0aa241f&auto=format&fit=crop&w=1049&q=80"
            paragraphContent="Find the job that suits you and get the job done."
            titleContent="Photographer"
            type="photographer"
          />
          <Home50hCard
            backgroundUrl="https://images.unsplash.com/photo-1523871762770-87bda6d9ab58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=651c083bb21d6ff0ef6eaa4136cbef56&auto=format&fit=crop&w=1185&q=80"
            paragraphContent="Find the Photographer that suits you and get the job done."
            titleContent="Company"
            type="company"
          />
        </div>
        <TextTopGalleryBottomSection
          header="How to section"
          paragraph="Explanations on how to hire a photographer, and better selectionmethods : define the needs"
        >
          <GallerySlider />
        </TextTopGalleryBottomSection>
        <TextTopGalleryBottomSection
          header="Our parteners"
          paragraph="Together with our parteners, Globuzzer caters to the needs of travelers, students and expats needs"
        >
          <PartenersList />
        </TextTopGalleryBottomSection>
        <ReviewBox
          title="LAST REVIEW"
          userImageURL="https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          quote="New battery for smartphones can be charged in a minute"
          name="John Doe"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
