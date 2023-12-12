import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { Children, FC, useState } from "react";
import appTheme from "../../../styles";
import CreateModal from "./CreateModal";

type OptionItemProps = {
  option: string;
  id: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  modalIsVisible: boolean;
  onPress: (id: string) => void;
};

const OptionItem: FC<OptionItemProps> = ({
  id,
  icon,
  option,
  onPress,
  children,
  modalIsVisible,
}) => {
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <CreateModal visible={modalIsVisible}>{children}</CreateModal>
      <View style={styles.innerContainer}>
        {icon}
        <Text style={styles.text}>{option}</Text>
      </View>
    </Pressable>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  innerContainer: {
    borderRadius: 5,
    backgroundColor: appTheme.colors.gray6,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 20,
    color: appTheme.colors.gray5,
    marginLeft: 15,
  },
  pressed: {
    opacity: 0.5,
  },
});
