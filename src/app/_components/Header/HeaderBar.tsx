import React from 'react';
import SearchBox from "~/app/_components/Header/SearchBox";
import DevToLogo from "~/app/_components/Icon/DevToLogo";
import AuthSection from "~/app/_components/Header/AuthSection";
import HamMenu from "~/app/_components/SideMenu/HamMenu";

const HeaderBar = () => {
  return (
    <header className="sticky min-w-[500px] top-0 left-0 right-0 border drop-shadow-sm bg-white h-14 z-50">
      <div className="flex items-center justify-center lg:mx-auto max-w-1380px h-full md:px-2 lg:px-4">
        <div className="block md:hidden p-2">
          <HamMenu />
        </div>

        <DevToLogo/>

        <div className="hidden md:block">
          <SearchBox/>
        </div>
        <div className="flex-grow"/>
        <AuthSection/>
      </div>
    </header>
);
};

export default HeaderBar;