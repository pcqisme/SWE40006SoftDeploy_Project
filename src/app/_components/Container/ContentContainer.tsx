import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

const ContentContainer : React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center mx-auto p-2 lg:p-4 max-w-1380px h-full">
      {children}
    </div>
  );
};

export default ContentContainer;