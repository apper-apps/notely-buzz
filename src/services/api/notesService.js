import notesData from "@/services/mockData/notes.json";
import foldersData from "@/services/mockData/folders.json";

let notes = [...notesData];
let folders = [...foldersData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const notesService = {
  async getAllNotes() {
    await delay(300);
    return [...notes];
  },

  async getNoteById(id) {
    await delay(200);
    const note = notes.find(n => n.Id === parseInt(id));
    return note ? { ...note } : null;
  },

async createNote(noteData) {
    await delay(250);
    const newNote = {
      Id: Math.max(...notes.map(n => n.Id), 0) + 1,
      title: noteData.title || "Untitled Note",
      content: noteData.content || "",
      folderId: noteData.folderId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      ...noteData
    };
    notes.push(newNote);
    
    // Update folder note count
    if (newNote.folderId) {
      const folder = folders.find(f => f.Id === parseInt(newNote.folderId));
      if (folder) {
        folder.noteCount++;
      }
    }
    
    return { ...newNote };
  },

  async updateNote(id, updates) {
    await delay(200);
    const index = notes.findIndex(n => n.Id === parseInt(id));
    if (index !== -1) {
      const oldFolderId = notes[index].folderId;
      notes[index] = {
        ...notes[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Update folder note counts if folder changed
      if (oldFolderId !== updates.folderId) {
        if (oldFolderId) {
          const oldFolder = folders.find(f => f.Id === parseInt(oldFolderId));
          if (oldFolder) oldFolder.noteCount--;
        }
        if (updates.folderId) {
          const newFolder = folders.find(f => f.Id === parseInt(updates.folderId));
          if (newFolder) newFolder.noteCount++;
        }
      }
      
      return { ...notes[index] };
    }
    return null;
  },

  async deleteNote(id) {
    await delay(200);
    const index = notes.findIndex(n => n.Id === parseInt(id));
    if (index !== -1) {
      const note = notes[index];
      notes.splice(index, 1);
      
      // Update folder note count
      if (note.folderId) {
        const folder = folders.find(f => f.Id === parseInt(note.folderId));
        if (folder) {
          folder.noteCount--;
        }
      }
      
      return true;
    }
    return false;
  },

  async searchNotes(query) {
    await delay(300);
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm)
    );
  },

  async getAllFolders() {
    await delay(200);
    return [...folders];
  },

  async getFolderById(id) {
    await delay(200);
    const folder = folders.find(f => f.Id === parseInt(id));
    return folder ? { ...folder } : null;
  },

  async createFolder(folderData) {
    await delay(250);
    const newFolder = {
      Id: Math.max(...folders.map(f => f.Id), 0) + 1,
      name: folderData.name || "New Folder",
      color: folderData.color || "#5B4B8A",
      createdAt: new Date().toISOString(),
      noteCount: 0,
      ...folderData
    };
    folders.push(newFolder);
    return { ...newFolder };
  },

  async updateFolder(id, updates) {
    await delay(200);
    const index = folders.findIndex(f => f.Id === parseInt(id));
    if (index !== -1) {
      folders[index] = {
        ...folders[index],
        ...updates
      };
      return { ...folders[index] };
    }
    return null;
  },

  async deleteFolder(id) {
    await delay(200);
    const index = folders.findIndex(f => f.Id === parseInt(id));
    if (index !== -1) {
      folders.splice(index, 1);
      
      // Move notes from deleted folder to "All Notes" (null folderId)
      notes = notes.map(note => 
        note.folderId === id ? { ...note, folderId: null } : note
      );
      
      return true;
    }
    return false;
  },

  async getNotesByFolder(folderId) {
    await delay(200);
    if (folderId === null) {
      return notes.filter(note => !note.folderId);
    }
    return notes.filter(note => note.folderId === folderId);
  }
};