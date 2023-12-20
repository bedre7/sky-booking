import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import TicketItem from "./TicketItem";
import appTheme from "../../../styles";
import { useFlightManagement } from "../../../context/flight-management";
import { Ionicons } from "@expo/vector-icons";

const Tickets = () => {
  const { tickets, fetchTickets } = useFlightManagement();

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <View style={styles.container}>
      {tickets.length > 0 ? (
        <FlatList
          data={tickets}
          renderItem={({ item }) => <TicketItem {...item} />}
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

export default Tickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
  },
});
