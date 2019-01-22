import React from "react";
import { Spring } from "react-spring";

export const PhotographerDescription = ({ changeHandler, style }) => (
  <Spring delay={100} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {props => (
      <div style={props}>
        <p>Search for the best jobs oportunities in your area of interests.</p>
        <p>Apply for the jobs that you are interested in.</p>
        <p>
          Do the <span className="highlight">job</span>, get the
          <span className="highlight"> money</span> fast and
          <span className="highlight"> secured</span>.
        </p>
        <button
          className="gb-btn gb-btn-transparent"
          onClick={() => changeHandler(1)}
        >
          Next
        </button>
      </div>
    )}
  </Spring>
);
