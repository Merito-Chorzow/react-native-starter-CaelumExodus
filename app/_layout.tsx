import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Notes" }} />
        <Stack.Screen name="details" options={{ title: "Details" }} />
        <Stack.Screen name="edit" options={{ title: "Add / Edit" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>
    </PaperProvider>
  );
}