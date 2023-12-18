import { Alert, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import appTheme from "../../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import Button from "../../common/Button";
import DatePicker from "react-native-modern-datepicker";
import { FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import { useFlightManagement } from "../../../context/flight-management";

const SearchFlightForm = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const { filterFlights } = useFlightManagement();

  const validationSchema = Yup.object().shape({
    from: Yup.string(),
    to: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
    },
    onSubmit: (values) => {
      filterFlights(values.from, values.to, departureDate);
    },
    validationSchema,
  });

  useEffect(() => {
    if (formik.values.from && formik.values.to && departureDate) {
      formik.handleSubmit();
    }
  }, [formik.values.from, formik.values.to, departureDate]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <View style={styles.inputGroup}>
            <FontAwesome5
              name="map-marker"
              size={24}
              color={appTheme.colors.gray5}
            />
            <Input
              placeholder="From"
              value={formik.values.from}
              onUpdateValue={formik.handleChange("from")}
              errorMessage={formik.errors.from}
            />
          </View>
          <View style={styles.inputGroup}>
            <FontAwesome5
              name="flag-checkered"
              size={18}
              color={appTheme.colors.gray5}
            />
            <Input
              placeholder="To"
              value={formik.values.to}
              onUpdateValue={formik.handleChange("to")}
              errorMessage={formik.errors.to}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            {showDatePicker ? (
              <Feather name="check" size={24} color={appTheme.colors.green} />
            ) : (
              <AntDesign
                name="calendar"
                size={24}
                color={appTheme.colors.green}
              />
            )}
          </Button>
        </View>
      </View>
      {showDatePicker && (
        <DatePicker
          minimumDate={new Date().toISOString()}
          style={{ marginTop: 10 }}
          options={{
            backgroundColor: appTheme.colors.gray6,
            textHeaderColor: appTheme.colors.gray2,
            textDefaultColor: "#F6E7C1",
            selectedTextColor: appTheme.colors.gray2,
            mainColor: "#F4722B",
            textSecondaryColor: "#D6C7A1",
            borderColor: "rgba(122, 146, 165, 0.1)",
          }}
          mode="calendar"
          onSelectedChange={(date) => setDepartureDate(date)}
        />
      )}
      {departureDate && (
        <Text style={styles.title}>
          * Flights on
          <Text style={styles.titleBold}> {departureDate}</Text>
        </Text>
      )}
    </View>
  );
};

export default SearchFlightForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  form: {
    width: "100%",
    flexDirection: "row",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    maxWidth: "85%",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    paddingRight: 100,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: appTheme.colors.gray6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 12,
    color: appTheme.colors.gray5,
    paddingHorizontal: 20,
  },
  titleBold: {
    fontWeight: "bold",
    fontSize: 13,
    color: appTheme.colors.red,
  },
});
