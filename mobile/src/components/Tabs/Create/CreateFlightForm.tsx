import { Alert, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../../common/Input";
import Button from "../../common/Button";
import appTheme from "../../../styles";
import DatePicker from "react-native-modern-datepicker";
import { SelectList } from "react-native-dropdown-select-list";

interface CreateFlightFormProps {
  id: string;
  onClose: (id: string) => void;
}

const routes = [
  {
    id: 1,
    origin: "JFK",
    destination: "LAX",
  },
  {
    id: 2,
    origin: "LAX",
    destination: "JFK",
  },
  {
    id: 3,
    origin: "LAX",
    destination: "SFO",
  },
];
const routesDropdown = routes.map((route) => ({
  key: route.id,
  value: `${route.origin} - ${route.destination}`,
}));

const airplanes = [
  {
    id: 1,
    model: "Boeing 737",
    capacity: 48,
  },
  {
    id: 2,
    model: "Boeing 747",
    capacity: 60,
  },
  {
    id: 3,
    model: "Boeing 757",
    capacity: 72,
  },
];

const airplanesDropdown = airplanes.map((airplane) => ({
  key: airplane.id,
  value: `${airplane.model} - ${airplane.capacity}`,
}));

const CreateFlightForm: FC<CreateFlightFormProps> = ({ id, onClose }) => {
  const [showCalendar, setShowCalendar] = useState({
    departureTime: false,
    arrivalTime: false,
  });
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [route, setRoute] = useState();
  const [airplane, setAirplane] = useState();

  const validationSchema = yup.object().shape({
    flightNumber: yup.string().required("Flight Number is required"),
    price: yup.number().required("Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      flightNumber: "",
      price: "",
    },
    validationSchema,
    onSubmit: ({ flightNumber, price }) => {
      Alert.alert(
        flightNumber + price + departureTime + arrivalTime + route + airplane
      );
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
        <Input
          placeholder="Price"
          value={formik.values.price.toString()}
          onUpdateValue={(value) => {
            formik.setFieldValue("price", parseInt(value) || 0);
          }}
          errorMessage={formik.errors.price}
        />
        <Button
          style={{ marginTop: 10 }}
          onPress={() =>
            setShowCalendar({
              ...showCalendar,
              departureTime: !showCalendar.departureTime,
            })
          }
        >
          {showCalendar.departureTime ? "Hide" : "Set Departure Time"}
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
        <Button
          style={{ marginTop: 10, backgroundColor: appTheme.colors.gray6 }}
          onPress={() =>
            setShowCalendar({
              ...showCalendar,
              arrivalTime: !showCalendar.arrivalTime,
            })
          }
        >
          {showCalendar.arrivalTime ? "Hide" : "Set Arrival Time"}
        </Button>
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
        <SelectList
          inputStyles={styles.dropdown}
          dropdownTextStyles={styles.dropdown}
          dropdownStyles={styles.dropdown}
          search={false}
          data={routesDropdown}
          setSelected={setRoute}
          save="key"
          placeholder="Select Route"
          boxStyles={styles.dropdown}
        />
        <SelectList
          inputStyles={styles.dropdown}
          dropdownTextStyles={styles.dropdown}
          dropdownStyles={styles.dropdown}
          search={false}
          data={airplanesDropdown}
          setSelected={setAirplane}
          save="key"
          placeholder="Select Airplane"
          boxStyles={styles.dropdown}
        />
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
    gap: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    gap: 4,
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
    marginTop: 10,
    backgroundColor: appTheme.colors.gray6,
    borderColor: appTheme.colors.gray6,
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
