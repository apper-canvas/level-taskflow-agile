import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Checkbox from "@/components/atoms/Checkbox";
import categoriesData from "@/services/mockData/categories.json";
import tasksData from "@/services/mockData/tasks.json";

const TaskCard = forwardRef(({ task, category, onToggleComplete, onDelete, onEdit }, ref) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    if (!task.completed) {
      setIsCompleting(true);
      setTimeout(() => {
        onToggleComplete(task.Id);
        setIsCompleting(false);
      }, 600);
    } else {
      onToggleComplete(task.Id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-error";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-gray-400";
    }
  };

  const getCategoryColor = (color) => {
    return `category-${color}`;
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
<motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={isCompleting ? "task-completing" : ""}
    >
      <Card className={`p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
        task.completed ? "opacity-75" : ""
      }`}>
        <div className="flex items-start gap-3">
          {/* Priority Indicator */}
          <div className={`w-1 h-full rounded-full ${getPriorityColor(task.priority)} flex-shrink-0`} />
          
          {/* Checkbox */}
          <div className="flex-shrink-0 pt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`font-medium text-gray-900 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-gray-600 mt-1 ${
                    task.completed ? "line-through" : ""
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="p-2"
                >
                  <ApperIcon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.Id)}
                  className="p-2 text-error hover:text-error hover:bg-red-50"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
              </div>
            </div>

            {/* Meta Information */}
            <div className="flex items-center gap-3 mt-3">
              {/* Category */}
              {category && (
                <Badge className={`${getCategoryColor(category.color)} text-xs`}>
                  {category.name}
                </Badge>
              )}

              {/* Priority */}
              <Badge
                variant={task.priority === "high" ? "error" : task.priority === "medium" ? "warning" : "success"}
                size="sm"
              >
                {task.priority}
              </Badge>
{/* Due Date */}
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <ApperIcon name="Calendar" size={14} className="text-gray-500" />
                  <span className={`text-xs ${isOverdue ? "text-error" : "text-gray-500"}`}>
                    {format(new Date(task.dueDate), "MMM d")}
                  </span>
                  {isOverdue && (
                    <Badge variant="error" size="sm" className="ml-1">
                      Overdue
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;