import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import appTheme from "../styles";
import SignupForm from "../components/Auth/SignupForm";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.header}>Sign up</Text>
      <SignupForm />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: appTheme.colors.gray8,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  header: {
    fontSize: 25,
    color: appTheme.colors.gray3,
    marginBottom: 10,
    textAlign: "left",
  },
});
