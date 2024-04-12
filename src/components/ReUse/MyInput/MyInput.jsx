import React from 'react';

function MyInput(props) {
  const { type, value, onChange, placeholder, className } = props;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      style={{
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '350px',
        boxSizing: 'border-box',
      }}
    />
  );
}

export default MyInput;