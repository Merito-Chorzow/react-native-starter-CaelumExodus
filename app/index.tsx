import { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import { router } from "expo-router";
import NoteItem from "../components/NoteItem";
import useNotesStore from "../hooks/useNotes";

export default function NotesListScreen() {
  const { notes, loading, loadNotes } = useNotesStore();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Button title="Add Note" onPress={() => router.push("/edit")} />

      {loading && <ActivityIndicator size="large" style={{ marginVertical: 20 }} />}

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem
            item={item}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: { noteId: item.id },
              })
            }
          />
        )}
      />

      <Button title="Settings" onPress={() => router.push("/settings")} />
    </View>
  );
}
