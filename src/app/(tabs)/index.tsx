import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const freeThemes = ["Objects", "Action", "Nature", "World", "Person", "Random"];
const premiumThemes = ["Food & Drink", "Sport", "Movies & TV", "Music", "Science", "History"];

const setupSlides = [
  { key: "timer", label: "Timer Duration", hint: "How many seconds per turn?", unit: "seconds" },
  { key: "skips", label: "Skips Allowed", hint: "How many skips per turn?", unit: "skips" },
  { key: "pointsToWin", label: "Points to Win", hint: "First team to reach this wins.", unit: "points" },
  { key: "themes", label: "Themes", hint: "Select at least 1 theme to play with." },
];

export default function Index() {
  const router = useRouter();
  const { user } = useAuth();
  const isPremium = user !== null;

  const [newGameVisible, setNewGameVisible] = useState(false);
  const [joinGameVisible, setJoinGameVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  const [timer, setTimer] = useState("60");
  const [skips, setSkips] = useState("2");
  const [pointsToWin, setPointsToWin] = useState("42");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([...freeThemes]);

  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === setupSlides.length - 1;
  const currentSlide = setupSlides[slideIndex];

  const toggleTheme = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      if (selectedThemes.length === 1) return;
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const getValueForSlide = (key: string) => {
    if (key === "timer") return timer;
    if (key === "skips") return skips;
    if (key === "pointsToWin") return pointsToWin;
    return "";
  };

  const setValueForSlide = (key: string, value: string) => {
    if (key === "timer") setTimer(value);
    if (key === "skips") setSkips(value);
    if (key === "pointsToWin") setPointsToWin(value);
  };

  const handleCloseNewGame = () => {
    setNewGameVisible(false);
    setSlideIndex(0);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.inner}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Let's Play</Text>
          {!isPremium && (
            <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => router.push("/(tabs)/upgrade")}
          >
            <Text style={styles.upgradeButtonText}>Upgrade ⭐</Text>
          </TouchableOpacity>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setNewGameVisible(true)}
          >
            <Text style={styles.buttonText}>Start New Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => setJoinGameVisible(true)}
          >
            <Text style={styles.buttonSecondaryText}>Join Game</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* New Game Modal */}
      <Modal
        visible={newGameVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseNewGame}
      >
        {/* ← CHANGED: single TouchableWithoutFeedback, no stopPropagation */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>

              <Text style={styles.modalTitle}>{currentSlide.label}</Text>
              <Text style={styles.modalSubtitle}>{currentSlide.hint}</Text>

              {/* Dot indicators */}
              <View style={styles.dots}>
                {setupSlides.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, i === slideIndex && styles.dotActive]}
                  />
                ))}
              </View>

              {/* Slide content */}
              {currentSlide.key === "themes" ? (
                <ScrollView
                  style={styles.themeScroll}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {freeThemes.map((theme) => (
                    <TouchableOpacity
                      key={theme}
                      style={styles.themeRow}
                      onPress={() => toggleTheme(theme)}
                    >
                      <Text style={styles.themeName}>{theme}</Text>
                      <View style={[styles.checkbox, selectedThemes.includes(theme) && styles.checkboxSelected]}>
                        {selectedThemes.includes(theme) && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                    </TouchableOpacity>
                  ))}
                  {premiumThemes.map((theme) => (
                    <TouchableOpacity
                      key={theme}
                      style={styles.themeRow}
                      onPress={() => isPremium && toggleTheme(theme)}
                    >
                      <View style={styles.themeNameRow}>
                        <Text style={[styles.themeName, !isPremium && styles.themeNameLocked]}>{theme}</Text>
                        {!isPremium && <Text style={styles.lockBadge}>🔒 Premium</Text>}
                      </View>
                      <View style={[
                        styles.checkbox,
                        !isPremium && styles.checkboxLocked,
                        isPremium && selectedThemes.includes(theme) && styles.checkboxSelected
                      ]}>
                        {isPremium && selectedThemes.includes(theme) && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                // ← CHANGED: input now matches join game styling
                <TextInput
                  style={styles.input}
                  value={getValueForSlide(currentSlide.key)}
                  onChangeText={(val) => setValueForSlide(currentSlide.key, val)}
                  keyboardType="number-pad"
                  placeholderTextColor="#999"
                />
              )}

              {/* Navigation buttons — same size/style as join game */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
                  onPress={() => isFirstSlide ? handleCloseNewGame() : setSlideIndex(slideIndex - 1)}
                >
                  <Text style={styles.buttonSecondaryText}>{isFirstSlide ? "Cancel" : "Back"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  onPress={() => isLastSlide ? console.log("Begin game") : setSlideIndex(slideIndex + 1)}
                >
                  <Text style={styles.buttonText}>{isLastSlide ? "Begin" : "Next"}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Join Game Modal */}
      <Modal
        visible={joinGameVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setJoinGameVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            {/* ← CHANGED: KeyboardAvoidingView pushes sheet up when keyboard appears */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Join Game</Text>
                <Text style={styles.modalSubtitle}>Enter the 6 digit PIN from the host</Text>

                {/* ← CHANGED: pin input now uses same input style as new game */}
                <TextInput
                  style={[styles.input, styles.pinInput]}
                  value={pin}
                  onChangeText={setPin}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="000000"
                  placeholderTextColor="#999"
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
                    onPress={() => setJoinGameVisible(false)}
                  >
                    <Text style={styles.buttonSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { flex: 1 }]}>
                    <Text style={styles.buttonText}>Join</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  upgradeButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  upgradeButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  buttons: {
    gap: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondaryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  // ← CHANGED: one shared modalContent style for both modals
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
  },
  dotActive: {
    backgroundColor: "#000",
    width: 20,
  },
  // ← CHANGED: one shared input style used by both modals
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 24,
  },
  pinInput: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 8,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  themeScroll: {
    maxHeight: 220,
    marginBottom: 24,
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  themeNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  themeName: {
    fontSize: 15,
    fontWeight: "500",
  },
  themeNameLocked: {
    color: "#aaa",
  },
  lockBadge: {
    fontSize: 12,
    color: "#aaa",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  checkboxLocked: {
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});