import React from 'react';

import OAuthForm from "~/app/_components/Form/OAuthForm";
import DevToLogo from "~/app/_components/Icon/DevToLogo";

const Page = () => {
  return (
    <div className="grid grid-cols-3 p-10">
      <div className="col-start-2 flex justify-center">
        <DevToLogo width={60} height={48}/>
      </div>

      <div className="col-start-2 flex flex-col justify-center mt-4">
        <h1 className="font-black text-[30px] text-center">Join the DEV Community</h1>
        {/* TODO: make the number of user real time */}
        <p className="text-black/50 text-base text-center ">DEV Community is a community of 1,982,894 amazing developers</p>
      </div>

      <div className="col-start-2 mt-4 ">
        <OAuthForm isSignUp={true}/>
      </div>

    </div>
  );
};

export default Page;