import { View, Text } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={{ padding: 20 }}>
			<Text style={{ fontSize: 22, fontWeight: "600" }}>About App</Text>
			<Text style={{ marginTop: 12 }}>Version: 1.0.0</Text>
			<Text>Author: Your Name</Text>
		</View>
	);
}
