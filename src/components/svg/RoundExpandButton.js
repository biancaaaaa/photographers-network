import React from "react";

export const RoundExpandButton = ({ classes, clickHandler }) => (
  <svg
    id="round-expand-button"
    viewBox="0 0 72 72"
    width="100%"
    height="100%"
    onClick={clickHandler}
    className={classes}
  >
    <title>expand button</title>
    <g>
      <path
        d="M35.863 69.226C54.2889 69.226 69.226 54.2889 69.226 35.863C69.226 17.4371 54.2889 2.5 35.863 2.5C17.4371 2.5 2.5 17.4371 2.5 35.863C2.5 54.2889 17.4371 69.226 35.863 69.226Z"
        stroke="white"
        strokeWidth="5"
      />
      <path d="M37.2021 28.384H34.4541V44.464H37.2021V28.384Z" fill="white" />
      <path d="M43.868 37.692V34.944H27.788V37.692H43.868Z" fill="white" />
    </g>
  </svg>
);
