function LabelCreatedUser({ label, forPass, ...props }) {
    return (
      <label
        {...props}
        className={`text-md items-start w-96 pb-4 ${
          forPass ? 'text-blue-500 font-semibold pl-14' : 'text-white font-medium'
        }`}
      >
        {label}
      </label>
    );
  }
  
  export default LabelCreatedUser;
  