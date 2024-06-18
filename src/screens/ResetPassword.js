import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";

const ResetPassword = ({ route, navigation }) => {
  const { token } = route.params; // Get the token from route parameters
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Toast.error("Passwords do not match");
      return;
    }

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
        Toast.success("Password updated successfully!");
        navigation.navigate("Login");
      } else {
        Toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Toast.error("Error updating password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <ToastManager position="top" />
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.passwordContainer}>
            <TextInput
              mode="outlined"
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry={!secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye" : "eye-off"}
                  color="grey"
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              mode="outlined"
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry={!secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye" : "eye-off"}
                  color="grey"
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
            />
          </View>
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
  passwordContainer: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ResetPassword;
