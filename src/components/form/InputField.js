import React from "react";
import {PropTypes} from 'prop-types';

export const InputField = ({
  svg,
  value,
  changeHandler,
  type,
  name,
  placeholder,
  min,
  max,
  onFocus,
  onBlur
}) => {
  return (
    <div className='inputWrapper'>
      <label className='inputLabel'>
        {svg}
        <input
          value={value}
          onChange={changeHandler}
          type={type}
          name={name}
          className="gb-text-input gb-text-input-trans-background"
          placeholder={placeholder}
          min={min}
          max={max}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

InputField.propTypes = {
  svg : PropTypes.object,
  value : PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
  changeHandler : PropTypes.func.isRequired,
  type : PropTypes.string.isRequired,
  name : PropTypes.string,
  placeholder : PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  min : PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  max : PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
}

InputField.defaultProps = {
  min : undefined,
  max : undefined,
}