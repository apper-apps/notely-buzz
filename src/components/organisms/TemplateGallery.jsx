import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import IconButton from "@/components/atoms/IconButton";
import Badge from "@/components/atoms/Badge";
import { templateService } from "@/services/api/templateService";
import { cn } from "@/utils/cn";

const TemplateGallery = ({ isOpen, onClose, onSelectTemplate, className }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const templatesData = await templateService.getTemplates();
      setTemplates(templatesData);
    } catch (error) {
      console.error("Failed to load templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
      setSelectedTemplate(null);
    }
  };

  const handleCreateBlank = () => {
    onSelectTemplate(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={cn(
            "bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  Choose a Template
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Start with a pre-formatted template or create a blank note
                </p>
              </div>
              <IconButton variant="ghost" onClick={onClose}>
                <ApperIcon name="X" size={20} />
              </IconButton>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading templates...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Blank Note Option */}
                <div
                  className={cn(
                    "p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5",
                    selectedTemplate === null && "border-primary bg-primary/10"
                  )}
                  onClick={() => handleTemplateSelect(null)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <ApperIcon name="FileText" size={24} className="text-gray-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Blank Note</h3>
                    <p className="text-sm text-gray-600">
                      Start with a clean slate
                    </p>
                  </div>
                </div>

                {/* Template Options */}
                {templates.map((template) => (
                  <div
                    key={template.Id}
                    className={cn(
                      "p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5",
                      selectedTemplate?.Id === template.Id && "border-primary bg-primary/10"
                    )}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: template.color + '20' }}>
                          <ApperIcon name={template.icon} size={24} style={{ color: template.color }} />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="text-xs text-gray-500">
                        {template.sections.length} sections
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <div className="flex items-center space-x-3">
                {selectedTemplate === null ? (
                  <Button onClick={handleCreateBlank}>
                    <ApperIcon name="Plus" size={16} className="mr-2" />
                    Create Blank Note
                  </Button>
                ) : (
                  <Button onClick={handleUseTemplate} disabled={!selectedTemplate}>
                    <ApperIcon name="FileText" size={16} className="mr-2" />
                    Use Template
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplateGallery;