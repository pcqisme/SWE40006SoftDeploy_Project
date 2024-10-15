import React from 'react';
import Image from "next/image";
import SecondaryBtn from "~/app/_components/Button/SecondaryBtn";

const SettingNavBar = () => {
  const navs = [
    {
      name: "Profile",
      icon: "/settings_smile.svg",
    },
    {
      name: "Customization",
      icon: "/settings_customization.svg",
    },
    {
      name: "Notifications",
      icon: "/settings_notifications.svg",
    },
    {
      name: "Account",
      icon: "/settings_account.svg",
    },
    {
      name: "Organization",
      icon: "/settings_org.svg",
    },
    {
      name: "Extensions",
      icon: "/settings_extensions.svg",
    },
  ]
  const [selectedNav, setSelectedNav] = React.useState("Profile")

  return (
    <div className="hidden md:flex flex-col">
      {navs.map((nav, index) => (
        <SecondaryBtn onClick={() => setSelectedNav(nav.name)} key={index} className={`flex hover:no-underline items-center w-full flex-row pl-2 ${selectedNav === nav.name ? "bg-white hover:bg-white" : "bg-none"}`}>
          <Image
            className="mr-2"
            src={nav.icon}
            alt={nav.name}
            width={24}
            height={24}
          />
          <p className={`text-start text-black ${selectedNav === nav.name ? "font-medium" : "font-normal"}`}>{nav.name}</p>
        </SecondaryBtn>
      ))}
    </div>
  );
};

export default SettingNavBar;