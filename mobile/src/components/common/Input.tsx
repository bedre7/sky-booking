import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import appTheme from "../../styles";

type InputProps = {
  label?: string;
  onUpdateValue: (value: string) => void;
  value: string;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  secure?: boolean;
  errorMessage?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  onUpdateValue,
  value,
  keyboardType,
  placeholder,
  secure,
  errorMessage,
}) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            isTouched && errorMessage ? styles.invalidLabel : null,
          ]}
        >
          {label}
        </Text>
      )}

      <TextInput
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={[
          styles.input,
          isFocused && styles.focused,
          isTouched && errorMessage
            ? styles.invalidInput
            : isTouched && styles.valid,
        ]}
        keyboardType={keyboardType || "default"}
        autoCapitalize="none"
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={appTheme.colors.gray8}
      />
      {isTouched && errorMessage && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
    color: appTheme.colors.gray4,
  },
  input: {
    padding: 10,
    backgroundColor: appTheme.colors.gray6,
    color: appTheme.colors.gray2,
    borderRadius: 5,
    fontSize: 20,
    width: "100%",
  },
  invalidLabel: {
    color: appTheme.colors.orangered,
  },
  invalidInput: {
    borderColor: appTheme.colors.orangered,
    borderWidth: 1,
  },
  valid: {
    borderColor: appTheme.colors.green,
    borderWidth: 1,
  },
  focused: {
    borderColor: appTheme.colors.primary,
    borderWidth: 1,
  },
  error: {
    marginTop: 5,
    color: appTheme.colors.orangered,
    fontSize: 11,
  },
});
