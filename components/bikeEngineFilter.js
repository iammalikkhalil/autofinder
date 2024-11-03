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

const brands = [
  "2 Stroke",
  "4 Stroke",
];

const BikeEngineFilter = ({ isVisible, onClose, onSelectEngine }) => {
  const [searchText, setSearchText] = useState("");

  const handleBrandSelect = (brand) => {
    onSelectEngine(brand);
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
            placeholder="Search Brand"
            value={searchText}
            onChangeText={setSearchText}
          />
          <ScrollView>
            {brands
              .filter((brand) =>
                brand.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={styles.brandItem}
                  onPress={() => handleBrandSelect(brand)}
                >
                  <Text>{brand}</Text>
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
  brandItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default BikeEngineFilter;
