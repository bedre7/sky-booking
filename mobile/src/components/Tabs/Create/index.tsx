import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import appTheme from "../../../styles";
import OptionItem from "./OptionItem";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AddRouteForm from "./AddRouteForm";
import RegisterPlaneForm from "./RegisterPlaneForm";
import CreateFlightForm from "./CreateFlightForm";

const Create = () => {
  const [modalIsActive, setModalIsActive] = useState({
    route: false,
    airplane: false,
    flight: false,
  });

  const onClose = (id: string) => {
    setModalIsActive({ ...modalIsActive, [id]: false });
  };

  const onPress = (id: string) => {
    setModalIsActive({ ...modalIsActive, [id]: true });
  };

  return (
    <View style={styles.container}>
      <OptionItem
        id="route"
        modalIsVisible={modalIsActive.route}
        option="Add route"
        onPress={onPress}
        icon={
          <FontAwesome5
            name="route"
            size={24}
            color={appTheme.colors.primary}
          />
        }
      >
        <AddRouteForm id="route" onClose={onClose} />
      </OptionItem>
      <OptionItem
        id="airplane"
        modalIsVisible={modalIsActive.airplane}
        option="Register airplane"
        onPress={onPress}
        icon={
          <MaterialCommunityIcons
            name="airplane-plus"
            size={24}
            color={appTheme.colors.primary}
          />
        }
      >
        <RegisterPlaneForm id="airplane" onClose={onClose} />
      </OptionItem>
      <OptionItem
        id="flight"
        modalIsVisible={modalIsActive.flight}
        option="Create flight"
        onPress={onPress}
        icon={
          <MaterialIcons
            name="flight-takeoff"
            size={24}
            color={appTheme.colors.primary}
          />
        }
      >
        <CreateFlightForm id="flight" onClose={onClose} />
      </OptionItem>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: appTheme.colors.gray8,
  },
});
