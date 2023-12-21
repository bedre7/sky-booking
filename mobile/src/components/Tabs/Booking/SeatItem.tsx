import { FC } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import appTheme from "../../../styles";

interface SeatProps {
  id: number;
  index: number;
  seatNumber: string;
  isAvaliable: boolean;
  selected: boolean;
  onSelect: () => void;
}

const SeatItem: FC<SeatProps> = ({
  index,
  isAvaliable,
  seatNumber,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[
      styles.seat,
      { marginRight: (index + 1) % 6 === 3 ? 30 : 5 },
      isAvaliable ? styles.available : styles.unavailableSeat,
      selected && styles.selectedSeat,
    ]}
    onPress={onSelect}
    disabled={!isAvaliable}
  >
    <Text style={styles.seatText}>{seatNumber}</Text>
  </TouchableOpacity>
);

export default SeatItem;

const styles = StyleSheet.create({
  seat: {
    width: 36,
    height: 36,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: appTheme.colors.green,
  },
  unavailableSeat: {
    backgroundColor: appTheme.colors.red,
  },
  available: {
    backgroundColor: appTheme.colors.gray5,
  },
  seatText: {
    fontSize: 14,
  },
});
