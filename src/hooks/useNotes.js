import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesService } from "@/services/api/notesService";
import {
  setNotes,
  setFolders,
  addNote,
  updateNote,
  deleteNote,
  addFolder,
  updateFolder,
  deleteFolder,
  setActiveNote,
  setSearchQuery,
  setSearchResults,
  setIsSearching,
  setPreviewMode,
  setLoading,
  setError,
} from "@/store/notesSlice";
import { toast } from "react-toastify";

export const useNotes = () => {
  const dispatch = useDispatch();
  const {
    notes,
    folders,
    activeNoteId,
    searchQuery,
    searchResults,
    isSearching,
    isPreviewMode,
    loading,
    error,
  } = useSelector(state => state.notes);

  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load initial data
  useEffect(() => {
    loadNotes();
    loadFolders();
  }, []);

  const loadNotes = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const notesData = await notesService.getAllNotes();
      dispatch(setNotes(notesData));
    } catch (err) {
      dispatch(setError("Failed to load notes"));
      toast.error("Failed to load notes");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadFolders = async () => {
    try {
      const foldersData = await notesService.getAllFolders();
      dispatch(setFolders(foldersData));
    } catch (err) {
      toast.error("Failed to load folders");
    }
  };

  const createNote = async (noteData = {}) => {
    try {
      const newNote = await notesService.createNote(noteData);
      dispatch(addNote(newNote));
      dispatch(setActiveNote(newNote.Id));
      toast.success("Note created successfully");
      return newNote;
    } catch (err) {
      toast.error("Failed to create note");
      throw err;
    }
  };

  const saveNote = async (id, updates) => {
    try {
      setIsSaving(true);
      const updatedNote = await notesService.updateNote(id, updates);
      if (updatedNote) {
        dispatch(updateNote(updatedNote));
        setLastSaved(new Date());
        return updatedNote;
      }
    } catch (err) {
      toast.error("Failed to save note");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const removeNote = async (id) => {
    try {
      await notesService.deleteNote(id);
      dispatch(deleteNote(id));
      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error("Failed to delete note");
      throw err;
    }
  };

  const searchNotes = async (query) => {
    try {
      dispatch(setIsSearching(true));
      dispatch(setSearchQuery(query));
      
      if (!query.trim()) {
        dispatch(setSearchResults([]));
        return;
      }

      const results = await notesService.searchNotes(query);
      dispatch(setSearchResults(results));
    } catch (err) {
      toast.error("Search failed");
    } finally {
      dispatch(setIsSearching(false));
    }
  };

  const createFolder = async (folderData) => {
    try {
      const newFolder = await notesService.createFolder(folderData);
      dispatch(addFolder(newFolder));
      toast.success("Folder created successfully");
      return newFolder;
    } catch (err) {
      toast.error("Failed to create folder");
      throw err;
    }
  };

  const saveFolder = async (id, updates) => {
    try {
      const updatedFolder = await notesService.updateFolder(id, updates);
      if (updatedFolder) {
        dispatch(updateFolder(updatedFolder));
        toast.success("Folder updated successfully");
        return updatedFolder;
      }
    } catch (err) {
      toast.error("Failed to update folder");
      throw err;
    }
  };

  const removeFolder = async (id) => {
    try {
      await notesService.deleteFolder(id);
      dispatch(deleteFolder(id));
      toast.success("Folder deleted successfully");
    } catch (err) {
      toast.error("Failed to delete folder");
      throw err;
    }
  };

  const getActiveNote = () => {
    return notes.find(note => note.Id === activeNoteId);
  };

  const getNotesByFolder = (folderId) => {
    if (folderId === null) {
      return notes.filter(note => !note.folderId);
    }
    return notes.filter(note => note.folderId === folderId);
  };

  const togglePreview = () => {
    dispatch(setPreviewMode(!isPreviewMode));
  };

  const setActiveNoteId = (id) => {
    dispatch(setActiveNote(id));
  };

  return {
    notes,
    folders,
    activeNoteId,
    searchQuery,
    searchResults,
    isSearching,
    isPreviewMode,
    loading,
    error,
    lastSaved,
    isSaving,
    loadNotes,
    loadFolders,
    createNote,
    saveNote,
    removeNote,
    searchNotes,
    createFolder,
    saveFolder,
    removeFolder,
    getActiveNote,
    getNotesByFolder,
    togglePreview,
    setActiveNoteId,
  };
};