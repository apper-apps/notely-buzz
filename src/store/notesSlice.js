import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  folders: [],
  activeNoteId: null,
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  isPreviewMode: false,
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload };
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      if (state.activeNoteId === action.payload) {
        state.activeNoteId = null;
      }
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    updateFolder: (state, action) => {
      const index = state.folders.findIndex(folder => folder.id === action.payload.id);
      if (index !== -1) {
        state.folders[index] = { ...state.folders[index], ...action.payload };
      }
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter(folder => folder.id !== action.payload);
      // Move notes from deleted folder to "All Notes"
      state.notes = state.notes.map(note => 
        note.folderId === action.payload ? { ...note, folderId: null } : note
      );
    },
    setActiveNote: (state, action) => {
      state.activeNoteId = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setPreviewMode: (state, action) => {
      state.isPreviewMode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
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
} = notesSlice.actions;

export default notesSlice.reducer;