import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios"; // Import axios library

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State for password visibility

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://stock-management-system-server.onrender.com/admin/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        navigation.navigate("Home");
      } else {
        Toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Toast.error("Error Logging In");
    }
  };

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
      <ToastManager position="top" />
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            mode="outline"
            underlineColor="transparent"
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon name="user" color="#000" size={24} />}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              mode="outline"
              underlineColor="transparent"
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              left={<TextInput.Icon name="lock" color="#000" size={24} />}
              right={
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.iconContainer}
                >
                  <Icon
                    name={secureTextEntry ? "eye-off" : "eye"}
                    size={24}
                    color="grey"
                  />
                </TouchableOpacity>
              }
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.iconContainer}
            >
              <Icon
                name={secureTextEntry ? "eye-off" : "eye"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={{
              backgroundColor: "#1b3d9e",
              marginTop: 16,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: 30,
              borderBottomEndRadius: 30,
              borderBottomLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
  card: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    elevation: 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomColor: "transparent",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    elevation: 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomColor: "transparent",
  },
  iconContainer: {
    padding: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1b3d9e",
    elevation: 10,
    height: "100px",
  },
});

export default Login;
