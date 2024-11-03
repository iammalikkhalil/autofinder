import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Expo's icon library

const BodyColorPicker = ({ isVisible, onClose, onSelectColor }) => {
  const handleColorSelect = (color) => {
    onSelectColor(color);
    onClose();
  };

  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.colorItem, { backgroundColor: item.color }]}
      onPress={() => handleColorSelect(item.name)}
    >
      <Text style={styles.colorText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={bodyColors}
            numColumns={5}
            renderItem={renderColorItem}
            keyExtractor={(item) => item.name}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 50,
  },
  colorItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#bd2a2a",
    borderWidth: 1,
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
  colorText: {
    fontSize: 10,
  },
});

// Define color data outside the component
const bodyColors = [
  { name: "White", color: "#FFFFFF" },
  { name: "Black", color: "#000000" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gray", color: "#808080" },
  { name: "Blue", color: "#1E90FF" }, // Dark blue
  { name: "Red", color: "#FF0000" },
  { name: "Green", color: "#008000" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Brown", color: "#8B4513" }, // Saddle Brown
  { name: "Orange", color: "#FFA500" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Gold", color: "#D4AF37" },
  { name: "Dark Gray", color: "#A9A9A9" },
  { name: "Dark Blue", color: "#00008B" },
  { name: "Dark Green", color: "#006400" },
  { name: "Dark Red", color: "#8B0000" },
  { name: "Dark Orange", color: "#FF8C00" },
  { name: "Purple", color: "#800080" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Maroon", color: "#800000" },
  { name: "Navy Blue", color: "#000080" },
  { name: "Olive", color: "#808000" },
  { name: "Teal", color: "#008080" },
  { name: "Cyan", color: "#00FFFF" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "Magenta", color: "#FF00FF" },
  { name: "Peach", color: "#FFE5B4" },
  { name: "Salmon", color: "#FA8072" },
  // Additional colors commonly found in cars
  { name: "Champagne", color: "#F7E7CE" },
  { name: "Bronze", color: "#CD7F32" },
  { name: "Charcoal", color: "#36454F" },
  { name: "Platinum", color: "#E5E4E2" },
  { name: "Pearl", color: "#F0F8FF" },
  { name: "Ivory", color: "#FFFFF0" },
  { name: "Ruby", color: "#E0115F" },
  { name: "Emerald", color: "#50C878" },
  { name: "Sapphire", color: "#0F52BA" },
  { name: "Amethyst", color: "#9966CC" },
  { name: "un-listed", color: "white" },
  // Add more colors as needed
];

// Provide default props
BodyColorPicker.defaultProps = {
  isVisible: false,
  onClose: () => {},
  onSelectColor: () => {},
};

export default BodyColorPicker;
