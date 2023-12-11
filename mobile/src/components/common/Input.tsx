import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import appTheme from "../../styles";

type InputProps = {
  label: string;
  onUpdateValue: (value: string) => void;
  value: string;
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
  secure,
  errorMessage,
}) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          isTouched && errorMessage ? styles.invalidLabel : null,
        ]}
      >
        {label}
      </Text>

      <TextInput
        onBlur={() => setIsTouched(true)}
        style={[
          styles.input,
          isTouched && errorMessage
            ? styles.invalidInput
            : isTouched && styles.valid,
        ]}
        keyboardType={keyboardType || "default"}
        autoCapitalize="none"
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
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
  error: {
    marginTop: 5,
    color: appTheme.colors.orangered,
    fontSize: 11,
  },
});
