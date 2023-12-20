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
