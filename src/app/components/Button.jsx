import React from 'react';

const ButtonSubmit = ({ text, ...props }) => {
  return (
    <button {...props} className="bg-blue-700 text-white font-medium rounded-md h-10 w-96">
      {text}
    </button>
  );
};

export default ButtonSubmit;