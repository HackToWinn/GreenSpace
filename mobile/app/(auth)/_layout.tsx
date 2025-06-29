import "react-native-get-random-values";
// import checkAuth from "@/lib/checkAuth";
import {  Stack, } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
