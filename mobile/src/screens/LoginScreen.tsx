import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import appTheme from "../styles";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.header}>Login</Text>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: appTheme.colors.gray8,
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 30,
  },
  header: {
    fontSize: 25,
    color: appTheme.colors.gray3,
    marginBottom: 30,
    textAlign: "left",
  },
});
