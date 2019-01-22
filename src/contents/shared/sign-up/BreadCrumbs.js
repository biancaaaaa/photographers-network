import React from "react";

export const Breadcrumbs = ({ crumbsAmount, activeCrumb, clickHandler }) => {
  let crumbs = [];
  for (let i = 0; i < crumbsAmount; i++) {
    crumbs.push(
      <div
        className={`bread-crumb ${activeCrumb === i && "active"}`}
        onClick={() => clickHandler(i)}
        key={i}
      >
        <span className="bread-crumb-click-area" />
      </div>
    );
    if (i !== crumbsAmount - 1)
      crumbs.push(<div className="space-line" key={`line-${i}`} />);
  }
  return <div className="bread-crumb-container">{crumbs}</div>;
};
