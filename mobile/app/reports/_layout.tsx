import { Stack } from "expo-router";

export default function ReportsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="latest/index"
        options={{
          title: "Latest Reports",
          headerTitleStyle: { fontFamily: "JakartaSans-Bold" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="your/index"
        options={{
          title: "Your Reports",
          headerTitleStyle: { fontFamily: "JakartaSans-Bold" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="[id]/index" options={{ title: "" }} />
    </Stack>
  );
}
