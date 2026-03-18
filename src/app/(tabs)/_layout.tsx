import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Play", 
          tabBarIcon: ({ color, size, focused}) => (
            <Ionicons 
              name={focused ?  "play" : "play-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="about" 
        options={{ 
          title: "Rules", 
          tabBarIcon: ({ color, size, focused}) => (
            <Ionicons 
              name={focused ?  "information-circle" : "information-circle-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile", 
          tabBarIcon: ({ color, size, focused}) => (
            <Ionicons 
              name={focused ?  "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
