import React from 'react';

const UserProfileIcon = ({ profileImg }: { profileImg: string | null | undefined }) => {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-full h-[30px] w-[40px]" src={profileImg ?? "/devto_ic.svg"} alt="profile"/>
    </div>
  );
};

export default UserProfileIcon;