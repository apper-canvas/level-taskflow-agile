import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

const TaskList = ({ 
  filters = {}, 
  onEditTask, 
  refreshTrigger 
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };

      await taskService.update(taskId, updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(t => t.Id === taskId ? updatedTask : t)
      );

      toast.success(
        updatedTask.completed ? "Task completed!" : "Task reopened!",
        { position: "top-right", autoClose: 3000 }
      );
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Status filter
    if (filters.status === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (filters.status === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(task => task.categoryId === filters.category);
    }

    // Priority filter
    if (filters.priority && filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Sort by completion status, then by priority, then by due date
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    return <Empty 
      title="No tasks found"
      description="Create your first task to get started with TaskFlow"
      actionLabel="Add Task"
      onAction={() => document.querySelector('input[placeholder="What needs to be done?"]')?.focus()}
    />;
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => {
          const category = categories.find(c => c.Id === task.categoryId);
          return (
            <TaskCard
              key={task.Id}
              task={task}
              category={category}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={onEditTask}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;