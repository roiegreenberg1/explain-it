import { ReactNode } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function DismissKeyboard({ children }: { children: ReactNode }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
