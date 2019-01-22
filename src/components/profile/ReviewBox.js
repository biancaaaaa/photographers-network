import React from "react";
import { Avatar } from "../label/Avatar";
import { ArrowSVG } from "../svg/ArrowSVG";
import PropTypes from "prop-types";

export const ReviewBox = ({ title, userImageURL, name, quote }) => (
  <div className="review-box">
    <h2 className="review-box-title">{title}</h2>
    <Avatar userImageUrl={userImageURL} />
    <h3 className="review-author-name">{name}</h3>
    <p className="review-author-quote">“{quote}”</p>
    <ArrowSVG classes="gb-icon-medium" />
  </div>
);

ReviewBox.propTypes = {
  title: PropTypes.string.isRequired,
  userImageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired
};
