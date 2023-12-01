import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../context/Auth";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { StatusBar } from "expo-status-bar";
import appTheme from "../styles";
import Constants from "expo-constants";

const AppStack = () => {
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.rootScreen}>
        <StatusBar style="light" />
        <HomeStack />
      </SafeAreaView>
    </View>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  rootScreen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
    alignItems: "center",
    justifyContent: "center",
  },
});
