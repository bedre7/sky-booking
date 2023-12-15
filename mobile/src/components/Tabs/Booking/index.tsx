import { FlatList, StyleSheet, View, Text } from "react-native";
import React from "react";
import appTheme from "../../../styles";
import FlightItem from "./FlightItem";
import BookingForm from "./BookingForm";

const flights = [
  {
    id: 1,
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    departure: "2023/12/14 12:00",
    arrival: "2023/12/14 14:00",
    price: 600,
  },
  {
    id: 2,
    origin: "New Jersey, NJ",
    destination: "Phoenix, AZ",
    departure: "2023/12/14 12:00",
    arrival: "2023/12/14 14:10",
    price: 680,
  },
  {
    id: 3,
    origin: "Istanbul, SW",
    destination: "Valencia, SP",
    departure: "2023/12/14 15:00",
    arrival: "2023/12/14 16:00",
    price: 400,
  },
];

const Booking = () => {
  return (
    <View style={styles.container}>
      <BookingForm />
      <Text style={styles.title}>
        * Flights on
        <Text style={styles.titleBold}> 2023/12/14</Text>
      </Text>
      <FlatList
        data={flights}
        renderItem={({ item }) => (
          <FlightItem
            id={item.id}
            origin={item.origin}
            destination={item.destination}
            departure={item.departure}
            arrival={item.arrival}
            price={item.price}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
