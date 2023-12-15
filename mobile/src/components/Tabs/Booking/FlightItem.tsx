import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import appTheme from "../../../styles";
import { Ionicons } from "@expo/vector-icons";
import { getDuration } from "../../../utils";
import { Entypo } from "@expo/vector-icons";
interface FlightItemProps {
  id: number;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  price?: number;
}

const FlightItem: FC<FlightItemProps> = (props) => {
  const duration = getDuration(props.departure, props.arrival);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.row}>
          <Text style={styles.text}>{props.origin}</Text>
          <Entypo
            style={styles.line}
            name="flow-line"
            size={36}
            color={appTheme.colors.gray5}
          />
          <Text style={styles.text}>{props.destination}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{props.departure.substring(10)}</Text>
          <Ionicons
            name="airplane-outline"
            size={16}
            color={appTheme.colors.gray5}
          />
          <Text style={styles.time}>{props.arrival.substring(10)}</Text>
        </View>
        <View style={styles.duration}>
          <Ionicons name="time-outline" size={16} color={appTheme.colors.red} />
          <Text style={styles.text}>{duration.toString()}</Text>
        </View>
      </View>
      {props.price && (
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>${props.price}</Text>
        </View>
      )}
    </View>
  );
};

export default FlightItem;

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
    fontSize: 18,
  },
  line: {
    transform: [{ rotate: "90deg" }, { translateX: -8 }],
  },
});