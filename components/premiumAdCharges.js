import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PremiumAdCharges = ({ isVisible, onClose, data }) => {
  const navigation = useNavigation();

  const handlePackageSelect = (days, priceToPay) => {
    // Close the modal when navigating
    onClose();
    // Navigate to the checkout screen and pass days and price as route params
    navigation.navigate("checkoutCarInspection", {
      days,
      priceToPay,
      service: "000",
      ...data,
    });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Premium Ad Charges</Text>
          <View style={styles.packagesContainer}>
            <View style={styles.packageOption}>
              <TouchableOpacity
                onPress={() => handlePackageSelect("7", "1500")}
              >
                <Text style={styles.packageText}>
                  7 days package - PKR 1500{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.packageOption}>
              <TouchableOpacity
                onPress={() => handlePackageSelect("15", "2250")}
              >
                <Text style={styles.packageText}>
                  15 days package - PKR 2250
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.packageOption}>
              <TouchableOpacity
                onPress={() => handlePackageSelect("30", "3150")}
              >
                <Text style={styles.packageText}>
                  30 days package - PKR 3150
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
    elevation: 5,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#bd2a2a",
  },
  packagesContainer: {
    marginBottom: 20,
  },
  packageOption: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#2884ec",
    borderRadius: 5,
    width: "100%",
  },
  packageText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "center",
    paddingVertical: 10,
    backgroundColor: "red",
    borderRadius: 5,
    width: "30%",
    marginLeft: 30,
    marginRight: 30,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default PremiumAdCharges;
