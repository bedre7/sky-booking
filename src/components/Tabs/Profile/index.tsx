import { StyleSheet, Text, View } from "react-native";
import React from "react";
import appTheme from "../../../styles";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.colors.gray8,
  },
});
