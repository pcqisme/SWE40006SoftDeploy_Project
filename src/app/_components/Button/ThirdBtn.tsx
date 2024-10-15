import React from 'react';
import {type ButtonProps} from "~/app/_components/Button/PrimaryBtn";

const ThirdBtn: React.FC<ButtonProps> = ({ children, onClick, className="" }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-base hover:bg-white hover:text-[#3b49df] ${className}`}
    >
      {children}
    </button>
  );
};

export default ThirdBtn;