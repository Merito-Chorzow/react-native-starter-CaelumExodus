import { useEffect, useState } from "react";
import { fetchNotes } from "@/api/notesApi";
import { Note } from "@/types/Note";

export default function useNotes() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		setLoading(true);
		const data = await fetchNotes();

		const mapped = data.map((n: any) => ({
			id: n.id,
			title: n.title,
			body: n.body,
			image: null,
		}));

		setNotes(mapped);
		setLoading(false);
	}

	function addNote(newNote: Partial<Note>) {
		const note: Note = {
			id: Date.now(),
			title: newNote.title ?? "New Note",
			body: newNote.body ?? "",
			image: newNote.image ?? null,
		};
		setNotes((prev) => [note, ...prev]);
	}

	return { notes, loading, addNote };
}
