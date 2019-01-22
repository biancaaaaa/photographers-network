import React from "react";
import { NameInputSVG } from "../../../components/svg/NameInputSVG";
import { InputField } from "../../../components/form/InputField";
import AvatarInput from "./AvatarInput";
import LocationSearchInput from "../MapsAutocomplete";

export const ProfileEditView = ({
  updateUserHandler,
  type,
  uid,
  firstName,
  lastName,
  companyName,
  changeHandler,
  locationPlaceholder,
  photoURL,
  iban,
  bic
}) => (
  <div className="red-bg">
    <h2 className="black-bg-header">Edit your profile</h2>
    <form onSubmit={updateUserHandler} className="dashboard-container white-container">
      {type === "company" ? (
        <InputField
          svg={
            <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
          }
          value={companyName}
          changeHandler={changeHandler}
          type="text"
          name="companyName"
          placeholder="Change the company name"
        />
      ) : (
        <React.Fragment>
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={firstName}
            changeHandler={changeHandler}
            type="text"
            name="firstName"
            placeholder="Change your first name"
          />
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={lastName}
            changeHandler={changeHandler}
            type="text"
            name="lastName"
            placeholder="Change your last name"
          />
        </React.Fragment>
      )}
      <LocationSearchInput
        locationPlaceholder={locationPlaceholder}
        changeHandler={changeHandler}
      />
      <p className="small-bold-centered">change photo:</p>
      <AvatarInput uid={uid} userAvatar={photoURL} name="avatar" />
      <div className="btn-container">
        <input
          type="submit"
          value="Save"
          className="gb-btn gb-btn-large gb-btn-primary"
        />
      </div>
    </form>
  </div>
);
/*
      <InputField
        svg={
          <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
        }
        value={location}
        changeHandler={changeHandler}
        type="text"
        name="location"
        placeholder="change your location"
      />
      */
