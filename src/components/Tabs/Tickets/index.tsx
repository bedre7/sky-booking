import { StyleSheet, Text, View } from "react-native";
import React from "react";
import appTheme from "../../../styles";

const Tickets = () => {
  return (
    <View style={styles.container}>
      <Text>Tickets</Text>
    </View>
  );
};

export default Tickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.colors.gray8,
  },
});
