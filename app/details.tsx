import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Image, Button } from "react-native";
import { Note } from "../types/Note";

export default function DetailsScreen() {
	const params = useLocalSearchParams();
	const note: Note = JSON.parse(params.note as string);

	return (
		<View style={{ padding: 20 }}>
			<Image
				source={
					note.image
						? { uri: note.image }
						: require("../assets/placeholder.png")
				}
				style={{ width: "100%", height: 200, marginBottom: 16 }}
			/>

			<Text style={{ fontSize: 22, fontWeight: "bold" }}>{note.title}</Text>

			<Text style={{ marginTop: 12, fontSize: 16 }}>
				{note.body ?? "No description"}
			</Text>

			<Button
				title="Edit"
				onPress={() =>
					router.push({
						pathname: "/edit",
						params: { note: JSON.stringify(note) },
					})
				}
			/>
		</View>
	);
}
