import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { useNotes } from "@/hooks/useNotes";
import { cn } from "@/utils/cn";

const SearchBar = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const { searchQuery, searchResults, isSearching, searchNotes, setActiveNoteId } = useNotes();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (localQuery !== searchQuery) {
        searchNotes(localQuery);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [localQuery, searchQuery, searchNotes]);

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = (e) => {
    // Only collapse if not clicking on search results
    if (!e.relatedTarget || !e.relatedTarget.closest(".search-results")) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 200);
    }
  };

  const handleResultClick = (noteId) => {
    setActiveNoteId(noteId);
    setIsExpanded(false);
    setLocalQuery("");
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <Input
          type="text"
          placeholder="Search notes..."
          value={localQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-10 pr-4 py-2 w-full"
        />
        {isSearching && (
          <ApperIcon 
            name="Loader2" 
            size={18} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin"
          />
        )}
      </div>

      <AnimatePresence>
        {isExpanded && localQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="search-results absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50"
          >
            {searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((note) => (
                  <button
                    key={note.Id}
                    onClick={() => handleResultClick(note.Id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {highlightMatch(note.title, localQuery)}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {highlightMatch(
                        note.content.substring(0, 100) + (note.content.length > 100 ? "..." : ""),
                        localQuery
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <ApperIcon name="SearchX" size={24} className="mx-auto mb-2 text-gray-400" />
                <p>No notes found for "{localQuery}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;