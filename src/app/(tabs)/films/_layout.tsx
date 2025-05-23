import { Stack } from "expo-router";

import colors from "@/constants/colors";

export default function FilmsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.tint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: colors.black,
        },
        headerBackButtonDisplayMode: "minimal",
        contentStyle: {
          backgroundColor: colors.darkGrey,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Star Wars" }} />
      <Stack.Screen name="[id]" options={{ title: "Film Details" }} />
    </Stack>
  );
}
