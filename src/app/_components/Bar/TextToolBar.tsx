import React from 'react';
import SecondaryBtn from "~/app/_components/Button/SecondaryBtn";
import Image from "next/image";

const TextToolBar = ({ className="" } : { className?: string }) => {
  const tools = [
    {
      name: "Bold",
      image: "/bold.svg",
    },
    {
      name: "Italic",
      image: "/italic.svg",
    },
    {
      name: "Link",
      image: "/link.svg",
    },
    {
      name: "Ordered List",
      image: "/ol.svg",
    },
    {
      name: "Unordered List",
      image: "/ul.svg",
    },
    {
      name: "Heading",
      image: "/heading.svg",
    },
    {
      name: "Quote",
      image: "/quote.svg",
    },
    {
      name: "Code",
      image: "/code.svg",
    },
    {
      name: "Code Block",
      image: "/code_block.svg",
    },
    {
      name: "Embed",
      image: "/embed.svg",
    },
    {
      name: "Upload Image",
      image: "/upload_img.svg",
    },
  ]

  return (
    <div className={`${className}`}>
      {tools.map((tool) => (
        <SecondaryBtn key={tool.name} className="group p-2 mr-1">
          <Image src={tool.image} alt={tool.image} width={24} height={24} />
        </SecondaryBtn>
      ))}
    </div>
  );
};

export default TextToolBar;