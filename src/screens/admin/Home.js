import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Dashboard from "./Dashboard";
import Distributor from "../distributor/Distribution";

const Home = () => {
  return (
    <View style={styles.container}>
      <Dashboard />
      <Distributor />
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
