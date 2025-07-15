import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message || "We encountered an error while loading your tasks. Please try again."}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="primary"
          onClick={onRetry}
          className="gap-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Refresh Page
        </Button>
      </div>
    </motion.div>
  );
};

export default Error;