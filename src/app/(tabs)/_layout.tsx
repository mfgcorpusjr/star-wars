import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "@/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.tint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: colors.black,
        },
        sceneStyle: {
          backgroundColor: colors.darkGrey,
        },
        tabBarActiveTintColor: colors.tint,
        tabBarStyle: {
          backgroundColor: colors.black,
          borderTopWidth: 1,
          borderTopColor: colors.tint,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="films"
        options={{
          headerShown: false,
          tabBarLabel: "Films",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: "Star Wars Characters",
          tabBarLabel: "People",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "My Favorites",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
