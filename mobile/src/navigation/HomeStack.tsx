import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Booking, Tickets, Create, Profile } from "../components/Tabs";
import appTheme from "../styles";
import { Ionicons } from "@expo/vector-icons";
import LogoutIcon from "../components/LogoutIcon";
import BookingStackScreen from "../components/Tabs/Booking/BookingStack";

export type BottomStackParamList = {
  Create: undefined;
  Profile: undefined;
  BookingStack: undefined;
  Tickets: undefined;
};

const BottomTab = createBottomTabNavigator<BottomStackParamList>();
export type HomeStackProps = BottomTabNavigationProp<BottomStackParamList>;

const HomeStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: appTheme.colors.gray7 },
        headerTintColor: appTheme.colors.primary,
        tabBarStyle: { backgroundColor: appTheme.colors.gray9 },
        tabBarActiveTintColor: appTheme.colors.primary,
        headerRight: () => <LogoutIcon />,
      }}
    >
      <BottomTab.Screen
        name="BookingStack"
        component={BookingStackScreen}
        options={{
          headerTitle: "Booking",
          tabBarLabel: "Booking",
          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Create"
        component={Create}
        options={{
          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tickets"
        component={Tickets}
        options={{
          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeStack;
