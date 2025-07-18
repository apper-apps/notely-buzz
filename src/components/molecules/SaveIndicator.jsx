import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SaveIndicator = ({ isSaving, lastSaved, className }) => {
  const formatLastSaved = (date) => {
    if (!date) return "";
    
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) {
      return "Saved just now";
    } else if (minutes < 60) {
      return `Saved ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Saved at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  };

  return (
    <div className={cn("flex items-center space-x-2 text-sm text-gray-500", className)}>
      <AnimatePresence mode="wait">
        {isSaving ? (
          <motion.div
            key="saving"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-1"
          >
            <ApperIcon name="Loader2" size={16} className="animate-spin" />
            <span>Saving...</span>
          </motion.div>
        ) : lastSaved ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-1"
          >
            <ApperIcon name="Check" size={16} className="text-success" />
            <span>{formatLastSaved(lastSaved)}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default SaveIndicator;