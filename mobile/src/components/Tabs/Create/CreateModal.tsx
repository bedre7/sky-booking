import { Modal, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import appTheme from "../../../styles";

interface ICreateModalProps {
  children: React.ReactNode;
  visible: boolean;
}

const CreateModal: FC<ICreateModalProps> = ({
  children,
  visible,
}) => {
  return (
    <Modal visible={visible} animationType="slide" style={styles.container}>
      <View style={styles.main}>{children}</View>
    </Modal>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
    gap: 0,
  },
  main: {
    flex: 1,
    backgroundColor: appTheme.colors.gray8,
  }
});
