import { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import { FAB, ActivityIndicator, Text } from "react-native-paper";
import NoteItem from "../components/NoteItem";
import useNotesStore from "../hooks/useNotes";

export default function NotesListScreen() {
  const { notes, loading, loadNotes } = useNotesStore();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loader}
        />
      )}

      {!loading && notes.length === 0 && (
        <View style={styles.emptyState}>
          <Text variant="titleLarge" style={styles.emptyText}>
            No notes yet
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            Tap the + button to create your first note
          </Text>
        </View>
      )}

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
        contentContainerStyle={styles.listContent}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/edit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  loader: {
    marginVertical: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    marginBottom: 8,
    color: "#666",
  },
  emptySubtext: {
    color: "#999",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});