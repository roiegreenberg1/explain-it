import DismissKeyboard from "@/src/components/DismissKeyboard";
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

export default function OnboardingScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    if (!firstName || !lastName) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // First and last name validation, only English letters
    const nameRegex = /^[a-zA-Z'-\s]+$/;
    if (!nameRegex.test(firstName)) {
      Alert.alert("Error", "First name can only contain English letters.");
      return;
    }

    if (!nameRegex.test(lastName)) {
      Alert.alert("Error", "Last name can only contain English letters.");
      return;
    }

    setIsLoading(true);
    try {
      
    } catch (error) {
      Alert.alert("Error", "Failed to complete the onboarding. Please try again.")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DismissKeyboard>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>Add Your Information To Get Started</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              placeholder="First name..."
              placeholderTextColor={"#999"}
              autoCapitalize="words"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last name..."
              placeholderTextColor={"#999"}
              autoCapitalize="words"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleComplete}>
              {isLoading ? (
                <ActivityIndicator size={24} color="#fff"/>
              ) : ( 
                <Text style={styles.buttonText}>Complete Setup</Text>
              )}
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
  header: {
    marginBottom: 32,
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
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "100%",
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
