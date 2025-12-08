import { create } from "zustand";
import { Note } from "../types/Note";
import { fetchNotes } from "../api/notesApi";

type NotesStore = {
  notes: Note[];
  loading: boolean;
  loadNotes: () => Promise<void>;
  addNote: (note: Partial<Note>) => void;
  updateNote: (id: number, updated: Partial<Note>) => void;
};

const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  loading: false,

  loadNotes: async () => {
    set({ loading: true });
    try {
      const apiNotes = await fetchNotes();
      const mapped = apiNotes.map((n: any) => ({
        id: n.id,
        title: n.title,
        body: n.body,
        image: null,
      }));
      set({ notes: mapped, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  addNote: (newNote) => {
    const fullNote: Note = {
      id: Date.now(),
      title: newNote.title ?? "Untitled",
      body: newNote.body ?? "",
      image: newNote.image ?? null,
    };
    set({ notes: [fullNote, ...get().notes] });
  },

  updateNote: (id, updated) => {
    set({
      notes: get().notes.map((n) => (n.id === id ? { ...n, ...updated } : n)),
    });
  },
}));

export default useNotesStore;
