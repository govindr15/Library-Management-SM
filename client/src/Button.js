import React from "react";

function Button({ name, children, onClick, type, disabled = false }) {
  if (children) {
    return (
      <button
        class={`bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {`${name ? name : "button"}`}
        {children}
      </button>
    );
  }
  return (
    <button
      className={`bg-blue-400 hover:bg-blue-700 text-white text-sm font-bold px-4 rounded-full mx-2`}
      type={type}
      onClick={onClick}
    >{`${name ? name : "button"}`}</button>
  );
}

export default Button;
