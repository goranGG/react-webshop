import React from "react";
import "./form-input.styles.scss";

export const FormInput = (props) => {
  const { label, ...otherProps } = props;
  return (
    <div className="group">
      <input {...otherProps} className="form-input" />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
