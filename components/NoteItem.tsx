import { TouchableOpacity, View, Text, Image } from "react-native";
import { Note } from "@/types/Note";

export default function NoteItem({item,onPress,}: {item: Note;onPress: () => void;}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				flexDirection: "row",
				padding: 12,
				marginVertical: 6,
				backgroundColor: "#eee",
				borderRadius: 8,
			}}
		>
			<Image
				source={
					item.image
						? { uri: item.image }
						: require("../assets/placeholder.png")
				}
				style={{ width: 60, height: 60, borderRadius: 6, marginRight: 12 }}
			/>
			<View style={{ flex: 1 }}>
				<Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
				<Text numberOfLines={1} style={{ color: "#555" }}>
					{item.body}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
