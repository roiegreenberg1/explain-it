import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Play</Text>
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
