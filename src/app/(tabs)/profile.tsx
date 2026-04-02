import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.inner}>
        <View>
          <Text style={styles.pageTitle}>Profile</Text>
          <Text style={styles.name}>{user?.firstName} {user?.lastName} ⭐</Text>
          <Text style={styles.email}>Email: {user?.email}</Text>
          <Text style={styles.userThemes}>My themes:</Text>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
    paddingTop: 50,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  userThemes: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});