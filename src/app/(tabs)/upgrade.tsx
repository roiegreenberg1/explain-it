import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const premiumThemes = [
  "Food & Drink",
  "Sport",
  "Movies & TV",
  "Music",
  "Science",
  "History",
];

export default function UpgradeScreen() {
  const [themesVisible, setThemesVisible] = useState(false);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.inner}>

        {/* Header */}
        <View>
          <Text style={styles.pageTitle}>Upgrade</Text>
          <Text style={styles.subtitle}>Unlock the full Explain It experience!</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>🎨  More Themes</Text>
            <Text style={styles.featureBody}>Unlock <Text style={styles.bold}>6 additional themes</Text> to make the game more interesting.</Text>
            <TouchableOpacity onPress={() => setThemesVisible(true)}>
              <Text style={styles.link}>See all themes →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>📚  More Words</Text>
            <Text style={styles.featureBody}>Increase the words per theme from 50 to <Text style={styles.bold}>150 words</Text> — keeping the game fresh for longer.</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>👥  More Players</Text>
            <Text style={styles.featureBody}>Host up to <Text style={styles.bold}>16 players</Text> in a single game — giving everyone access to the features above.</Text>
          </View>

        </View>

        {/* Upgrade button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Upgrade for $1.99 AUD</Text>
        </TouchableOpacity>

        <Text style={styles.note}>One-time payment. Only the host needs to upgrade.</Text>

      </View>

      {/* Themes Modal */}
      <Modal
        visible={themesVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setThemesVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Premium Themes</Text>

            <View style={styles.themeList}>
              {premiumThemes.map((theme, i) => (
                <View key={i} style={styles.themeRow}>
                  <Text style={styles.themeName}>{theme}</Text>
                  <Text style={styles.themeBadge}>Premium</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setThemesVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  features: {
    gap: 26,
    marginTop: 12,
    marginBottom: 26,
  },
  featureCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  featureBody: {
    fontSize: 14,
    lineHeight: 21,
    color: "#444",
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textDecorationLine: "underline",
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
  note: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginTop: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  themeList: {
    marginBottom: 24,
    gap: 12,
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  themeName: {
    fontSize: 15,
    fontWeight: "500",
  },
  themeBadge: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
});