import { StyleSheet, Text, View } from "react-native";
import React from "react";
import appTheme from "../../../styles";

const Create = () => {
  return (
    <View style={styles.container}>
      <Text>Create</Text>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.colors.gray8,
  },
});
