import { useState } from "react";
import { View, TextInput, Button, Image, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import useNotes from "../hooks/useNotes";
import { Note } from "@/types/Note";
import useNotesStore from "../hooks/useNotes";
import * as ImagePicker from "expo-image-picker";

export default function EditScreen() {
	const params = useLocalSearchParams();
	const editing: Note | undefined = params.note
		? JSON.parse(params.note as string)
		: undefined;


    const addNote = useNotesStore(state => state.addNote);

	const [title, setTitle] = useState(editing?.title ?? "");
	const [body, setBody] = useState(editing?.body ?? "");
	const [image, setImage] = useState<string | null>(editing?.image ?? null);

	async function takePhoto() {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permission required", "Camera access is required");
			return;
		}

		const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	}

	function save() {
		if (!title.trim()) return Alert.alert("Error", "Title is required");

		addNote({ title, body, image });
		router.back();
	}

	return (
		<View style={{ padding: 20 }}>
			<TextInput
				value={title}
				onChangeText={setTitle}
				placeholder="Title"
				style={{ fontSize: 20, marginBottom: 12 }}
			/>

			<TextInput
				value={body}
				onChangeText={setBody}
				placeholder="Description"
				multiline
				style={{ minHeight: 80, marginBottom: 12 }}
			/>

			<Button title="Take Photo" onPress={takePhoto} />

			{image && (
				<Image
					source={{ uri: image }}
					style={{ width: "100%", height: 200, marginVertical: 12 }}
				/>
			)}

			<Button title="Save" onPress={save} />
		</View>
	);
}
