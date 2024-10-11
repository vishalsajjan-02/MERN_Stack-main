import React from 'react';
import { Input } from "@/components/ui/input";

const SearchBox = ({ setSearchQuery }) => {
  return (
    <Input
      type="text"
      placeholder="Search transactions"
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-64"
    />
  );
};

export default SearchBox;