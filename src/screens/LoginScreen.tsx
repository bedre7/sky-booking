import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import appTheme from "../styles";
import { useAuth } from "../context/Auth";

const LoginScreen = () => {
  const { loading, error, login } = useAuth();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.header}>Login</Text>
      <LoginForm onLogin={login} error={error} loading={loading} />
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
    fontFamily: appTheme.fontFamily.primary,
    color: appTheme.colors.gray3,
    marginBottom: 30,
    textAlign: "left",
  },
});
