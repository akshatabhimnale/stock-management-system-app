import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "https://stock-management-system-server.onrender.com/admin/api/forget-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId: email }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        Toast.success("Password reset link sent!");
      } else {
        Toast.error(data.message);
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      Toast.error("Error requesting password reset");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
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
            left={<TextInput.Icon icon="account" color="grey" />}
          />
          <Button
            mode="contained"
            onPress={handleForgotPassword}
            style={styles.button}
          >
            Send Reset Link
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
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  input: {
    marginBottom: 16,
    elevation: 10,
    backgroundColor: "#FFFFFF",
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1b3d9e",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
  },
});

export default ForgotPassword;
