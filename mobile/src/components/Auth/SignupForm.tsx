import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Input from "../common/Input";
import appTheme from "../../styles";
import Button from "../common/Button";
import { AuthStackProps } from "../../navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useFormik } from "formik";

type SignupFormProps = {
  onSignup: (email: string, username: string, password: string) => void;
  error: string | null;
  loading: boolean;
};

const SignupForm: FC<SignupFormProps> = ({ onSignup, error, loading }) => {
  const navigation = useNavigation<AuthStackProps>();
  const onNavigateToLogin = () => navigation.navigate("Login");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, username, password }) => {
      onSignup(email, username, password);
    },
  });

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={formik.values.email}
        keyboardType="email-address"
        onUpdateValue={formik.handleChange("email")}
        errorMessage={formik.errors.email}
      />
      <Input
        label="Username"
        value={formik.values.username}
        onUpdateValue={formik.handleChange("username")}
        errorMessage={formik.errors.username}
      />
      <Input
        label="Password"
        secure={true}
        value={formik.values.password}
        onUpdateValue={formik.handleChange("password")}
        errorMessage={formik.errors.password}
      />
      <Input
        label="Confirm Password"
        secure={true}
        value={formik.values.confirmPassword}
        onUpdateValue={formik.handleChange("confirmPassword")}
        errorMessage={formik.errors.confirmPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        style={styles.button1}
        onPress={formik.handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign up"}
      </Button>
      <Text style={styles.text}>Already have an account? </Text>
      <Button style={styles.button2} onPress={onNavigateToLogin}>
        Login
      </Button>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
    width: "100%",
  },
  button1: {
    marginTop: 20,
  },
  button2: {
    marginTop: 15,
    backgroundColor: appTheme.colors.gray6,
  },
  text: {
    marginTop: 15,
    marginBottom: 0,
    fontSize: 14,
    color: appTheme.colors.gray3,
    textAlign: "center",
  },
  error: {
    marginTop: 5,
    color: appTheme.colors.orangered,
  },
});
