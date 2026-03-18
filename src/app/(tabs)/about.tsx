import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Rules() {
  return (
    <View style={styles.container}>
      <Text>Rules</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
