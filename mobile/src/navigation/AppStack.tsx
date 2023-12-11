import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { StatusBar } from "expo-status-bar";
import appTheme from "../styles";
import Constants from "expo-constants";

const AppStack = () => {
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const { currentUser, refresh } = useAuth();

  useEffect(() => {
    if (!hasRefreshed) {
      refresh();
      setHasRefreshed(true);
    }
  }, [hasRefreshed]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.rootScreen}>
        <StatusBar style="light" />
        {currentUser ? <HomeStack /> : <AuthStack />}
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
