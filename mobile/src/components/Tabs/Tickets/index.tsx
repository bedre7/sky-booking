import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import appTheme from '../../../styles';

interface SeatProps {
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

const Seat: React.FC<SeatProps> = ({ id, selected, onSelect }) => (
  <TouchableOpacity
    style={[styles.seat, selected && styles.selectedSeat]}
    onPress={() => onSelect(id)}
  >
    <Text style={styles.seatText}>{id}</Text>
  </TouchableOpacity>
);

const Tickets: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatSelection = (seatId: string) => {
    // Toggle seat selection
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.seatGrid}>
        {/* Render your grid of seats */}
        {Array.from({ length: 12 }, (_, row) => (
          <View key={row} style={styles.seatRow}>
            {Array.from({ length: 3 }, (_, col) => (
              <Seat
                key={col}
                id={`${String.fromCharCode(65 + row)}${col + 1}`}
                selected={selectedSeats.includes(`${String.fromCharCode(65 + row)}${col + 1}`)}
                onSelect={handleSeatSelection}
              />
            ))}
            {Array.from({ length: 3 }, (_, col) => (
              <Seat
                key={col}
                id={`${String.fromCharCode(65 + row)}${col + 1}`}
                selected={selectedSeats.includes(`${String.fromCharCode(65 + row)}${col + 1}`)}
                onSelect={handleSeatSelection}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.selectedSeatsText}>
        Selected Seats: {selectedSeats.join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.colors.gray8,
  },
  seatGrid: {
    flexDirection: 'column',
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: '#4caf50', // Change color for selected seats
  },
  seatText: {
    fontSize: 14,
  },
  selectedSeatsText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tickets;
