function AccoutCreated({ label, forPass, ...props }) {
    return (
      <label
        {...props}
        className={`text-md items-start w-96 pb-4 pt-4 ${
          forPass ? 'text-blue-500 font-semibold' : 'text-slate-200 font-light'
        }`}
      >
        {label}
      </label>
    );
  }
  
  export default AccoutCreated;
  