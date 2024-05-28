// src/screens/Home.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>
      <Dashboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default Home;
