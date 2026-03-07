import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AuthProvider from "@/providers/AuthProvider";
import { useAuth } from "@/ctx/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IntroScreen from "@/components/auth/IntroScreen";
import {Toaster} from "sonner-native";
import 'react-native-reanimated'
import { useDeepLinking } from "@/hooks/useDeepLinking";
import { useEffect } from "react";
export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutNav() {
  const { session, loading, profile } = useAuth();
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // handle deep linking for magic link sign in
  useDeepLinking();

  useEffect(() => {
    if (!loading && session){
      if (!profile || !profile.onboarding_completed){ 
        const inOnboarding = segments[0] === "onboarding";

        if (!inOnboarding) {
          // redirect to onboarding if not completed
          router.replace("/onboarding");
        }
      }
    }
  }, [session, profile,loading, segments]);

  if (!loaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }

  console.log("Session:", session);

  if (!session) {
    return (
      <ThemeProvider
      value={DefaultTheme}>
        <GestureHandlerRootView style={styles.container}>
            <IntroScreen  />
            <Toaster />
          </GestureHandlerRootView>

      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)"  />
        <Stack.Screen name="onboarding" />
    
      </Stack>
      <Toaster />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
