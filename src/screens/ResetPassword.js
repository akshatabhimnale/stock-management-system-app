import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";

const ResetPassword = ({ route, navigation }) => {
  const { token } = route.params;
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `https://stock-management-system-server.onrender.com/admin/api/reset-password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        Toast.success("Password has been updated!");
        navigation.navigate("Login");
      } else {
        Toast.error(data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      Toast.error("Error resetting password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <ToastManager position="top" />
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            mode="outline"
            underlineColor="transparent"
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            left={<TextInput.Icon icon="lock" color="grey" />}
          />
          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.button}
          >
            Reset Password
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
    borderRadius: 30,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1b3d9e",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
  },
});

export default ResetPassword;
