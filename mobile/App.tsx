import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./src/context/Auth";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";
import React from "react";
import FlightManagementProvider from "./src/context/flight-management";

export default function App() {
  return (
    <AuthContextProvider>
      <FlightManagementProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppStack />
        </NavigationContainer>
      </FlightManagementProvider>
    </AuthContextProvider>
  );
}
