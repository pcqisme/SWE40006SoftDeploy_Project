import React from 'react';
import SecondaryBtn from "~/app/_components/Button/SecondaryBtn";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  const navMenu1 = [
    {
      name: "Home",
      link: "/",
      imagePath: "/home.svg",
    },
    {
      name: "DEV++",
      link: "/++",
      imagePath: "/devpp.svg",
    },
    {
      name: "Reading List",
      link: "/readinglist",
      imagePath: "/menu_ic3.svg",
    },
    {
      name: "Podcasts",
      link: "/podcasts",
      imagePath: "/menu_ic4.svg",
    },
    {
      name: "Videos",
      link: "/videos",
      imagePath: "/menu_ic5.svg",
    },
    {
      name: "Tags",
      link: "/tags",
      imagePath: "/menu_ic6.svg",
    },
    {
      name: "DEV Help",
      link: "/devhelps",
      imagePath: "/menu_ic7.svg",
    },
    {
      name: "Forem Shop",
      link: "/shop",
      imagePath: "/menu_ic8.svg",
    },
    {
      name: "Advertise on DEV",
      link: "/advertise",
      imagePath: "/menu_ic9.svg",
    },
    {
      name: "DEV Challenges",
      link: "/challenges",
      imagePath: "/menu_ic10.svg",
    },
    {
      name: "DEV Showcases",
      link: "/showcases",
      imagePath: "/menu_ic11.svg",
    },
    {
      name: "About",
      link: "/about",
      imagePath: "/devto_ic.svg",
    },
    {
      name: "Contact",
      link: "/contact",
      imagePath: "/menu_ic13.svg",
    },
    {
      name: "Guides",
      link: "/guides",
      imagePath: "/menu_ic14.svg",
    },
    {
      name: "Software comparisons",
      link: "/comparisons",
      imagePath: "/menu_ic15.svg",
    },
  ];
  const others = [
    {
      name: "Code of Conduct",
      link: "/coc",
      imagePath: "/other1.svg",
    },
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
      imagePath: "/other2.svg",
    },
    {
      name: "Terms of Use",
      link: "/tou",
      imagePath: "/other3.svg",
    },
  ];
  const medias = [
    {
      name: "x",
      link: "https://twitter.com/thepracticaldev",
      imagePath: "/x.svg",
    },
    {
      name: "facebook",
      link: "https://facebook.com/thepracticaldev",
      imagePath: "/fb.svg",
    },
    {
      name: "github",
      link: "https://github.com/forem",
      imagePath: "/git.svg",
    },
    {
      name: "instagram",
      link: "https://instagram.com/thepracticaldev",
      imagePath: "/ig.svg",
    },
    {
      name: "twitch",
      link: "https://twitch.com/thepracticaldev",
      imagePath: "/twitch.svg",
    },
    {
      name: "mastodon",
      link: "https://fosstodon.org/@thepracticaldev",
      imagePath: "/mastodon.svg",
    },
  ];

  return (
    <div className="">
      <div className="mb-4 flex flex-col">
        {navMenu1.map((item, index) => (
          <SecondaryBtn key={index} className="flex flex-row items-center">
            <Image
              src={item.imagePath}
              alt={`${item.name} icon`}
              width={24}
              height={24}
            />
            <Link className="pl-2 text-black" href={item.link} passHref>
              <p className="text-left">{item.name}</p>
            </Link>
          </SecondaryBtn>
        ))}
      </div>

      {/* others */}
      <div className="mb-4 flex flex-col">
        <h1 className="text-base py-2 pl-3 font-bold">Other</h1>
        {others.map((item, index) => (
          <SecondaryBtn key={index} className="flex flex-row items-center">
            <Image
              src={item.imagePath}
              alt={`${item.name} icon`}
              width={24}
              height={24}
            />
            <Link className="pl-2 text-black" href={item.link} passHref>
              {item.name}
            </Link>
          </SecondaryBtn>
        ))}
      </div>

      {/* medias */}
      <div className="mb-4 flex flex-row justify-start">
        {medias.map((item, index) => (
          <SecondaryBtn key={index} className="flex flex-row items-center">
            <a href={item.link} target="_blank" rel={item.name}>
              <Image
                src={item.imagePath}
                alt={`${item.name} icon`}
                width={24}
                height={24}
              />
            </a>
          </SecondaryBtn>
        ))}
      </div>

      <div className="mb-4 flex flex-row items-center justify-between">
        <h1 className="text-base font-bold">My Tags</h1>
        <SecondaryBtn className="flex flex-row items-center">
          <Link href="/setting" passHref>
            <Image src="/setting.svg" alt="setting" width={24} height={24} />
          </Link>
        </SecondaryBtn>
      </div>

      {/* tags box */}
      <div className="max-h-[42vh]">
        {/* TODO: Display all tag dynamically here*/}
      </div>
    </div>
  );
};

export default Menu;