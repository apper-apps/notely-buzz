import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@/components/organisms/Editor";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import TemplateGallery from "@/components/organisms/TemplateGallery";
import { useNotes } from "@/hooks/useNotes";
const NotesPage = () => {
  const { id } = useParams();
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const { 
    notes, 
    loading, 
    error, 
    loadNotes, 
    createNote, 
    createNoteFromTemplate,
    setActiveNoteId,
    activeNoteId 
  } = useNotes();

  useEffect(() => {
    if (id) {
      setActiveNoteId(parseInt(id));
    }
  }, [id, setActiveNoteId]);

const handleCreateNote = async () => {
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadNotes} />;
  }

  if (notes.length === 0) {
    return (
      <Empty
        title="Welcome to Notely"
        description="Your personal note-taking sanctuary. Capture thoughts, organize ideas, and never lose track of what matters most."
        actionLabel="Create Your First Note"
        onAction={handleCreateNote}
        icon="FileText"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      {/* Desktop search bar */}
      <div className="hidden lg:block p-4 border-b border-gray-200 bg-white">
        <SearchBar className="max-w-md" />
      </div>
      
      {/* Editor */}
<div className="flex-1 overflow-hidden">
        <Editor />
      </div>

      {/* Template Gallery Modal */}
      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </motion.div>
  );
};
export default NotesPage;