import { StyleSheet, View } from "react-native";
import React from "react";
import appTheme from "../../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import DatePicker from "react-native-modern-datepicker";

const BookingForm = () => {
  const validationSchema = Yup.object().shape({
    from: Yup.string().required("From is required"),
    to: Yup.string().required("To is required"),
    date: Yup.string().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      date: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="From"
          value={formik.values.from}
          onUpdateValue={formik.handleChange("from")}
          errorMessage={formik.errors.from}
        />
        <Input
          label="To"
          value={formik.values.to}
          onUpdateValue={formik.handleChange("to")}
          errorMessage={formik.errors.to}
        />
        <DatePicker
          minimumDate={new Date().toISOString()}
          mode="calendar"
          options={{
            backgroundColor: appTheme.colors.gray6,
            textHeaderColor: appTheme.colors.gray2,
            textDefaultColor: "#F6E7C1",
            selectedTextColor: appTheme.colors.gray2,
            mainColor: "#F4722B",
            textSecondaryColor: "#D6C7A1",
            borderColor: "rgba(122, 146, 165, 0.1)",
          }}
          onSelectedChange={(date) => formik.setFieldValue("date", date)}
        />
      </View>
    </View>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 100,
    paddingLeft: 10,
  },
  form: {
    width: "100%",
  },
});
