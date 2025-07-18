import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import IconButton from "@/components/atoms/IconButton";
import { useNotes } from "@/hooks/useNotes";
import { cn } from "@/utils/cn";

const NoteItem = ({ note, isSelected, onSelect, className }) => {
  const { removeNote } = useNotes();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
      await removeNote(note.Id);
    }
  };

  const getPreview = (content) => {
    // Remove markdown formatting for preview
    const cleanContent = content
      .replace(/#{1,6}\s/g, "") // Remove headings
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/`(.*?)`/g, "$1") // Remove code
      .replace(/\n/g, " ") // Replace newlines with spaces
      .trim();
    
    return cleanContent.substring(0, 100) + (cleanContent.length > 100 ? "..." : "");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group p-4 rounded-lg cursor-pointer transition-all duration-200 border",
        isSelected 
          ? "bg-white border-accent shadow-lg ring-2 ring-accent/20" 
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md",
        className
      )}
      onClick={() => onSelect(note.Id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-medium text-gray-900 truncate">
              {note.title || "Untitled Note"}
            </h3>
            {note.isPinned && (
              <ApperIcon name="Pin" size={14} className="text-accent flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {getPreview(note.content)}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconButton
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" size={14} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteItem;