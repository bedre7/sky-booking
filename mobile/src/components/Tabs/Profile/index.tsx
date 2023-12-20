import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../common/Button";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../../../context/Auth";
import appTheme from "../../../styles";

const Profile = () => {
  const { currentUser, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <UserAvatar username={currentUser?.username} />
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Username:</Text>
        <Text style={styles.text}>{currentUser?.username}</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Email Address:</Text>
        <Text style={styles.text}>{currentUser?.email}</Text>
      </View>
      <Button onPress={logout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: appTheme.colors.gray8,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: appTheme.colors.gray5,
  },
  themeButton: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
});
