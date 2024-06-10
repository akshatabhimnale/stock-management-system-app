import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Icon, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const L = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.welcometext}>Welcome!</Text>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../assets/login.png")}
          style={styles.topImage}
        />
      </View>
      <View>
        <Text style={styles.signInText}>Sign in your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          mode="outline"
          underlineColor="transparent"
          label="User name or Email"
          left={({ size, color }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          mode="outline"
          underlineColor="transparent"
          label="Password"
          secureTextEntry={secureTextEntry}
          left={({ size, color }) => (
            <SimpleLineIcons name="lock" size={size} color={color} />
          )}
          right={({ size, color }) => (
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.iconContainer}
            >
              <Icon
                name={secureTextEntry ? "eye-off" : "eye"}
                size="3px"
                color="white"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default L;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  topImageContainer: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 6,
  },
  topImage: {
    width: "100%",
    height: 600,
    resizeMode: "contain",
  },
  welcometext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 70,
    color: "#1b3d9e",
    marginTop: 90,
  },
  signInText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#A0A0A0",
    marginBottom: 30,
  },
  inputContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 20,
    alignItems: "center", // Align the icon and text vertically
  },
  iconContainer: {
    // Adjust the spacing between icon and text as needed
  },
  textInput: {
    flex: 1, // Allow the text input to take up remaining space
    padding: 2,
    height: 70,

    elevation: 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomColor: "transparent",
  },
});
