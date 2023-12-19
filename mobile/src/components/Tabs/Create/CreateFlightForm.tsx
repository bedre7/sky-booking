import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../../common/Input";
import Button from "../../common/Button";
import appTheme from "../../../styles";
import DatePicker from "react-native-modern-datepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useFlightManagement } from "../../../context/flight-management";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

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
  const [route, setRoute] = useState<number>();
  const [airplane, setAirplane] = useState<number>();
  const {
    loading,
    airplanes,
    routes,
    getAvailablePlanes,
    createFlight,
    fetchRoutes,
  } = useFlightManagement();

  const airplanesDropdown = airplanes.map((airplane) => ({
    key: airplane.id,
    value: `${airplane.name} - ${airplane.model}`,
  }));
  const routesDropdown = routes.map((route) => ({
    key: route.id,
    value: `${route.origin} - ${route.destination}`,
  }));

  const validationSchema = yup.object().shape({
    flightNumber: yup.string().required("Flight Number is required"),
    price: yup.number().required("Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      flightNumber: "",
      price: 0,
    },
    validationSchema,
    onSubmit: ({ flightNumber, price }) => {
      createFlight(
        departureTime,
        arrivalTime,
        flightNumber,
        price,
        Number(route)!,
        Number(airplane)!
      )
        .then(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `Flight ${flightNumber} has been created`,
            button: "Close",
            onHide: () => {
              onClose(id);
            },
          });
        })
        .catch((error) => {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Warning",
            textBody: error.message,
          });
        });
    },
  });

  useEffect(() => {
    if (departureTime && arrivalTime) {
      getAvailablePlanes(departureTime, arrivalTime);
    }
  }, [departureTime, arrivalTime]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <AlertNotificationRoot theme="dark">
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
          <View style={styles.dateButtonsContainer}>
            <View style={styles.dateButtonsWrapper}>
              <Text style={styles.timeHeader}>Departure Time</Text>
              <Button
                style={styles.button}
                onPress={() =>
                  setShowCalendar({
                    ...showCalendar,
                    departureTime: !showCalendar.departureTime,
                  })
                }
              >
                {showCalendar.departureTime ? (
                  <Feather
                    name="check"
                    size={32}
                    color={appTheme.colors.green}
                  />
                ) : (
                  <AntDesign
                    name="calendar"
                    size={32}
                    color={appTheme.colors.green}
                  />
                )}
              </Button>
            </View>
            <View style={styles.dateButtonsWrapper}>
              <Text style={styles.timeHeader}>Arrival Time</Text>
              <Button
                style={styles.button}
                onPress={() =>
                  setShowCalendar({
                    ...showCalendar,
                    arrivalTime: !showCalendar.arrivalTime,
                  })
                }
              >
                {showCalendar.arrivalTime ? (
                  <Feather
                    name="check"
                    size={32}
                    color={appTheme.colors.primary}
                  />
                ) : (
                  <AntDesign
                    name="calendar"
                    size={32}
                    color={appTheme.colors.primary}
                  />
                )}
              </Button>
            </View>
          </View>
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
          <Button
            style={styles.saveButton}
            onPress={formik.handleSubmit}
            loading={loading}
          >
            Save
          </Button>
          <Button style={styles.cancelButton} onPress={() => onClose(id)}>
            Cancel
          </Button>
        </View>
      </View>
    </AlertNotificationRoot>
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
  button: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: appTheme.colors.gray6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  dateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 80,
    marginTop: 10,
  },
  dateButtonsWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timeHeader: {
    color: appTheme.colors.gray5,
    fontSize: 12,
    marginBottom: 10,
  },
});
