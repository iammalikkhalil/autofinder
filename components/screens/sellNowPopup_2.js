/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
// Popup.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import carIcon from "../../assets/images/car_icon.png";
import bikeIcon from "../../assets/images/bike_icon.png";
import toolIcon from "../../assets/images/tools_icon.png";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SellNowPopup_2 = ({ visible, onClose, onSelectCategory }) => {
  const { user } = useContext(UserContext);

  const navigation = useNavigation();
  const handleClose = () => {
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  const handleSelectCategory = async (category) => {
    if (onSelectCategory && typeof onSelectCategory === "function") {
      onSelectCategory(category);

      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          navigation.navigate("welcome");
        } else {
          if (category === "Car") {
            navigation.navigate("sellNowChoosePlan");
          }
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.modalText}>What do you want to sell?</Text>

          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <TouchableOpacity onPress={() => handleSelectCategory("Car")}>
              <View style={styles.category}>
                {/* Replace the source with your actual image */}
                <Image source={carIcon} style={styles.categoryImage} />
                <Text style={styles.textDecor}>Car</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSelectCategory("Bike")}>
              <View style={styles.category}>
                {/* Replace the source with your actual image */}
                <Image source={bikeIcon} style={styles.categoryImage} />
                <Text style={styles.textDecor}>Bike</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelectCategory("Auto Parts")}
            >
              <View style={styles.category}>
                {/* Replace the source with your actual image */}
                <Image source={toolIcon} style={styles.categoryImage} />
                <Text style={styles.textDecor}>Parts</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Close modal button */}
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>Close</Text>
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
  innerContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: 330,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  category: {
    alignItems: "center",
    paddingLeft: 5,
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginBottom: 10,
  },
  textDecor: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    fontSize: 14,
    color: "#8b0000",
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
});

export default SellNowPopup_2;
