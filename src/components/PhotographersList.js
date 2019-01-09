import React from "react";
import {Photographer} from "../contents/company/dashboard/Photographer";

export const PhotographersList = ({ list }) => {
  if (list.length === 0) {
    return <h2 className="dashboard-container white-container">No photographers in this region!</h2>;
  }

  return (
    <ul className="photographers-list white-container">
      {list.map(el => {
        return (
          <Photographer
            key={el.uid}
            uid={el.uid}
            profileImageUrl={el.profileImageUrl}
            firstName={el.firstName}
            lastName={el.lastName}
            locations={el.locations}
            description={el.description}
            showHireBtn={true}
          />
        );
      })}
    </ul>
  );
};
