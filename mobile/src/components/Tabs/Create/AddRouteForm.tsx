import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../../common/Input";
import { FontAwesome5 } from "@expo/vector-icons";
import appTheme from "../../../styles";
import Button from "../../common/Button";
import { useFlightManagement } from "../../../context/flight-management";

interface AddRouteFormProps {
  id: string;
  onClose: (id: string) => void;
}

const AddRouteForm: FC<AddRouteFormProps> = ({ id, onClose }) => {
  const { loading, error, createRoute } = useFlightManagement();

  const validationSchema = yup.object().shape({
    origin: yup.string().required("Origin is required"),
    destination: yup.string().required("Destination is required"),
  });

  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
    },
    validationSchema,
    onSubmit: ({ origin, destination }) => {
      createRoute(origin, destination).then((route) => {
        if (route) {
          onClose(id);
        }
      });
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Add Route</Text>
        <View style={styles.inputGroup}>
          <FontAwesome5
            name="map-marker"
            size={24}
            color={appTheme.colors.primary}
          />
          <Input
            placeholder="Origin"
            value={formik.values.origin}
            onUpdateValue={formik.handleChange("origin")}
            errorMessage={formik.errors.origin}
          />
        </View>
        <View style={styles.inputGroup}>
          <FontAwesome5
            name="flag-checkered"
            size={18}
            color={appTheme.colors.primary}
          />
          <Input
            placeholder="Destination"
            value={formik.values.destination}
            onUpdateValue={formik.handleChange("destination")}
            errorMessage={formik.errors.destination}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={formik.handleSubmit}
          style={styles.saveButton}
          loading={loading}
        >
          Save
        </Button>
        <Button onPress={() => onClose(id)} style={styles.cancelButton}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default AddRouteForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    gap: 15,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "500",
    color: appTheme.colors.primary,
    backgroundColor: appTheme.colors.gray8,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: "85%",
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
    paddingBottom: 12,
  },
  error: {
    color: appTheme.colors.red,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
});
