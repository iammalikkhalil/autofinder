import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";

const cities = [
  "Exterior", "Interior", "Internal"
];

const CategorySelect = ({ isVisible, onClose, onSelectLocation }) => {
  const [searchText, setSearchText] = useState("");

  const handleLocationSelect = (city) => {
    onSelectLocation(city);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search City"
            value={searchText}
            onChangeText={setSearchText}
          />
          <ScrollView>
            {cities
              .filter((city) =>
                city.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((city) => (
                <TouchableOpacity
                  key={city}
                  style={styles.cityItem}
                  onPress={() => handleLocationSelect(city)}
                >
                  <Text>{city}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
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
    height: 350,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default CategorySelect;

