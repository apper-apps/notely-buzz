import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import IconButton from "@/components/atoms/IconButton";
import { useNotes } from "@/hooks/useNotes";
import { cn } from "@/utils/cn";

const FolderItem = ({ folder, isSelected, onSelect, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(folder.name);
  const { saveFolder, removeFolder } = useNotes();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editName.trim() && editName !== folder.name) {
      await saveFolder(folder.Id, { name: editName.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(folder.name);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete the folder "${folder.name}"? Notes inside will be moved to "All Notes".`)) {
      await removeFolder(folder.Id);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
        isSelected 
          ? "bg-primary/10 border-l-4 border-primary" 
          : "hover:bg-gray-50",
        className
      )}
      onClick={() => !isEditing && onSelect(folder.Id)}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div
          className="folder-color mr-3 flex-shrink-0"
          style={{ backgroundColor: folder.color }}
        />
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSave}
            onKeyPress={handleKeyPress}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        ) : (
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {folder.name}
            </div>
            <div className="text-xs text-gray-500">
              {folder.noteCount} {folder.noteCount === 1 ? "note" : "notes"}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            <ApperIcon name="Edit2" size={14} />
          </IconButton>
          <IconButton
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <ApperIcon name="Trash2" size={14} />
          </IconButton>
        </div>
      )}
    </motion.div>
  );
};

export default FolderItem;