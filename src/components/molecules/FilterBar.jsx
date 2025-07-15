import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedPriority, 
  onPriorityChange, 
  categories = [] 
}) => {
  const filters = [
    { key: "all", label: "All Tasks", icon: "List" },
    { key: "active", label: "Active", icon: "Circle" },
    { key: "completed", label: "Completed", icon: "CheckCircle" }
  ];

  const priorities = [
    { key: "all", label: "All Priorities" },
    { key: "high", label: "High Priority" },
    { key: "medium", label: "Medium Priority" },
    { key: "low", label: "Low Priority" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6"
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="gap-2"
            >
              <ApperIcon name={filter.icon} size={16} />
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="h-6 border-l border-gray-300" />

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <ApperIcon name="Tag" size={16} className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.Id} value={category.Id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <ApperIcon name="Flag" size={16} className="text-gray-500" />
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {priorities.map((priority) => (
              <option key={priority.key} value={priority.key}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;