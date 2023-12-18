import { Modal, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import appTheme from "../../../styles";
import Button from "../../common/Button";

interface IBookingFormProps {
  flightId: number;
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const flight = {
  id: 1,
  departureTime: "2023-12-18T22:30:00.000Z",
  arrivalTime: "2023-12-19T00:45:00.000Z",
  price: 850,
  route: {
    origin: "New York, NY",
    destination: "Los Angeles, CA",
  },
  airplaneId: 3,
  seats: [
    {
      id: 109,
      seatNumber: "1A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 110,
      seatNumber: "1B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 111,
      seatNumber: "1C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 112,
      seatNumber: "1D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 113,
      seatNumber: "1E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 114,
      seatNumber: "1F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 115,
      seatNumber: "2A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 116,
      seatNumber: "2B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 117,
      seatNumber: "2C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 118,
      seatNumber: "2D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 119,
      seatNumber: "2E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 120,
      seatNumber: "2F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 121,
      seatNumber: "3A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 122,
      seatNumber: "3B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 123,
      seatNumber: "3C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 124,
      seatNumber: "3D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 125,
      seatNumber: "3E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 126,
      seatNumber: "3F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 127,
      seatNumber: "4A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 128,
      seatNumber: "4B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 129,
      seatNumber: "4C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 130,
      seatNumber: "4D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 131,
      seatNumber: "4E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 132,
      seatNumber: "4F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 133,
      seatNumber: "5A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 134,
      seatNumber: "5B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 135,
      seatNumber: "5C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 136,
      seatNumber: "5D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 137,
      seatNumber: "5E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 138,
      seatNumber: "5F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 139,
      seatNumber: "6A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 140,
      seatNumber: "6B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 141,
      seatNumber: "6C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 142,
      seatNumber: "6D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 143,
      seatNumber: "6E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 144,
      seatNumber: "6F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 145,
      seatNumber: "7A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 146,
      seatNumber: "7B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 147,
      seatNumber: "7C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 148,
      seatNumber: "7D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 149,
      seatNumber: "7E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 150,
      seatNumber: "7F",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 151,
      seatNumber: "8A",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 152,
      seatNumber: "8B",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 153,
      seatNumber: "8C",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 154,
      seatNumber: "8D",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 155,
      seatNumber: "8E",
      airplaneId: 3,
      isAvaliable: true,
    },
    {
      id: 156,
      seatNumber: "8F",
      airplaneId: 3,
      isAvaliable: true,
    },
  ],
};

const BookingForm: FC<IBookingFormProps> = ({
  flightId,
  visible,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal visible={visible} animationType="slide" style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}>Booking flight</Text>
        <Text style={styles.subHeader}>Choose seat</Text>
        
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.saveButton} onPress={onSubmit}>
          Proceed
        </Button>
        <Button style={styles.cancelButton} onPress={() => onClose()}>
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
    gap: 0,
  },
  header: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "500",
    color: appTheme.colors.primary,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "500",
    color: appTheme.colors.gray5,
  },
  main: {
    backgroundColor: appTheme.colors.gray8,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
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
