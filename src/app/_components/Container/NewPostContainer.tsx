import React from 'react';
import {type ContainerProps} from "~/app/_components/Container/ContentContainer";

const NewPostContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-center mx-auto max-w-1380px pt-14 h-full">
      {children}
    </div>
  );
};

export default NewPostContainer;
