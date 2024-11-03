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

const carModels = [
  "Toyota Corolla",
  "Honda Civic",
  "Suzuki Alto",
  "Hyundai Elantra",
  "Ford Mustang",
  "BMW X5",
  "Mercedes-Benz C-Class",
  "Audi A4",
  "Volkswagen Golf",
  "Tesla Model S",
  // Add more car models as needed
];

const CarModelFilter = ({ isVisible, onClose, onSelectModel }) => {
  const [searchText, setSearchText] = useState("");

  const handleModelSelect = (model) => {
    onSelectModel(model);
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
            placeholder="Search Car Model"
            value={searchText}
            onChangeText={setSearchText}
          />
          <ScrollView>
            {carModels
              .filter((model) =>
                model.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((model) => (
                <TouchableOpacity
                  key={model}
                  style={styles.modelItem}
                  onPress={() => handleModelSelect(model)}
                >
                  <Text>{model}</Text>
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
  modelItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default CarModelFilter;
