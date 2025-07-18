import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No notes yet", 
  description = "Start your note-taking journey by creating your first note.",
  actionLabel = "Create First Note",
  onAction,
  icon = "FileText",
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <ApperIcon name={icon} size={40} className="text-primary" />
        </div>
        
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-3">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <Button onClick={onAction} size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
            <ApperIcon name="Plus" size={20} className="mr-2" />
            {actionLabel}
          </Button>
        )}
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Tips: Use ⌘N to create a new note quickly</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Empty;