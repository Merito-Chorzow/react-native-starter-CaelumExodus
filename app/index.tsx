import { View, FlatList, ActivityIndicator, Button } from "react-native";
import { router } from "expo-router";
import NoteItem from "../components/NoteItem";
import useNotes from "../hooks/useNotes";
import { Note } from "../types/Note";
import useNotesStore from "../hooks/useNotes";
import { useEffect } from 'react';

export default function NotesListScreen() {
	const { notes, loading, loadNotes } = useNotesStore();

	useEffect(() => {
      loadNotes();
    }, []);

	return (
		<View style={{ flex: 1 }}>
			<Button
				title="Add Note"
				onPress={() => router.push("/edit")}
			/>

			{loading && <ActivityIndicator size="large" />}

			<FlatList
				data={notes}
				keyExtractor={(item: Note) => item.id.toString()}
				renderItem={({ item }) => (
					<NoteItem
						item={item}
						onPress={() => router.push({ pathname: "/details", params: { note: JSON.stringify(item) } })}
					/>
				)}
			/>
		</View>
	);
}
