import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import TicketItem from "./TicketItem";
import appTheme from "../../../styles";

const tickets = [
  {
    id: 1,
    origin: "Hanoi",
    destination: "Ho Chi Minh",
    departureTime: "2021-05-25T10:00:00.000Z",
    arrivalTime: "2021-05-25T11:00:00.000Z",
    seatNumber: "A01",
  },
  {
    id: 2,
    origin: "Hanoi",
    destination: "Ho Chi Minh",
    departureTime: "2021-05-25T10:00:00.000Z",
    arrivalTime: "2021-05-25T11:00:00.000Z",
    seatNumber: "A01",
  },
  {
    id: 3,
    origin: "Hanoi",
    destination: "Ho Chi Minh",
    departureTime: "2021-05-25T10:00:00.000Z",
    arrivalTime: "2021-05-25T11:00:00.000Z",
    seatNumber: "A01",
  },
];

const Tickets = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={({ item }) => <TicketItem {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Tickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
  },
});
