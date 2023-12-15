import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../context/Auth";
import { Ionicons } from "@expo/vector-icons";
import appTheme from "../styles";

const LogoutIcon = () => {
  const { logout } = useAuth();

  return (
    <Pressable
      onPress={logout}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons style={styles.icon} name="log-out" size={36} color="white" />
    </Pressable>
  );
};

export default LogoutIcon;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 10,
    color: appTheme.colors.gray5,
  },
});
