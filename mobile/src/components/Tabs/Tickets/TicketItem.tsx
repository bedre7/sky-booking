import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { ITicket } from "../../../models";
import { getDuration } from "../../../utils";
import appTheme from "../../../styles";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TicketItem: FC<ITicket> = ({
  origin,
  destination,
  departureTime,
  arrivalTime,
  seatNumber,
}) => {
  const duration = getDuration(departureTime, arrivalTime);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.row}>
          <Text style={styles.text}>{origin}</Text>
          <Entypo
            style={styles.line}
            name="flow-line"
            size={36}
            color={appTheme.colors.gray5}
          />
          <Text style={styles.text}>{destination}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{departureTime.substring(11, 16)}</Text>
          <Ionicons
            name="airplane-outline"
            size={16}
            color={appTheme.colors.gray5}
          />
          <Text style={styles.time}>{arrivalTime.substring(11, 16)}</Text>
        </View>
        <View style={styles.duration}>
          <Ionicons name="time-outline" size={16} color={appTheme.colors.red} />
          <Text style={styles.text}>{duration.toString()}</Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="seat-passenger"
        size={32}
        color={appTheme.colors.primary}
      >
        {seatNumber}
      </MaterialCommunityIcons>
    </View>
  );
};

export default TicketItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: appTheme.colors.gray6,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    marginVertical: 2,
  },
  main: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: appTheme.colors.gray3,
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
  duration: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  line: {
    transform: [{ rotate: "90deg" }, { translateX: -8 }],
  },
});
