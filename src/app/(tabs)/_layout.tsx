import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="people" />
      <Tabs.Screen name="favorites" />
    </Tabs>
  );
}
