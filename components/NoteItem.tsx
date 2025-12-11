import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { Note } from "@/types/Note";

export default function NoteItem({
  item,
  onPress,
}: {
  item: Note;
  onPress: () => void;
}) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover
        source={
          item.image
            ? { uri: item.image }
            : require("../assets/placeholder.png")
        }
        style={styles.cover}
      />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>
          {item.title}
        </Text>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.body}>
          {item.body || "No description"}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cover: {
    height: 160,
  },
  content: {
    paddingTop: 12,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  body: {
    color: "#666",
  },
});