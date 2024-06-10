// Sidebar.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Switch, Text, TouchableRipple } from "react-native-paper";

export default function Sidebar(props) {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    navigation.navigate("Login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement dark mode toggle logic
    console.log("Dark mode toggled:", isDarkMode);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <DrawerItem
          label="Inventory"
          onPress={() => navigation.navigate("Dashboard")}
        />
        <DrawerItem
          label="Distributions"
          onPress={() => navigation.navigate("Distributions")}
        />
        <DrawerItem label="Logout" onPress={handleLogout} />
        <TouchableRipple onPress={toggleDarkMode}>
          <View style={styles.preference}>
            <Text>Dark Mode</Text>
            <View pointerEvents="none">
              <Switch value={isDarkMode} />
            </View>
          </View>
        </TouchableRipple>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
