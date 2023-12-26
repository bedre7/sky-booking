import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import appTheme from "../../../styles";
import FlightItem from "./FlightItem";
import SearchFlightForm from "./SearchFlightForm";
import { useFlightManagement } from "../../../context/flight-management";
import { Ionicons } from "@expo/vector-icons";

const Booking = () => {
  const { loading, flights, fetchFlights } = useFlightManagement();

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <View style={styles.container}>
      <SearchFlightForm />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={appTheme.colors.primary}
          style={{ flex: 1, marginTop: 20 }}
        />
      ) : flights.length > 0 ? (
        <FlatList
          data={flights}
          renderItem={({ item }) => (
            <FlightItem
              id={item.id}
              origin={item.route.origin}
              destination={item.route.destination}
              departure={item.departureTime}
              arrival={item.arrivalTime}
              price={item.price}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="ios-sad-outline"
            size={32}
            color={appTheme.colors.gray5}
          />
          <Text style={{ fontSize: 18, color: appTheme.colors.gray5 }}>
            No flights available
          </Text>
        </View>
      )}
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
    overflow: "scroll",
  },
});
