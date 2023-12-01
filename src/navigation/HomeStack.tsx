import { View, Text } from "react-native";
import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

export type BottomStackParamList = {
  Flights: undefined;
  Create: undefined;
  Profile: undefined;
  Booking: undefined;
  Tickets: undefined;
};

const BottomTab = createBottomTabNavigator<BottomStackParamList>();
export type HomeStackProps = BottomTabNavigationProp<BottomStackParamList>;

const HomeStack = () => {
  return (
    <View>
      <Text>HomeStack</Text>
    </View>
  );
};

export default HomeStack;
