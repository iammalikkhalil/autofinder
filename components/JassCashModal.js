// JazzCashModal.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const JazzCashModal = ({ onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>JazzCash Payment</Text>
        <View>
          <Text style={styles.textColor}>Title</Text>
          <Text>Muhammad Asif Khan</Text>
        </View>
        <Text>................................................</Text>
        <View>
          <Text style={styles.textColor}>Phone Number</Text>
          <Text>0334-8400943</Text>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    // alignItems: "center",
  },
  textColor: {
    fontSize: 16,
    color: "#bd2a2a",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#bd2a2a",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default JazzCashModal;
