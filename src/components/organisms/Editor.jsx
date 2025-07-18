import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNotes } from "@/hooks/useNotes";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useKeyboard } from "@/hooks/useKeyboard";
import ApperIcon from "@/components/ApperIcon";
import TemplateGallery from "@/components/organisms/TemplateGallery";
import SaveIndicator from "@/components/molecules/SaveIndicator";
import Textarea from "@/components/atoms/Textarea";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import IconButton from "@/components/atoms/IconButton";
import { cn } from "@/utils/cn";

const Editor = ({ className }) => {
  const { 
    activeNoteId, 
    getActiveNote, 
    saveNote, 
    removeNote, 
    isPreviewMode, 
    togglePreview,
    lastSaved,
    isSaving,
    createNote,
    createNoteFromTemplate,
    setActiveNoteId
  } = useNotes();

  const activeNote = getActiveNote();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  // Initialize editor with active note
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [activeNote]);

  // Auto-save functionality
  useAutoSave(
    { title, content },
    async (data) => {
      if (activeNoteId && activeNote) {
        await saveNote(activeNoteId, data);
      }
    },
    2000
  );

  // Keyboard shortcuts
  useKeyboard([
    {
      keys: "cmd+n",
      action: async () => {
        const newNote = await createNote();
        if (newNote) {
          setActiveNoteId(newNote.Id);
        }
      }
    },
    {
      keys: "cmd+s",
      action: async () => {
        if (activeNoteId) {
          await saveNote(activeNoteId, { title, content });
        }
      }
    },
    {
      keys: "cmd+shift+p",
      action: togglePreview
    }
  ]);

  const handleDelete = async () => {
    if (activeNoteId && confirm(`Are you sure you want to delete "${title}"?`)) {
      await removeNote(activeNoteId);
    }
  };
const handleNewNote = async () => {
    setShowTemplateGallery(true);
  };

  const handleTemplateSelect = async (template) => {
    try {
      let newNote;
      if (template) {
        newNote = await createNoteFromTemplate(template);
      } else {
        newNote = await createNote();
      }
      if (newNote) {
        setActiveNoteId(newNote.Id);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
      .replace(/\n/g, "<br>");
  };

  if (!activeNote) {
    return (
      <div className={cn("flex-1 flex items-center justify-center p-8", className)}>
        <div className="text-center max-w-md">
<ApperIcon name="FileText" size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
            Welcome to Notely
          </h2>
          <p className="text-gray-600 mb-6">
            Start capturing your thoughts by creating a new note or selecting an existing one from the sidebar.
          </p>
          <Button onClick={handleNewNote} size="lg">
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Create Your First Note
          </Button>
</div>
      </div>
    );
  }

  return (
    <div className={cn("flex-1 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="text-lg font-medium border-none shadow-none focus:ring-0 p-0 bg-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
            <IconButton
              variant="ghost"
              onClick={togglePreview}
              className={cn(
                "transition-colors",
                isPreviewMode ? "bg-primary/10 text-primary" : "text-gray-600"
              )}
            >
              <ApperIcon name={isPreviewMode ? "Edit" : "Eye"} size={18} />
            </IconButton>
            <IconButton
              variant="ghost"
              onClick={handleDelete}
              className="text-error hover:text-error hover:bg-error/10"
            >
              <ApperIcon name="Trash2" size={18} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-hidden">
        {isPreviewMode ? (
          <div className="h-full overflow-y-auto p-6 bg-white">
            <div 
              className="max-w-4xl mx-auto prose prose-lg markdown-preview"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </div>
        ) : (
          <div className="h-full p-6 bg-white">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note..."
              className="w-full h-full resize-none border-none shadow-none focus:ring-0 text-base leading-relaxed editor-content"
            />
          </div>
        )}
      </div>

      {/* Footer with shortcuts */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>⌘N New Note</span>
            <span>⌘S Save</span>
            <span>⌘⇧P Toggle Preview</span>
          </div>
          <div className="flex items-center space-x-2">
            {content && (
              <span>{content.length} characters</span>
            )}
          </div>
</div>
      </div>

      {/* Template Gallery Modal */}
      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
};

export default Editor;