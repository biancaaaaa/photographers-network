import React from "react";
import PropTypes from 'prop-types';

import searchIconURL from '../../svg/search-icon-white.png';

export const SearchInput = ({placeholder, searchHandler, changeHandler, value, name}) => {
  return (
    <form className="gb-search-form" onSubmit={(e) => searchHandler(e, value)}>
      <div className="input-container">
        <input type="text" className="search-input" placeholder={placeholder} value={value}
               onChange={changeHandler} name={name}/>
        <img src={searchIconURL} alt="search" className="search-icon"/>
      </div>
    </form>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: 'Search...'
};