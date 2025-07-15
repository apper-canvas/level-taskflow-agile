import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import QuickAddBar from "@/components/molecules/QuickAddBar";
import FilterBar from "@/components/molecules/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import TaskModal from "@/components/organisms/TaskModal";
import CategoryModal from "@/components/organisms/CategoryModal";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskManager = () => {
  const [filters, setFilters] = useState({
    status: "all",
    category: "",
    priority: "all"
  });
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [taskModal, setTaskModal] = useState({ isOpen: false, task: null });
  const [categoryModal, setCategoryModal] = useState({ isOpen: false, category: null });
  const [categories, setCategories] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddTask = async (taskData) => {
    try {
      await taskService.create(taskData);
      toast.success("Task added successfully!");
      triggerRefresh();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskModal.task) {
        await taskService.update(taskModal.task.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await taskService.create(taskData);
        toast.success("Task added successfully!");
      }
      
      setTaskModal({ isOpen: false, task: null });
      triggerRefresh();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (categoryModal.category) {
        await categoryService.update(categoryModal.category.Id, categoryData);
        toast.success("Category updated successfully!");
      } else {
        await categoryService.create(categoryData);
        toast.success("Category added successfully!");
      }
      
      setCategoryModal({ isOpen: false, category: null });
      triggerRefresh();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category");
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters(prev => ({
      ...prev,
      category: categoryId
    }));
  };

  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, [refreshTrigger]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TaskFlow
          </h1>
          <p className="text-gray-600">
            Organize your tasks and boost your productivity
          </p>
        </div>

        {/* Quick Add Bar */}
        <QuickAddBar onAddTask={handleAddTask} categories={categories} />

        {/* Filter Bar */}
        <FilterBar
          activeFilter={filters.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
          selectedCategory={filters.category}
          onCategoryChange={(value) => handleFilterChange("category", value)}
          selectedPriority={filters.priority}
          onPriorityChange={(value) => handleFilterChange("priority", value)}
          categories={categories}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              onEditCategory={(category) => setCategoryModal({ isOpen: true, category })}
              onAddCategory={() => setCategoryModal({ isOpen: true, category: null })}
              refreshTrigger={refreshTrigger}
            />
          </div>

          {/* Task List */}
          <div className="lg:col-span-3">
            <TaskList
              filters={filters}
              onEditTask={(task) => setTaskModal({ isOpen: true, task })}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={taskModal.isOpen}
        onClose={() => setTaskModal({ isOpen: false, task: null })}
        task={taskModal.task}
        onSave={handleSaveTask}
        categories={categories}
      />

      <CategoryModal
        isOpen={categoryModal.isOpen}
        onClose={() => setCategoryModal({ isOpen: false, category: null })}
        category={categoryModal.category}
        onSave={handleSaveCategory}
      />
    </motion.div>
  );
};

export default TaskManager;