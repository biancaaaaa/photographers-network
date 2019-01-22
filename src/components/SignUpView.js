import React from "react";
import { Spring } from "react-spring";

import { checkSignUpForm } from "../helper functions/checkSignupForm";
import { EmailSVG } from "./svg/EmailSVG";
import { PasswordSVG } from "./svg/PasswordSVG";
import { NameInputSVG } from "./svg/NameInputSVG";
import { InputField } from "./form/InputField";
import PropTypes from "prop-types";

export const SingUpView = ({
  stepHandler,
  firstName,
  lastName,
  changeHandler,
  password,
  password2,
  type,
  email,
  companyName
}) => {
  const correctCompleted = checkSignUpForm({
    type,
    firstName,
    lastName,
    companyName,
    email,
    password,
    password2
  });
  return (
    <Spring delay={100} from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <div style={props}>
          {type === "photographer" ? (
            <div>
              <InputField
                svg={
                  <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
                }
                value={firstName}
                changeHandler={changeHandler}
                type="text"
                name="firstName"
                placeholder="First name"
              />
              <InputField
                svg={
                  <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
                }
                value={lastName}
                changeHandler={changeHandler}
                type="text"
                name="lastName"
                placeholder="Last name"
              />
            </div>
          ) : (
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
              }
              value={companyName}
              changeHandler={changeHandler}
              type="text"
              name="companyName"
              placeholder="Company name"
            />
          )}
          <InputField
            svg={
              <EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={email}
            changeHandler={changeHandler}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <InputField
            svg={
              <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={password}
            changeHandler={changeHandler}
            type="password"
            name="password"
            placeholder="Password"
          />
          <InputField
            svg={
              <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={password2}
            changeHandler={changeHandler}
            type="password"
            name="password2"
            placeholder="Repeat password"
          />
          <button
            className="gb-btn gb-btn-transparent"
            onClick={() => stepHandler(2)}
            disabled={!correctCompleted}
          >
            Next
          </button>
        </div>
      )}
    </Spring>
  );
};

SingUpView.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
