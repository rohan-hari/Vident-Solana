import React, { useState } from 'react';
import { useStateContext } from '../../context';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  const { router } = useStateContext();
  const [searchQuery, setSearchQuery] = useState('');
  const searchQueryHandler = (event) => {
    if (
      (event.key === 'Enter' || event === 'seachButton') &&
      searchQuery.length > 0
    ) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="group flex items-center">
      <div className="flex h-7 md:h-9 border border-[#303030] rounded-full group-focus-within:border-blue-500 bg-white/[0.06] hover:bg-white/[0.12] group-focus-within:bg-white/[0.12]">
        <div className="flex w-10 items-center justify-center ">
          <FiSearch className="text-white/[0.4] text-xl" />
        </div>
        <input
          type="text"
          className="bg-transparent text-sm outline-none pr-5 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[550px]"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          placeholder="Search"
          value={searchQuery}
        />
      </div>
    </div>
  );
}
