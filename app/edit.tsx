import { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Button, Card } from "react-native-paper";
import useNotesStore from "../hooks/useNotes";
import { Note } from "@/types/Note";

export default function EditScreen() {
  const params = useLocalSearchParams();
  const editing: Note | undefined = params.note
    ? JSON.parse(params.note as string)
    : undefined;

  const addNote = useNotesStore((state) => state.addNote);
  const updateNote = useNotesStore((state) => state.updateNote);

  const [title, setTitle] = useState(editing?.title ?? "");
  const [body, setBody] = useState(editing?.body ?? "");
  const [image, setImage] = useState<string | null>(editing?.image ?? null);

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera access is required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function save() {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    if (editing) {
      updateNote(editing.id, { title, body, image });
    } else {
      addNote({ title, body, image });
    }

    router.back();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Description"
          value={body}
          onChangeText={setBody}
          mode="outlined"
          multiline
          numberOfLines={5}
          style={styles.input}
        />

        {image && (
          <Card style={styles.imageCard}>
            <Card.Cover source={{ uri: image }} />
          </Card>
        )}

        <View style={styles.buttonGroup}>
          <Button
            mode="outlined"
            icon="camera"
            onPress={takePhoto}
            style={styles.imageButton}
          >
            Camera
          </Button>
          <Button
            mode="outlined"
            icon="image"
            onPress={pickImage}
            style={styles.imageButton}
          >
            Gallery
          </Button>
        </View>

        <Button
          mode="contained"
          icon="content-save"
          onPress={save}
          style={styles.saveButton}
        >
          Save Note
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  imageCard: {
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  imageButton: {
    flex: 1,
  },
  saveButton: {
    paddingVertical: 6,
  },
});