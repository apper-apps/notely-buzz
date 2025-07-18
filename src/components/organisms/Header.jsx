import React from "react";
import ApperIcon from "@/components/ApperIcon";
import IconButton from "@/components/atoms/IconButton";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

const Header = ({ onMenuClick, className }) => {
  return (
    <header className={cn("lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200", className)}>
      <div className="flex items-center space-x-3">
        <IconButton variant="ghost" onClick={onMenuClick}>
          <ApperIcon name="Menu" size={20} />
        </IconButton>
        <h1 className="text-xl font-display font-semibold text-gray-900">
          Notely
        </h1>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;