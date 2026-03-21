import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const slides = [
  {
    title: "Starting A Game",
    content: [
      "Tap Create Game to become the host.",
      "• Choose the number of teams and players",
      "• Set the timer duration per turn",
      "• Set the number of skips allowed",
      "• Choose which themes to play with",
      "• Share the PIN with everyone so they can join",
      "• Tap Start Game when everyone is in",
      "Once the game starts, you play like everyone else.",
    ],
  },
  {
    title: "Joining A Game",
    content: [
      "Not hosting? No account needed.",
      "• Tap Play as Guest on the home screen",
      "• Enter the PIN from the host",
      "• Wait for the host to start the game",
      "That's it — you're in.",
    ],
  },
  {
    title: "Taking A Turn",
    content: [
      "• One player is the describer, everyone else guesses",
      "• Describe the word on screen without saying it",
      "• Tap Next ✓ each time a word is guessed — that's your point",
      "• Tap Skip to pass — but skips are limited",
      "• The describer rotates each turn so everyone gets a go",
    ],
  },
  {
    title: "Themes",
    content: [
      "Your theme advances automatically as your score grows:",
      "Objects → Action → Nature → World → Person → Random",
      "The further you get, the trickier it gets.",
      "Upgraded members can unlock additional themes.",
    ],
  },
  {
    title: "Winning",
    content: [
      "• The host sets the points target before the game starts",
      "• First team to reach the target wins",
      "Good luck!",
    ],
  },
];

export default function RulesScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;
  const slide = slides[currentIndex];

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.inner}>

        {/* Header */}
        <Text style={styles.pageTitle}>How To Play</Text>

        {/* Dot indicators */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* Slide title - fixed position */}
        <Text style={styles.slideTitle}>{slide.title}</Text>

        {/* Slide content */}
        <View style={styles.slide}>
          {slide.content.map((line, i) => (
            <Text key={i} style={styles.slideLine}>{line}</Text>
          ))}
        </View>

        {/* Navigation buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, isFirst && styles.buttonDisabled]}
            onPress={() => setCurrentIndex(currentIndex - 1)}
            disabled={isFirst}
          >
            <Text style={styles.buttonSecondaryText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => isLast ? router.push("/(tabs)") : setCurrentIndex(currentIndex + 1)}
            disabled={false}
          >
            <Text style={styles.buttonText}>{isLast ? "Let's Play!" : "Next"}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
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
  slideTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#000",
    paddingLeft: 10,
  },
  slide: {
    flex: 1,
  },
  slideLine: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  button: {
    flex: 1,
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
  buttonDisabled: {
    opacity: 0.3,
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
});
