import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Error = ({ message, onRetry, className }) => {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message || "We encountered an error while loading your notes. Please try again."}
        </p>
        
        <div className="flex items-center justify-center space-x-3">
          <Button onClick={onRetry} variant="default">
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            variant="ghost"
          >
            Reload Page
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;