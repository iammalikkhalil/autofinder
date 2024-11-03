import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation
import CarModelPicker from "../carModelPicker";
import LocationPicker from "../locationPicker";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
// Fonts
import { useFonts } from "expo-font";

export default function BasicinfoCarIns_2({ navigation }) {
  // User
  const { user } = useContext(UserContext);
  // State for location picker modal
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  // State for car model picker modal
  const [carModelModalVisible, setCarModelModalVisible] = useState(false);

  // States for selected values
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Back
  const handleBack = () => {
    navigation.goBack();
  };

  // Open and close location picker
  const handleOpenLocationPicker = () => setLocationModalVisible(true);
  const handleCloseLocationPicker = () => setLocationModalVisible(false);

  // Open and close car model picker
  const handleOpenCarModelPicker = () => setCarModelModalVisible(true);
  const handleCloseCarModelPicker = () => setCarModelModalVisible(false);

  // Handle selection from car model picker
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    handleCloseCarModelPicker();
    console.log("Year:", year);
  };
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    handleCloseCarModelPicker();
    console.log("Brand:", brand);
  };
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    handleCloseCarModelPicker();
    console.log("Model:", model);
  };
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    handleCloseCarModelPicker();
    console.log("Variant:", variant);
  };

  // Handle selection from location picker
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleCloseLocationPicker();
    console.log("Location:", location);
  };

  // --- Submit Btn ---
  const handleSubmit = async () => {
    if (
      !selectedLocation ||
      !selectedBrand ||
      !selectedModel ||
      !selectedYear
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Prepare the data to be sent to the API
    const data = {
      user: user._id, // User ID
      location: selectedLocation, // Selected location
      brand: selectedBrand, // Selected brand
      model: selectedModel, // Selected model
      varient: selectedVariant, // Selected variant
      year: selectedYear, // Selected year
      price: "", // Assuming price is empty
      service: "002", // Static value for service
      image: "", // Assuming image is empty
      approved: false, // Default value for approved
      createdAt: new Date().toISOString(), // Current timestamp
      updatedAt: new Date().toISOString(), // Current timestamp
      __v: 0, // Default version field
    };

    // console.log("Data being sent to API:", data); // Debugging line
    navigation.navigate("checkoutCarInspection", { ...data, service: "002" }); // Replace "NextScreen" with your target screen
  };
  // --- Submit Btn ---

  // --- Fonts Family ---
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/My_Soul/Kanit-Black.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    }
  }, [loaded]);
  if (!fontsLoaded) {
    return null;
  }

  // Main Body
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#bc0000"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Basic info</Text>
        </View>
      </View>
      {/* --- Main Body --- */}
      <Text style={styles.My_ID}>User ID : {user._id ? user._id : " - "}</Text>
      <Text style={styles.My_Text}>
        Please Fill Car Data For Car Inspection
      </Text>
      {/* location */}
      {/* City Selection Input Field */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handleOpenLocationPicker}
      >
        <Text style={styles.label}>Where do you live*</Text>
        <View style={styles.citySelectionField}>
          <Text style={styles.selectedCity}>
            {selectedLocation || "Select city"}
          </Text>
          <Image
            source={require("../../assets/right-arrow.png")}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>

      <LocationPicker
        isVisible={locationModalVisible}
        onClose={handleCloseLocationPicker}
        onSelectLocation={handleLocationSelect}
      />

      {/* Model Brand Year Variant */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handleOpenCarModelPicker}
      >
        <Text style={styles.label}>Tell us about your car brand*</Text>
        <View style={styles.citySelectionField}>
          <Text style={styles.selectedCity}>
            <Text style={styles.selectCarModelText}>
              {selectedYear ? `${selectedYear} ` : ""}
              {selectedBrand ? `${selectedBrand} ` : ""}
              {selectedModel ? `${selectedModel} ` : ""}
              {selectedVariant || "Car Model"}
            </Text>
          </Text>
          <Image
            source={require("../../assets/right-arrow.png")}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>

      <CarModelPicker
        isVisible={carModelModalVisible}
        onClose={handleCloseCarModelPicker}
        onSelectYear={handleYearSelect}
        onSelectBrand={handleBrandSelect}
        onSelectVariant={handleVariantSelect}
        onSelectModel={handleModelSelect}
      />
      {/* Button */}
      <View style={styles.My_Btn_Parent}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#bc0000",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    elevation: 3,
    zIndex: 2,
  },
  backButton: {
    // paddingLeft: 10,
    tintColor: "white",
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
    marginLeft: 5,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontFamily: "Kanit",
    letterSpacing: 1,
    alignSelf: "center",
    paddingBottom: 10,
  },
  contentContainer: {
    padding: 20,
  },
  getStartedText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fc6f03",
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  textField: {
    height: 50,
    borderColor: "#ddd", // Light gray border
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    color: "#333", // Dark text color
  },
  citySelectionField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
  },
  selectedCity: {
    flex: 1,
    color: "#333",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  cityButton: {
    marginVertical: 10,
    // marginHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    // color: 'blue'
  },
  searchInput: {
    height: 40,
    width: 200,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  summaryInput: {
    height: 120,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top", // Allows vertical alignment of text to the top
  },
  nextButton: {
    backgroundColor: "#fc6f03",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  My_Text: {
    borderWidth: 0,
    paddingTop: 50,
    paddingBottom: 50,
    textAlign: "center",
    fontFamily: "HeeboExtra",
    fontSize: 20,
    paddingHorizontal: 20,
    letterSpacing: 1,
  },
  My_Btn_Parent: {
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  My_ID: {
    textAlign: "right",
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 9,
    fontFamily: "Kanit",
  },
});
