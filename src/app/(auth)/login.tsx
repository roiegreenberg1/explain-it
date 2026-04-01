import DismissKeyboard from "@/src/components/DismissKeyboard";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const[isLoading, setIsLoading] = useState(false);

  const { signIn, signInAsGuest } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <DismissKeyboard>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign In To Continue</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Email..."
              placeholderTextColor={"#999"}
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password..."
              placeholderTextColor={"#999"}
              autoComplete="password"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              {isLoading ? (
                <ActivityIndicator size={24} color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={styles.linkButtonText}>
                Don't have an account? {" "}
                <Text style={styles.linkButtonTextBold}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.linkButton}
              onPress={async () => {
                await signInAsGuest();
                router.replace("/(tabs)");
              }}
            >
              <Text style={styles.linkButtonTextBold}>PLAY AS GUEST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 24,
    alignItems: "center",
  },
  linkButtonText: {
    marginTop: 24,
  },
  linkButtonTextBold: {
    marginTop: 24,
    fontWeight: "bold",
  },
});
