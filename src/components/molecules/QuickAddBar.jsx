import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const QuickAddBar = ({ onAddTask, categories = [] }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({
        title: taskTitle.trim(),
        categoryId: selectedCategory || (categories[0]?.Id || ""),
        priority,
        dueDate: dueDate || null
      });
      setTaskTitle("");
      setDueDate("");
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary to-primary-light p-6 rounded-xl shadow-lg mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <ApperIcon name="Plus" size={20} className="text-white" />
          <Input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done?"
            className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:ring-white/50"
          />
          <Button type="submit" variant="accent" disabled={!taskTitle.trim()}>
            Add Task
          </Button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20"
          >
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border-white/30 bg-white/20 text-white px-3 py-2 text-sm focus:ring-white/50 focus:border-white/50"
              >
                {categories.map((category) => (
                  <option key={category.Id} value={category.Id} className="text-gray-800">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border-white/30 bg-white/20 text-white px-3 py-2 text-sm focus:ring-white/50 focus:border-white/50"
              >
                <option value="low" className="text-gray-800">Low</option>
                <option value="medium" className="text-gray-800">Medium</option>
                <option value="high" className="text-gray-800">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border-white/30 bg-white/20 text-white px-3 py-2 text-sm focus:ring-white/50 focus:border-white/50"
              />
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default QuickAddBar;