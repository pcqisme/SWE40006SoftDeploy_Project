import React from 'react';
import {type ButtonProps} from "~/app/_components/Button/PrimaryBtn";

const SecondaryBtn: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`hover:underline h-[40px] text-[16px] text-black/50 hover:bg-[#3b49df]/15 rounded-md px-2 hover:text-[#3b49df] ${className}`}>
      {children}
    </button>
  );
};

export default SecondaryBtn;