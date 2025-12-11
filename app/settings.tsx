import { View, StyleSheet } from "react-native";
import { Card, Text, List, Divider } from "react-native-paper";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            About App
          </Text>
          <Divider style={styles.divider} />
          <List.Item
            title="Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          <List.Item
            title="Author"
            description="Your Name"
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="Platform"
            description="React Native + Expo"
            left={(props) => <List.Icon {...props} icon="react" />}
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    elevation: 2,
  },
  title: {
    fontWeight: "600",
    marginBottom: 8,
  },
  divider: {
    marginBottom: 8,
  },
});