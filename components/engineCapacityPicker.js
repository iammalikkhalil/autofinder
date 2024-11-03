import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EngineCapacityModal = ({ isVisible, onClose, onSelectCapacity }) => {
  const handleCapacitySelect = (capacity) => {
    onSelectCapacity(capacity);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textcar}>Your Car is,</Text>
          <TouchableOpacity
            style={styles.capacityOption}
            onPress={() => handleCapacitySelect("basic-package")}
          >
            <Text style={styles.capacityOptionText}>Upto 1000 CC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.capacityOption}
            onPress={() => handleCapacitySelect("standard-package")}
          >
            <Text style={styles.capacityOptionText}>
              Above 1000 CC and Below 2000 CC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.capacityOption}
            onPress={() => handleCapacitySelect("premium-package")}
          >
            <Text style={styles.capacityOptionText}>Above 2000 CC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: "white" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  capacityOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  capacityOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#bd2a2a",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  textcar: {
    color: "#bd2a2a",
    fontWeight: "bold",
  },
});

export default EngineCapacityModal;
