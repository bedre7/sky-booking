import { Alert, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../../common/Input";
import appTheme from "../../../styles";
import Button from "../../common/Button";
import { SelectList } from "react-native-dropdown-select-list";
import { useFlightManagement } from "../../../context/flight-management";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

interface RegisterPlaneFormProps {
  id: string;
  onClose: (id: string) => void;
}

const RegisterPlaneForm: FC<RegisterPlaneFormProps> = ({ id, onClose }) => {
  const [capacity, setCapacity] = useState("");
  const { loading, registerPlane } = useFlightManagement();
  const capacityOptions = [
    { key: "48", value: 48 },
    { key: "60", value: 60 },
    { key: "72", value: 72 },
  ];

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    model: yup.string().required("Model is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      model: "",
    },
    validationSchema,
    onSubmit: ({ name, model }) => {
      registerPlane(name, model, parseInt(capacity))
        .then(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `Plane ${name} - ${model} has been registered`,
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

  return (
    <AlertNotificationRoot theme="dark">
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.header}>Register Plane</Text>
          <Input
            placeholder="Name"
            value={formik.values.name}
            onUpdateValue={formik.handleChange("name")}
            errorMessage={formik.errors.name}
          />
          <Input
            placeholder="Model"
            value={formik.values.model}
            onUpdateValue={formik.handleChange("model")}
            errorMessage={formik.errors.model}
          />
          <SelectList
            inputStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdown}
            dropdownStyles={styles.dropdown}
            search={false}
            data={capacityOptions}
            setSelected={setCapacity}
            save="value"
            placeholder="Set Capacity"
            boxStyles={styles.dropdown}
          />
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
    </AlertNotificationRoot>
  );
};

export default RegisterPlaneForm;

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
    gap: 3,
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
    color: appTheme.colors.gray5,
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
});
