import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import IconButton from "@/components/atoms/IconButton";
import FolderItem from "@/components/molecules/FolderItem";
import FolderCreator from "@/components/molecules/FolderCreator";
import NoteItem from "@/components/molecules/NoteItem";
import TemplateGallery from "@/components/organisms/TemplateGallery";
import { useNotes } from "@/hooks/useNotes";
import { cn } from "@/utils/cn";
const Sidebar = ({ isOpen, onClose, className }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showFolderCreator, setShowFolderCreator] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const { 
    folders, 
    notes, 
    activeNoteId, 
    createNote, 
    createNoteFromTemplate,
    setActiveNoteId,
    getNotesByFolder 
  } = useNotes();

const handleCreateNote = async () => {
    setShowTemplateGallery(true);
  };

  const handleTemplateSelect = async (template) => {
    try {
      let newNote;
      if (template) {
        newNote = await createNoteFromTemplate(template, {
          folderId: selectedFolder
        });
      } else {
        newNote = await createNote({
          folderId: selectedFolder,
          title: "New Note",
          content: ""
        });
      }
      if (newNote) {
        setActiveNoteId(newNote.Id);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleFolderSelect = (folderId) => {
    setSelectedFolder(folderId);
  };

  const handleAllNotesClick = () => {
    setSelectedFolder(null);
  };

  const displayedNotes = selectedFolder ? getNotesByFolder(selectedFolder) : notes;

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className={cn("hidden lg:flex flex-col h-full bg-surface border-r border-gray-200", className)}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-gray-900">
            Notely
          </h2>
          <Button onClick={handleCreateNote} size="sm">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            New Note
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="space-y-2">
            <div
              className={cn(
                "flex items-center p-2 rounded-lg cursor-pointer transition-colors",
                selectedFolder === null 
                  ? "bg-primary/10 border-l-4 border-primary" 
                  : "hover:bg-gray-50"
              )}
              onClick={handleAllNotesClick}
            >
              <ApperIcon name="FileText" size={18} className="mr-3 text-gray-600" />
              <div>
                <div className="font-medium text-gray-900">All Notes</div>
                <div className="text-xs text-gray-500">{notes.length} notes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Folders</h3>
            <IconButton
              variant="ghost"
              size="sm"
              onClick={() => setShowFolderCreator(true)}
            >
              <ApperIcon name="FolderPlus" size={16} />
            </IconButton>
          </div>

          <AnimatePresence>
            {showFolderCreator && (
              <div className="mb-4">
                <FolderCreator onCancel={() => setShowFolderCreator(false)} />
              </div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {folders.map((folder) => (
              <FolderItem
                key={folder.Id}
                folder={folder}
                isSelected={selectedFolder === folder.Id}
                onSelect={handleFolderSelect}
              />
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {selectedFolder ? 
              folders.find(f => f.Id === selectedFolder)?.name || "Notes" : 
              "Recent Notes"
            }
          </h3>
          <div className="space-y-2">
            {displayedNotes.slice(0, 5).map((note) => (
              <NoteItem
                key={note.Id}
                note={note}
                isSelected={activeNoteId === note.Id}
                onSelect={setActiveNoteId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-surface border-r border-gray-200 z-50 flex flex-col"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-semibold text-gray-900">
                  Notely
                </h2>
                <IconButton variant="ghost" onClick={onClose}>
                  <ApperIcon name="X" size={20} />
                </IconButton>
              </div>
              <Button onClick={handleCreateNote} size="sm" className="w-full">
                <ApperIcon name="Plus" size={16} className="mr-2" />
                New Note
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="space-y-2">
                  <div
                    className={cn(
                      "flex items-center p-2 rounded-lg cursor-pointer transition-colors",
                      selectedFolder === null 
                        ? "bg-primary/10 border-l-4 border-primary" 
                        : "hover:bg-gray-50"
                    )}
                    onClick={handleAllNotesClick}
                  >
                    <ApperIcon name="FileText" size={18} className="mr-3 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">All Notes</div>
                      <div className="text-xs text-gray-500">{notes.length} notes</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Folders</h3>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFolderCreator(true)}
                  >
                    <ApperIcon name="FolderPlus" size={16} />
                  </IconButton>
                </div>

                <AnimatePresence>
                  {showFolderCreator && (
                    <div className="mb-4">
                      <FolderCreator onCancel={() => setShowFolderCreator(false)} />
                    </div>
                  )}
                </AnimatePresence>

                <div className="space-y-1">
                  {folders.map((folder) => (
                    <FolderItem
                      key={folder.Id}
                      folder={folder}
                      isSelected={selectedFolder === folder.Id}
                      onSelect={handleFolderSelect}
                    />
                  ))}
                </div>
              </div>

              <div className="px-4 pb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {selectedFolder ? 
                    folders.find(f => f.Id === selectedFolder)?.name || "Notes" : 
                    "Recent Notes"
                  }
                </h3>
                <div className="space-y-2">
                  {displayedNotes.slice(0, 5).map((note) => (
                    <NoteItem
                      key={note.Id}
                      note={note}
                      isSelected={activeNoteId === note.Id}
                      onSelect={setActiveNoteId}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
<DesktopSidebar />
      <MobileSidebar />
      
      {/* Template Gallery Modal */}
      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </>
  );
};
export default Sidebar;