import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./src/context/Auth";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";
import React from "react";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
