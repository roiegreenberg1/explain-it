import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { user } = useAuth();
  const isPremium = user !== null;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "play" : "play-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Rules",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          href: isPremium ? undefined : null, // hide for guests
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="upgrade"
        options={{
          title: "Upgrade",
          href: isPremium ? null : undefined, // hide for premium users
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "arrow-up" : "arrow-up-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
