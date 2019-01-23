import React, {Component} from "react";
import PropTypes from 'prop-types';

export const FilterContainer = ({
                                  filters,
                                  activeFilters,
                                  toggleFilterHandler,
                                  toggleSortContainer,
                                  showSortItems
                                }) => (
  <div className="grey-bg-header">
    <div className="sort-container">
      <h2>Filter by</h2>
      <div className="active-filter-container">
        {
          activeFilters.map(filter => (
            <div onClick={() => toggleFilterHandler(filter.value)}
                 className="sort-item"
                 key={filter.value}>
              <span>{filter.name}</span> x
            </div>
          ))
        }
      </div>
      <div className={`add-icon ${showSortItems && 'turned'}`} onClick={toggleSortContainer}>+</div>
    </div>
    <div className="sort-items" style={showSortItems ? {height: '42px'} : {height: 0}}>
      {
        filters.map(filter => (
          <div key={filter.value} onClick={() => toggleFilterHandler(filter.value)}
               className={`sort-item ${filter.active && 'active'}`}>{filter.name}</div>
        ))
      }
    </div>
  </div>
);

FilterContainer.propTypes = {
  filters: PropTypes.array.isRequired,
  activeFilters: PropTypes.array.isRequired,
  toggleFilterHandler: PropTypes.func.isRequired,
  toggleSortContainer: PropTypes.func.isRequired,
  showSortItems: PropTypes.bool.isRequired
};