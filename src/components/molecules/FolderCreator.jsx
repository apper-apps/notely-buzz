import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useNotes } from "@/hooks/useNotes";

const FolderCreator = ({ onCancel }) => {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#5B4B8A");
  const { createFolder } = useNotes();

  const colors = [
    "#5B4B8A", // Primary
    "#E67E50", // Accent
    "#4CAF50", // Success
    "#42A5F5", // Info
    "#FFA726", // Warning
    "#EF5350", // Error
    "#9C27B0", // Purple
    "#FF5722", // Deep Orange
    "#607D8B", // Blue Grey
    "#795548", // Brown
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      await createFolder({
        name: folderName.trim(),
        color: selectedColor,
      });
      onCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="folder-name" className="block text-sm font-medium text-gray-700 mb-2">
            Folder Name
          </label>
          <Input
            id="folder-name"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color 
                    ? "border-gray-400 scale-110" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!folderName.trim()}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Create Folder
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default FolderCreator;