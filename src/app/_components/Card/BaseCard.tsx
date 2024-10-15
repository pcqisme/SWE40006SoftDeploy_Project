import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const BaseCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`rounded-md p-3 bg-white border ${className}`}>
      {children}
    </div>
  );
};

export default BaseCard;