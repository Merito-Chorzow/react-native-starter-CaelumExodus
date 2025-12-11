import { useLocalSearchParams, router } from "expo-router";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import useNotesStore from "../hooks/useNotes";

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const noteId = params.noteId ? Number(params.noteId) : null;

  const note = useNotesStore((state) =>
    state.notes.find((n) => n.id === noteId)
  );

  if (!note) {
    return (
      <View style={styles.notFound}>
        <Text variant="titleLarge">Note not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover
          source={
            note.image
              ? { uri: note.image }
              : require("../assets/placeholder.png")
          }
          style={styles.image}
        />
        <Card.Content style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            {note.title}
          </Text>
          <Text variant="bodyLarge" style={styles.body}>
            {note.body ?? "No description"}
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        icon="pencil"
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/edit",
            params: { note: JSON.stringify(note) },
          })
        }
      >
        Edit Note
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  image: {
    height: 250,
  },
  content: {
    paddingTop: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  body: {
    lineHeight: 24,
    color: "#444",
  },
  button: {
    margin: 16,
    marginTop: 8,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});