import { StyleSheet, Text, View } from "react-native";
import React from "react";
import appTheme from "../../../styles";

const Flights = () => {
  return (
    <View style={styles.container}>
      <Text>Flights</Text>
    </View>
  );
};

export default Flights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.colors.gray8,
  },
});
