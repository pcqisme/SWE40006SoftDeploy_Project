import React from 'react';

const HamMenu = ({ className="" } : { className?: string }) => {
  return (
    <button className={`p-2 hover:bg-dev-blue/15 rounded-md ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img"
           aria-labelledby="al7ocug2x4nuahm5gl9z58h6pwhto6ey" className=""><title
        id="al7ocug2x4nuahm5gl9z58h6pwhto6ey">Navigation menu</title>
        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
      </svg>
    </button>
  );
};

export default HamMenu;
