'use client'

import React, {useState} from 'react';

import SearchIcon from "~/app/_components/Icon/SearchIcon";
import {useRouter} from "next/navigation";
import {pageRoutes} from "~/app/_constants/pageRoutes";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query === "") {
      return;
    }

    router.push(pageRoutes.SEARCH + "/" + query);

    setQuery("");
    return;
  };

  return (
    <div className="flex mx-4 content-center items-center w-[450px] lg:w-[680px]">
      <form onSubmit={handleSearch} className="flex border focus-within:border-2 focus-within:border-[#3b49df] border-black/15 rounded-md w-full h-full">
        <button type="submit" className="py-1.5 hover:bg-[#2f3ab2]/15 rounded-md">
          <SearchIcon className="mx-2"/>
        </button>

        <div className="flex items-center w-full">
          <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" placeholder="Search..." className="flex-grow placeholder-black/75 text-base h-full border-none outline-none"/>
          <a className="text-xs mr-2 text-gray-500" href="https://www.algolia.com/developers/?utm_source=devto&utm_medium=referral">
            Powered by Algolia
          </a>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;