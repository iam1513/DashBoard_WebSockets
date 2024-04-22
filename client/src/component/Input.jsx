import React from "react";

const Input = ({ placeholder, name, handleInput }) => {
  return (
    <div>
      <input
        onChange={handleInput}
        name={name}
        className="input-field"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
