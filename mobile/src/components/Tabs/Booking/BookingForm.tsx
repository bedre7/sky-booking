import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import appTheme from "../../../styles";
import Button from "../../common/Button";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useFlightManagement } from "../../../context/flight-management";
import { useNavigation } from "@react-navigation/native";
import { BookingStackParamList, BookingStackProps } from "./BookingStack";
import { ISeat } from "../../../models";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

interface SeatProps {
  id: number;
  index: number;
  seatNumber: string;
  isAvaliable: boolean;
  selected: boolean;
  onSelect: () => void;
}

const SeatItem: FC<SeatProps> = ({
  index,
  isAvaliable,
  seatNumber,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[
      styles.seat,
      { marginRight: (index + 1) % 6 === 3 ? 30 : 5 },
      isAvaliable ? styles.available : styles.unavailableSeat,
      selected && styles.selectedSeat,
    ]}
    onPress={onSelect}
    disabled={!isAvaliable}
  >
    <Text style={styles.seatText}>{seatNumber}</Text>
  </TouchableOpacity>
);

interface Props
  extends NativeStackScreenProps<BookingStackParamList, "BookingForm"> {}

const BookingForm: FC<Props> = ({ route }) => {
  const [selectedSeat, setSelectedSeat] = useState<ISeat | null>(null);
  const { loading, selectedFlight, fetchFlightDetails, createReservation } =
    useFlightManagement();
  const navigation = useNavigation<BookingStackProps>();
  const { flightId } = route.params;

  useEffect(() => {
    fetchFlightDetails(flightId);
  }, [flightId]);

  if (loading && !selectedFlight) {
    return (
      <ActivityIndicator
        size="large"
        color={appTheme.colors.primary}
        style={{
          flex: 1,
          backgroundColor: appTheme.colors.gray8,
        }}
      />
    );
  }

  const onReserve = () => {
    createReservation(flightId, selectedSeat?.id!)
      .then(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: `Seat ${selectedSeat?.seatNumber} has been reserved`,
          button: "Close",
          onHide: () => {
            navigation.navigate("Booking");
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
  };

  return (
    <AlertNotificationRoot theme="dark">
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>{selectedFlight?.route.origin}</Text>
            <Entypo
              style={styles.line}
              name="flow-line"
              size={36}
              color={appTheme.colors.gray5}
            />
            <Text style={styles.routeText}>
              {selectedFlight?.route.destination}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {selectedFlight?.departureTime.substring(11, 16)}
            </Text>
            <Ionicons
              name="airplane-outline"
              size={16}
              color={appTheme.colors.gray5}
            />
            <Text style={styles.time}>
              {selectedFlight?.arrivalTime.substring(11, 16)}
            </Text>
          </View>
          <View style={styles.seatPriceContainer}>
            <MaterialCommunityIcons
              name="seat-passenger"
              size={32}
              color={appTheme.colors.primary}
            >
              {selectedSeat?.seatNumber}
            </MaterialCommunityIcons>
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>${selectedFlight?.price}</Text>
            </View>
          </View>
          <Text style={styles.subHeader}>Choose seat</Text>
          <FlatList
            data={selectedFlight?.seats}
            renderItem={({ item, index }) => (
              <SeatItem
                id={item.id}
                index={index}
                seatNumber={item.seatNumber}
                selected={item.seatNumber === selectedSeat?.seatNumber}
                isAvaliable={item.isAvaliable}
                onSelect={() => setSelectedSeat(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={6}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.saveButton}
            onPress={onReserve}
            disabled={!selectedSeat}
            loading={loading}
          >
            Reserve
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Booking");
            }}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </View>
      </View>
    </AlertNotificationRoot>
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
    marginBottom: 10,
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
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  seat: {
    width: 36,
    height: 36,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: appTheme.colors.green,
  },
  unavailableSeat: {
    backgroundColor: appTheme.colors.red,
  },
  available: {
    backgroundColor: appTheme.colors.gray5,
  },
  seatText: {
    fontSize: 14,
  },
  routeInfo: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 30,
    marginVertical: 10,
  },
  routeText: {
    fontSize: 18,
    color: appTheme.colors.gray5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: appTheme.colors.green,
    fontSize: 16,
  },
  line: {
    transform: [{ rotate: "90deg" }, { translateX: -8 }],
  },
  priceBox: {
    backgroundColor: appTheme.colors.green,
    color: appTheme.colors.white,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  priceText: {
    color: appTheme.colors.white,
    fontWeight: "bold",
    fontSize: 24,
  },
  seatPriceContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 30,
    marginVertical: 10,
  },
});
