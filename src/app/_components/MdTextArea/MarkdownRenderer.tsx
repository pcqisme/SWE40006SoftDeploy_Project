import React from 'react';
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({children, className=""} : {children: string, className?: string}) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 className={`${className} text-[30px] font-bold`} {...props} />,
        h2: ({ node, ...props }) => <h2 className={`${className} text-[25px] font-bold`} {...props} />,
        p: ({ node, ...props }) => <p className={`${className} text-xl`} {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 