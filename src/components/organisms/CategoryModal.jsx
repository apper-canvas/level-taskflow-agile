import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "blue"
  });

  const colorOptions = [
    { key: "red", name: "Red", value: "red" },
    { key: "blue", name: "Blue", value: "blue" },
    { key: "green", name: "Green", value: "green" },
    { key: "yellow", name: "Yellow", value: "yellow" },
    { key: "purple", name: "Purple", value: "purple" },
    { key: "pink", name: "Pink", value: "pink" },
    { key: "indigo", name: "Indigo", value: "indigo" },
    { key: "orange", name: "Orange", value: "orange" }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        color: category.color || "blue"
      });
    } else {
      setFormData({
        name: "",
        color: "blue"
      });
    }
  }, [category, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {category ? "Edit Category" : "Add New Category"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.key}
                      type="button"
                      onClick={() => handleChange("color", color.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.color === color.value
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-${color.value}-500 mx-auto`} />
                      <p className="text-xs text-gray-600 mt-1">{color.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!formData.name.trim()}
                >
                  {category ? "Update Category" : "Add Category"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryModal;