import { AuthProvider } from "@/src/context/AuthContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
import useTheme from "@/src/hooks/useTheme";
import { LanguageProvider } from "@/src/i18n/LanguageProvider";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

// We need a nested component to access the theme hook
function ThemedLayout() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "right", "left"]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <ThemedLayout />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
