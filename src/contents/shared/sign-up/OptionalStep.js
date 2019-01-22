import React from "react";
import { Spring } from "react-spring";
import LocationSearchInput from "../../../contents/shared/MapsAutocomplete";
import { CustomSelect } from "../../../components/form/CustomSelect";
import { NameInputSVG } from "../../../components/svg/NameInputSVG";
import { ArrowDown } from "../../../components/svg/ArrowDown";

export const OptionalStep = ({
  type,
  handleChange,
  locationPlaceholder,
  photographerType,
  showCustomSelect,
  showCustomSelectHandler,
  optionSelectHandler,
  loadingDB,
  successDB
}) => (
  <Spring delay={100} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {props => (
      <div style={props}>
        <p className="small">
          Add your location and the type of photographer you are and search the
          best jobs opportunities
        </p>
        <LocationSearchInput
          locationPlaceholder={locationPlaceholder}
          changeHandler={handleChange}
        />
        {type === "photographer" && (
          <div
            className="custom-select gb-text-input gb-text-input-trans-background"
            onClick={showCustomSelectHandler}
          >
            <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            {photographerType === "" ? "Select type" : photographerType}
            <CustomSelect
              showCustomSelect={showCustomSelect}
              optionsList={["Landscape", "Portrait", "Action"]}
              optionSelectHandler={optionSelectHandler}
            />
            <ArrowDown classes="gb-icon gb-icon-medium gb-icon-white inputIcon dropdown-arrow" />
          </div>
        )}
        <input
          type="submit"
          value="Skip this step"
          className="white-text-link"
        />
        {loadingDB ? (
          <input
            type="submit"
            value="Loading..."
            style={{ opacity: 0.8 }}
            disabled={true}
            className="gb-btn gb-btn-transparent"
          />
        ) : successDB ? (
          <input
            type="submit"
            value="Success"
            disabled={true}
            className="gb-btn gb-btn-transparent"
          />
        ) : (
          <input
            type="submit"
            value="Confirm"
            className="gb-btn gb-btn-transparent"
          />
        )}
      </div>
    )}
  </Spring>
);
