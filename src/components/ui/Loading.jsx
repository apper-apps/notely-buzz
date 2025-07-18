import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="w-full max-w-4xl space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4 flex-1">
            <div className="h-8 bg-gray-200 rounded-md w-64 shimmer" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-200 rounded-md shimmer" />
            <div className="h-8 w-8 bg-gray-200 rounded-md shimmer" />
            <div className="h-8 w-8 bg-gray-200 rounded-md shimmer" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="p-6 space-y-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-2"
            >
              <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: `${Math.random() * 40 + 60}%` }} />
              <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: `${Math.random() * 60 + 40}%` }} />
              {i % 3 === 0 && (
                <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: `${Math.random() * 30 + 70}%` }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-4 w-16 bg-gray-200 rounded shimmer" />
              <div className="h-4 w-12 bg-gray-200 rounded shimmer" />
              <div className="h-4 w-20 bg-gray-200 rounded shimmer" />
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;