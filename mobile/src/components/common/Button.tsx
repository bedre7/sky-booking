import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { FC, ReactNode } from "react";
import appTheme from "../../styles";

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  style?: any;
  loading?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  onPress,
  children,
  style,
  disabled,
  loading,
}) => {
  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
        loading && styles.loading,
      ]}
      onPress={onPress}
    >
      {loading && <ActivityIndicator color={appTheme.colors.gray2} />}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: appTheme.colors.primary,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.7,
  },
  loading: {
    gap: 3,
    opacity: 0.7,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: appTheme.colors.gray2,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
