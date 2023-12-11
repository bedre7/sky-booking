import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Booking, Flights, Tickets, Create, Profile } from "../components/Tabs";
import appTheme from "../styles";
import { Ionicons } from "@expo/vector-icons";
import LogoutIcon from "../components/LogoutIcon";

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
        name="Flights"
        component={Flights}
        options={{
          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane" size={size} color={color} />
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
        name="Booking"
        component={Booking}
        options={{
          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
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
