import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CategoryCard from "@/components/molecules/CategoryCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

const CategorySidebar = ({ 
  selectedCategory, 
  onCategorySelect, 
  onEditCategory, 
  onAddCategory,
  refreshTrigger 
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [refreshTrigger]);

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) return;

    try {
      await categoryService.delete(categoryId);
      setCategories(prevCategories => 
        prevCategories.filter(c => c.Id !== categoryId)
      );
      toast.success("Category deleted successfully");
      
      // If deleted category was selected, clear selection
      if (selectedCategory === categoryId) {
        onCategorySelect("");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCategories} />;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={onAddCategory}
          className="gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {/* All Tasks Option */}
        <CategoryCard
          category={{
            Id: "",
            name: "All Tasks",
            color: "gray",
            taskCount: categories.reduce((sum, cat) => sum + cat.taskCount, 0)
          }}
          isSelected={selectedCategory === ""}
          onClick={() => onCategorySelect("")}
          onEdit={() => {}}
          onDelete={() => {}}
        />

        {categories.length === 0 ? (
          <Empty 
            title="No categories"
            description="Create your first category to organize your tasks"
            actionLabel="Add Category"
            onAction={onAddCategory}
          />
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.Id}
              category={category}
              isSelected={selectedCategory === category.Id}
              onClick={() => onCategorySelect(category.Id)}
              onEdit={onEditCategory}
              onDelete={handleDeleteCategory}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default CategorySidebar;