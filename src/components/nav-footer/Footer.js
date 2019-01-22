import React from "react";
import {LinkLists} from "../LinkLists";
import {InstagramSVG} from "../../components/svg/InstagramSVG";
import {TwitterSVG} from "../../components/svg/TwitterSVG";
import {FacebookSVG} from "../../components/svg/FacebookSVG";
import {GlobuzzerSVG} from "../svg/GlobuzzerSVG";
import LogoURL from "../../logo.png";

export const GbFooter = ({links}) => {
  const socialMedias = [
    {
      icon: (
        <InstagramSVG classes="gb-icon-fill-white gb-icon-small"/>
      ),
      link: "#"
    },
    {
      icon: (
        <TwitterSVG classes="gb-icon-fill-white gb-icon-small"/>
      ),
      link: "#"
    },
    {
      icon: (
        <FacebookSVG classes="gb-icon-fill-white gb-icon-small"/>
      ),
      link: "#"
    }
  ];
  return (
    <div className="gb-footer gb-background-grey">
      <div className="footer-wrapper">
        <div className="logo-container">
          <img src={LogoURL} alt="logo"/>
          <p>Powered by</p>
          <GlobuzzerSVG classes="gb-icon-fill-white"/>
        </div>
        <ul className="footer-nav">
          {links && (
            <LinkLists
              links={links}
              txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
              liClasses="footer-nav-item"
            />
          )}
        </ul>
        <ul className="footer-social-media-list">
          {socialMedias && (
            <LinkLists
              links={socialMedias}
              liClasses="footer-social-media-item"
            />
          )}
        </ul>
        <div className="footer-rights-reserved">
          <p className="gb-label gb-text-black-opacity-30">
            © 2018 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
