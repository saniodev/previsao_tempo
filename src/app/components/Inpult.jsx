import React, { useState } from "react";

function InputLabel({ onChange, ...props }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <input
      value={inputValue}
      onChange={handleInputChange}
      type="text"
      {...props}
      className="text-white font-light mt-0 mb-6 bg-slate-800 w-96 h-10 rounded-md focus:border-2 focus:border-solid focus:border-slate-900 p-2"
    />
  );
}

export default InputLabel;
