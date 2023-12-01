import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./src/context/Auth";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";
import useCustomFont from "./src/hooks/useCustomFont";
import AppLoading from "expo-app-loading";
import React from "react";

export default function App() {
  const [fontsLoaded] = useCustomFont();

  if (!fontsLoaded) return <AppLoading />;

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
