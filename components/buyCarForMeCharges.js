import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const BuyCarForMeCharges = ({ visible, onClose, onContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>Initial Payment</Text>
          <Text style={styles.text}>PKR 5000/-</Text>
          <Text style={styles.heading}>Commission: 1%</Text>
          <Text style={styles.text}>
            Will be charged after purchase of your car.
          </Text>
          <Text style={styles.heading}>Note:</Text>
          <Text style={styles.text}>
            Once you have agreed to the eligibility, and made a payment, a
            refund request will not be entertained.
          </Text>
          <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bd2a2a",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#bd2a2a",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BuyCarForMeCharges;
