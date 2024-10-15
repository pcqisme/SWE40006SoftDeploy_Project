import React from 'react';

import OAuthForm from "~/app/_components/Form/OAuthForm";
import DevToLogo from "~/app/_components/Icon/DevToLogo";

const Page = () => {
  return (
    <div className="mx-auto p-10 max-w-100 md:max-w-[640px]">
      <div className="col-start-2 flex justify-center">
        <DevToLogo width={60} height={48}/>
      </div>

      <div className="col-start-2 flex flex-col justify-center mt-4">
        <h1 className="font-bold text-[30px] text-center">Join the DEV Community</h1>
        {/* TODO: make the number of user real time */}
        <p className="text-black/70 text-base text-center ">DEV Community is a community of 1,982,894 amazing developers</p>
      </div>

      <div className="col-start-2 mt-6">
        <OAuthForm />
      </div>

      <p className="col-start-2 text-base text-black/50 text-center">OR</p>

      <div>

      </div>
    </div>
  );
};

export default Page;