import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
// Fonts
import { useFonts } from "expo-font";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Gujranwala",
  "Hyderabad",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Mirpur Khas",
  "Rahim Yar Khan",
  "Gujrat",
  "Jhang",
  "Mardan",
  "Kasur",
  "Dera Ghazi Khan",
  "Sahiwal",
  "Nawabshah",
  "Mingora",
  "Okara",
  "Mandi Bahauddin",
  "Chiniot",
  "Kamalia",
  // Add more cities as needed
];

const LocationPicker = ({ isVisible, onClose, onSelectLocation }) => {
  const [searchText, setSearchText] = useState("");

  const handleLocationSelect = (city) => {
    onSelectLocation(city);
    onClose();
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../assets/fonts/My_Soul/Kanit-Black.ttf"),
  });
  // It Will Load Font
  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    }
  }, [loaded]);
  // It Tells If Font Is Loaded Or If Not Loaded Then Nothing Will Show,
  if (!fontsLoaded) {
    return null;
  }
  // --- Fonts Family ---
  // Main Body
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
                  <Text style={{ fontFamily: "Kanit", letterSpacing: 0.5, }}>{city}</Text>
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

export default LocationPicker;
