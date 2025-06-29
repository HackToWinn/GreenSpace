import { ProfileProvider } from "@/context/ProfileContext";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
const queryClient = new QueryClient();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "JakartaSans-Bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "JakartaSans-BoldItalic": require("@/assets/fonts/PlusJakartaSans-BoldItalic.ttf"),
    "JakartaSans-ExtraBold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "JakartaSans-ExtraBoldItalic": require("@/assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
    "JakartaSans-ExtraLight": require("@/assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "JakartaSans-ExtraLightItalic": require("@/assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf"),
    "JakartaSans-Italic": require("@/assets/fonts/PlusJakartaSans-Italic.ttf"),
    "JakartaSans-Light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
    "JakartaSans-LightItalic": require("@/assets/fonts/PlusJakartaSans-LightItalic.ttf"),
    "JakartaSans-Regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "JakartaSans-SemiBold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "JakartaSans-SemiBoldItalic": require("@/assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <ProfileProvider>
      <QueryClientProvider client={queryClient}>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="reports" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </View>
      </QueryClientProvider>
    </ProfileProvider>
  );
}
