import React from 'react';

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isRequired,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className=" text-white/[0.8] mb-2 tracking-wider">
        {labelName} {isRequired && <span className="text-xs">(required)</span>}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={handleChange}
          rows={4}
          placeholder={placeholder}
          className="mb-5 py-[15px] sm:px-[25px] px-[15px] border border-white/[0.1] bg-[#0B0B0B]
           placeholder:text-white/[0.4] rounded-xl "
        />
      ) : (
        <input
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="mb-5 py-[15px] sm:px-[25px] px-[15px] border border-white/[0.1] bg-[#0B0B0B]
          placeholder:text-white/[0.4] rounded-xl"
        />
      )}
    </div>
  );
};

export default FormField;
