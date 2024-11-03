import React from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";

const PaymentDetailModal = ({ visible, paymentMethod, onClose }) => {
  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case "Cheque":
        return {
          title: "Cheque Details",
          phoneNumber: "0334-8400943",
          address:
            "Office 14/B, 2nd Floor, Kallar Syedan Plaza, G-9 Markaz, Islamabad Pakistan",
          timings: "Monday to Sunday, 10:30 AM - 7:30 PM",
        };
      case "Cash Deposit":
        return {
          title: "Cash Deposit Details",
          phoneNumber: "0334-8400943",
          address:
            "Office 14/B, 2nd Floor, Kallar Syedan Plaza, G-9 Markaz, Islamabad Pakistan",
          timings: "Monday to Sunday, 10:30 AM - 7:30 PM",
        };
      case "Online Deposit":
        return {
          title: "Online Deposit",
          phoneNumber: "0334-8400943",
          address:
            "Office 14/B, 2nd Floor, Kallar Syedan Plaza, G-9 Markaz, Islamabad Pakistan",
          timings: "Monday to Sunday, 10:30 AM - 7:30 PM",
        };
      // case "EasyPaisa":
      //   return {
      //     title: "EasyPaisa",
      //     phoneNumber: "0334-8400943",
      //     address:
      //       "Office 14/B, 2nd Floor, Kallar Syedan Plaza, G-9 Markaz, Islamabad Pakistan",
      //     timings: "Monday to Sunday, 10:30 AM - 7:30 PM",
      //   };
      // case "JazzCash":
      //   return {
      //     title: "JazzCash",
      //     phoneNumber: "0334-8400943",
      //     address:
      //       "Office 14/B, 2nd Floor, Kallar Syedan Plaza, G-9 Markaz, Islamabad Pakistan",
      //     timings: "Monday to Sunday, 10:30 AM - 7:30 PM",
      //   };
      default:
        return null;
    }
  };

  const paymentDetails = getPaymentDetails();

  if (!paymentDetails) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{paymentDetails.title}</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.heading}>Phone Number:</Text>
            <Text style={styles.value}>{paymentDetails.phoneNumber}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.heading}>Office Address:</Text>
            <Text style={styles.value}>{paymentDetails.address}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.heading}>Timings:</Text>
            <Text style={styles.value}>{paymentDetails.timings}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} />
          </View>
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
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#bd2a2a",
  },
  detailContainer: {
    marginBottom: 5,
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#bd2a2a",
    marginBottom: 1,
  },
  value: {
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    alignItems: "center", // Center the button
    marginTop: 10, // Add margin to separate from details
  },
});

export default PaymentDetailModal;
