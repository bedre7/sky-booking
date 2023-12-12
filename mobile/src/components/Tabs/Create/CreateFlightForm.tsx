import { Alert, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../../common/Input";
import Button from "../../common/Button";
import appTheme from "../../../styles";
import DatePicker from "react-native-modern-datepicker";

interface CreateFlightFormProps {
  id: string;
  onClose: (id: string) => void;
}

const CreateFlightForm: FC<CreateFlightFormProps> = ({ id, onClose }) => {
  const [showCalendar, setShowCalendar] = useState({
    departureTime: false,
    arrivalTime: false,
  });
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const validationSchema = yup.object().shape({
    flightNumber: yup.string().required("Flight Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      flightNumber: "",
    },
    validationSchema,
    onSubmit: ({ flightNumber }) => {
      Alert.alert(flightNumber + departureTime + arrivalTime);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Create Flight</Text>
        <Input
          placeholder="Flight Number"
          value={formik.values.flightNumber}
          onUpdateValue={formik.handleChange("flightNumber")}
          errorMessage={formik.errors.flightNumber}
        />
        <Button
          onPress={() =>
            setShowCalendar({
              ...showCalendar,
              departureTime: !showCalendar.departureTime,
            })
          }
        >
          Set Departure Time
        </Button>
        <Button
          style={{ marginTop: 5, backgroundColor: appTheme.colors.gray6 }}
          onPress={() =>
            setShowCalendar({
              ...showCalendar,
              arrivalTime: !showCalendar.arrivalTime,
            })
          }
        >
          Set Arrival Time
        </Button>
        {showCalendar.departureTime && (
          <DatePicker
            minimumDate={new Date().toISOString()}
            options={{
              backgroundColor: appTheme.colors.gray6,
              textHeaderColor: appTheme.colors.gray2,
              textDefaultColor: "#F6E7C1",
              selectedTextColor: appTheme.colors.gray2,
              mainColor: "#F4722B",
              textSecondaryColor: "#D6C7A1",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            onSelectedChange={(date) => setDepartureTime(date)}
          />
        )}
        {showCalendar.arrivalTime && (
          <DatePicker
            minimumDate={new Date().toISOString()}
            options={{
              backgroundColor: appTheme.colors.gray6,
              textHeaderColor: appTheme.colors.gray2,
              textDefaultColor: "#F6E7C1",
              selectedTextColor: appTheme.colors.gray2,
              mainColor: "#F4722B",
              textSecondaryColor: "#D6C7A1",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            onSelectedChange={(date) => setArrivalTime(date)}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.saveButton} onPress={formik.handleSubmit}>
          Save
        </Button>
        <Button style={styles.cancelButton} onPress={() => onClose(id)}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default CreateFlightForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    gap: 15,
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    gap: 8,
  },
  header: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "500",
    color: appTheme.colors.primary,
    backgroundColor: appTheme.colors.gray8,
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: appTheme.colors.gray6,
    color: appTheme.colors.gray2,
  },
  saveButton: {
    paddingHorizontal: 50,
    paddingVertical: 8,
    backgroundColor: appTheme.colors.green,
  },
  cancelButton: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: appTheme.colors.gray6,
  },
  buttonContainer: {
    backgroundColor: appTheme.colors.gray8,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
});
