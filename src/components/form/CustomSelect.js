import React from "react";
import PropTypes from 'prop-types';

export const CustomSelect = ({ optionsList, optionSelectHandler, showCustomSelect }) => (
	<ul className="custom-select-dropdown" style={{ display: showCustomSelect ? 'block' : 'none' }}>
		{
			optionsList.map((el) => (
				<li key={el} onClick={() => optionSelectHandler(el)} className='custom-select-option'>{el}</li>
			))
		}
	</ul>
);

CustomSelect.propTypes = {
	optionsList : PropTypes.array.isRequired,
	optionSelectHandler : PropTypes.func.isRequired, 
	showCustomSelect : PropTypes.bool
};