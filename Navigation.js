// Navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../app/src/screens/admin/Dashboard";
import Distributor from "./src/screens/distributor/Distribution";
import Sidebar from "./src/components/Sidebar"; // Assuming Sidebar is in the same folder

const Drawer = createDrawerNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Distributions" component={Distributor} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
