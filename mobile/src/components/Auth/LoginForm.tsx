import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Input from "../common/Input";
import appTheme from "../../styles";
import Button from "../common/Button";
import { AuthStackProps } from "../../navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useFormik } from "formik";

type LoginFormProps = {
  onLogin: (email: string, password: string) => void;
  error: string | null;
  loading: boolean;
};

const LoginForm: FC<LoginFormProps> = ({ onLogin, error, loading }) => {
  const navigation = useNavigation<AuthStackProps>();
  const onNavigateToSignup = () => navigation.navigate("Signup");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      onLogin(email, password);
    },
  });

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        keyboardType="email-address"
        value={formik.values.email}
        onUpdateValue={formik.handleChange("email")}
        errorMessage={formik.errors.email}
      />
      <Input
        label="Password"
        secure={true}
        value={formik.values.password}
        onUpdateValue={formik.handleChange("password")}
        errorMessage={formik.errors.password}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        style={styles.button1}
        onPress={formik.handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </Button>
      <Text style={styles.text}>Don't have an account?</Text>
      <Button style={styles.button2} onPress={onNavigateToSignup}>
        Sign up
      </Button>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
    width: "100%",
  },
  button1: {
    marginTop: 30,
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
    fontFamily: appTheme.fontFamily.primary,
    textAlign: "center",
  },
  error: {
    marginTop: 5,
    color: appTheme.colors.orangered,
  },
});
