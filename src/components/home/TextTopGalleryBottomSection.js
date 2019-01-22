import React from "react";
import PropTypes from "prop-types";

export const TextTopGalleryBottomSection = ({
  header,
  paragraph,
  children
}) => (
  <div className="text-top-gallery-bottom-section">
    <div className="section-text">
      <h2 className="section-header">{header}</h2>
      {paragraph && <p className="section-paragraph">{paragraph}</p>}
    </div>
    {children && children}
  </div>
);

TextTopGalleryBottomSection.propTypes = {
  header: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  children: PropTypes.object
};
