import React from "react";
import { Link } from "react-router-dom";

export const GbNavRight = ({ user }) => (
  <div className="right-content">
    {user.uid ? (
      <Link
        style={{ backgroundImage: `url(${user.profileImageUrl})` }}
        to={`/profile/${user.uid}`}
        className="gb-avatar-small gb-avatar nav-user-avatar"
      />
    ) : (
      <Link
        className="gb-text-capitalize gb-text-white gb-paragraph-memdium"
        to="/signin"
      >
        Sign in
      </Link>
    )}
  </div>
);
