import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LocationPicker from "../locationPicker";
import CarModelPicker from "../carModelPicker";
import RegisteredPicker from "../registeredPicker";
import BodyColorPicker from "../bodyColor";
import DescribeYourCar from "./pendingAds";
import FuelTypePicker from "../fuelTypePicker";

// import { Slider } from '@react-native-community/slider';

const FilterSearch = () => {
  // let A = '';
  const navigation = useNavigation();
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [carModelModalVisible, setCarModelModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [registeredModalVisible, setRegisteredModalVisible] = useState(false);
  const [selectedRegisteredLocation, setSelectedRegisteredLocation] =
    useState("");
  const [bodyColorModalVisible, setBodyColorModalVisible] = useState(false);
  const [selectedBodyColor, setSelectedBodyColor] = useState("");
  const [selectedKmDriven, setSelectedKmDriven] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [describeYourCarModalVisible, setDescribeYourCarModalVisible] =
    useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [fuelTypeModalVisible, setFuelTypeModalVisible] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [isFeaturePickerVisible, setIsFeaturePickerVisible] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedDriveOption, setSelectedDriveOption] = useState("");
  const [area, setArea] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };
  const handleOpenLocationPicker = () => {
    setLocationModalVisible(true);
  };
  const handleCloseLocationPicker = () => {
    setLocationModalVisible(false);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // A = location;
    handleCloseLocationPicker();
    // console.log(A);
  };
  const handleOpenCarModelPicker = () => {
    setCarModelModalVisible(true);
  };
  const handleCloseCarModelPicker = () => {
    setCarModelModalVisible(false);
  };
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    handleCloseCarModelPicker();
    // Implement logic to open brand picker
  };
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    handleCloseCarModelPicker();
    // Implement logic to open variant picker
  };
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    handleCloseCarModelPicker();
  };

  const handleOpenRegisteredPicker = () => {
    setRegisteredModalVisible(true);
  };
  const handleCloseRegisteredPicker = () => {
    setRegisteredModalVisible(false);
  };
  const handleRegisteredSelect = (location) => {
    setSelectedRegisteredLocation(location);
    handleCloseRegisteredPicker();
  };
  const handleOpenBodyColorPicker = () => {
    setBodyColorModalVisible(true);
  };
  const handleCloseBodyColorPicker = () => {
    setBodyColorModalVisible(false);
  };
  const handleBodyColorSelect = (color) => {
    setSelectedBodyColor(color);
    handleCloseBodyColorPicker();
  };
  const handleViewSuggestions = () => {
    setDescribeYourCarModalVisible(true);
  };
  const handleDescribeYourCarDone = (selectedOptions) => {
    setSelectedDescription(selectedOptions.join(", "));
    setDescribeYourCarModalVisible(false);
  };
  const handleOpenFuelTypePicker = () => {
    setFuelTypeModalVisible(true);
  };
  const handleCloseFuelTypePicker = () => {
    setFuelTypeModalVisible(false);
  };
  const handleFuelTypeSelect = (fuelType) => {
    setSelectedFuelType(fuelType);
    handleCloseFuelTypePicker();
  };
  const handleFeaturePickerDone = (selectedFeatures) => {
    setSelectedFeatures(selectedFeatures);
    setIsFeaturePickerVisible(false);
  };
  const handlePostYourAd = () => {
    // Handle the logic for posting the ad
    console.log("Ad posted!");
    // Add any additional logic you need for posting the ad
  };

  const handlePremiumAdService = () => {
    // Handle the logic for navigating to Premium Ad Service or any other action
    console.log("Navigate to Premium Ad Service");
  };

  const handleTransmissionSelect = (transmissionType) => {
    setSelectedTransmission(transmissionType);
  };

  const handleDriveOptionSelect = (driveOption) => {
    setSelectedDriveOption(driveOption);
  };

  const handleAssemblySelect = (assemblyType) => {
    setSelectedAssembly(assemblyType);
  };
  const handleSelectAvailability = (availability) => {
    setSelectedAvailability(availability);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Filter Your Search</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.selectLocationButton}
          onPress={handleOpenLocationPicker}
        >
          <Image
            source={require("../../assets/locationIcon.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.selectLocationText}>
            {selectedLocation || "Address"}
          </Text>
        </TouchableOpacity>
        <LocationPicker
          isVisible={locationModalVisible}
          onClose={handleCloseLocationPicker}
          onSelectLocation={handleLocationSelect}
        />

        <TouchableOpacity
          style={styles.selectCarModelButton}
          onPress={handleOpenCarModelPicker}
        >
          <Image
            source={require("../../assets/carFrontIcon.png")}
            style={styles.carModelIcon}
          />
          <Text style={styles.selectCarModelText}>
            {selectedYear ? `${selectedYear} ` : ""}
            {selectedBrand ? `${selectedBrand} ` : ""}
            {selectedVariant || "Car Model"}
          </Text>
        </TouchableOpacity>

        <CarModelPicker
          isVisible={carModelModalVisible}
          onClose={handleCloseCarModelPicker}
          onSelectYear={handleYearSelect}
          onSelectBrand={handleBrandSelect}
          onSelectVariant={handleVariantSelect}
        />

        <TouchableOpacity
          style={styles.selectRegisteredButton}
          onPress={handleOpenRegisteredPicker}
        >
          <Image
            source={require("../../assets/reegisteredIn.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.selectLocationText}>
            {selectedRegisteredLocation || "Registered In"}
          </Text>
        </TouchableOpacity>
        <RegisteredPicker
          isVisible={registeredModalVisible}
          onClose={handleCloseRegisteredPicker}
          onSelectCity={handleRegisteredSelect}
        />

        <TouchableOpacity
          style={styles.selectBodyColorButton}
          onPress={handleOpenBodyColorPicker}
        >
          <Image
            source={require("../../assets/bodyColor.png")}
            style={styles.bodyColorIcon}
          />
          <Text style={styles.selectBodyColorText}>
            {selectedBodyColor || "Body Color"}
          </Text>
        </TouchableOpacity>

        <BodyColorPicker
          isVisible={bodyColorModalVisible}
          onClose={handleCloseBodyColorPicker}
          onSelectColor={handleBodyColorSelect}
        />

        <TouchableOpacity
          style={styles.selectFuelTypeButton}
          onPress={handleOpenFuelTypePicker}
        >
          <Image
            source={require("../../assets/fuelIcon.png")}
            style={styles.fuelTypeIcon}
          />
          <Text style={styles.selectFuelTypeText}>
            {selectedFuelType || "Fuel Type"}
          </Text>
        </TouchableOpacity>

        <FuelTypePicker
          isVisible={fuelTypeModalVisible}
          onClose={handleCloseFuelTypePicker}
          onSelectFuelType={handleFuelTypeSelect}
        />

        {/* <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#FF0000"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => setSelectedPrice(value)}
                /> */}

        <View style={styles.selectKmDrivenButton}>
          <Image
            source={require("../../assets/carMeter.png")}
            style={styles.kmIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="KM's Driven"
            value={selectedKmDriven}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              const formattedValue = parseInt(numericValue, 10).toLocaleString(
                "en-IN"
              );
              setSelectedKmDriven(formattedValue);
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.selectPriceButton}>
          <Image
            source={require("../../assets/priceTag.png")}
            style={styles.priceIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Price (PKR)"
            value={selectedPrice}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              const formattedValue = parseInt(numericValue, 10).toLocaleString(
                "en-IN"
              );
              setSelectedPrice(formattedValue);
            }}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.selectDescriptionButton}>
          <Image
            source={require("../../assets/descriptionIcon.png")}
            style={styles.descriptionIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description : Alloy Rims, First Owner, etc."
            value={selectedDescription}
            onChangeText={(text) => setSelectedDescription(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.viewSuggestionsButton}
          onPress={handleViewSuggestions}
        >
          <Text style={styles.viewSuggestionsText}>View All Suggestions</Text>
        </TouchableOpacity>

        <DescribeYourCar
          isVisible={describeYourCarModalVisible}
          onClose={() => setDescribeYourCarModalVisible(false)}
          onDone={handleDescribeYourCarDone}
        />

        <View style={styles.selectPriceButton}>
          <Image
            source={require("../../assets/powerIcon.png")}
            style={styles.priceIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Engine Capacity"
            value={selectedPrice ? `${selectedPrice} CC` : ""} // Include "CC" after the entered value if not empty
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              const formattedValue = parseInt(numericValue, 10).toLocaleString(
                "en-IN"
              );
              setSelectedPrice(formattedValue);
            }}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.selectDriveOptionContainer}>
          <Text style={styles.selectDriveOptionText}>Drive options :</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedDriveOption === "Driver" && styles.selectedButton,
              ]}
              onPress={() => setSelectedDriveOption("Driver")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedDriveOption === "Driver" && styles.selectedButtonText,
                ]}
              >
                Driver
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedDriveOption === "Self-drive" && styles.selectedButton,
              ]}
              onPress={() => setSelectedDriveOption("Self-drive")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedDriveOption === "Self-drive" &&
                    styles.selectedButtonText,
                ]}
              >
                Self-drive
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* here i have to add textfields rent post service  */}

        <View style={styles.selectTransmissionContainer}>
          <Text style={styles.selectTransmissionText}>Transmission :</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedTransmission === "Automatic" && styles.selectedButton,
              ]}
              onPress={() => setSelectedTransmission("Automatic")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedTransmission === "Automatic" &&
                    styles.selectedButtonText,
                ]}
              >
                Automatic
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedTransmission === "Manual" && styles.selectedButton,
              ]}
              onPress={() => setSelectedTransmission("Manual")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedTransmission === "Manual" &&
                    styles.selectedButtonText,
                ]}
              >
                Manual
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.selectAssemblyContainer}>
          <Text style={styles.selectAssemblyText}>Assembly :</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedAssembly === "Imported" && styles.selectedButton,
              ]}
              onPress={() => handleAssemblySelect("Imported")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedAssembly === "Imported" && styles.selectedButtonText,
                ]}
              >
                Imported
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedAssembly === "Local" && styles.selectedButton,
              ]}
              onPress={() => handleAssemblySelect("Local")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedAssembly === "Local" && styles.selectedButtonText,
                ]}
              >
                Local
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* "Contact Info" section */}
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactInfoText}>Contact Info</Text>
          {/* Add two text fields below "Contact Info" */}
          <TextInput
            style={styles.contactInput}
            placeholder="Enter your name"
            // Add any necessary props or event handlers
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            // Add any necessary props or event handlers
          />
        </View>

        <TouchableOpacity style={styles.Postbutton} onPress={handlePostYourAd}>
          <Text style={styles.PostbuttonText}>Post Ad</Text>
        </TouchableOpacity>

        {/* <View style={styles.noteContainer}>
          <Text style={styles.noteHeading}>Note</Text>
          <Text style={styles.noteText}>
            If you will buy 3rd standard free ad, and then willing to buy Premium ad service, your paid 525/-
            amount will be adjusted in Premium ad service.
          </Text>
        </View> */}

        {/* <TouchableOpacity
          style={styles.PremiumAdButton}
          onPress={handlePremiumAdService}
        >
          <Text style={styles.PremiumAdButtonText}>Click to go for Premium Ad Service</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "white",
    // padding: 10
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    paddingRight: 20,
    tintColor: "white",
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  selectLocationButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 40,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 15,
    tintColor: "#bd2a2a",
  },
  selectLocationText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 15,
    marginTop: 13,
  },
  selectCarModelButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  carModelIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: "#bd2a2a",
  },
  selectCarModelText: {
    fontSize: 13,
    color: "grey",
    marginLeft: 15,
    // Other text styles
  },
  selectRegisteredButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    // justifyContent: 'center',
  },
  selectBodyColorButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  bodyColorIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: "#Ac3803",
  },
  selectBodyColorText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 15,
  },
  selectKmDrivenButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  kmIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "#Ac3803",
  },
  textInput: {
    flex: 1,
    height: "100%",
    borderColor: "white",
    borderWidth: 1, // Remove the border to make it look like other fields
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 14,
  },
  selectPriceButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  priceIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "#Ac3803",
  },

  selectDescriptionButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  descriptionIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "#Ac3803",
  },
  viewSuggestionsText: {
    color: "#2884ec",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  selectDriveOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  selectDriveOptionText: {
    fontSize: 16,
    marginRight: 30,
    fontWeight: "bold",
    color: "black",
  },
  selectFuelTypeButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  fuelTypeIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "#Ac3803",
  },
  selectFuelTypeText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 15,
    // marginTop: 13,
  },
  selectTransmissionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  selectTransmissionText: {
    fontSize: 16,
    marginRight: 30,
    fontWeight: "bold",
    color: "black",
  },

  toggleButtonContainer: {
    flexDirection: "column",
  },
  toggleButton: {
    backgroundColor: "white",
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 20,
  },
  toggleButtonText: {
    fontSize: 14,
    color: "#Ac3803",
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#Ac3803",
  },
  selectedButtonText: {
    color: "white",
  },
  selectAssemblyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  selectAssemblyText: {
    fontSize: 16,
    marginRight: 30,
    fontWeight: "bold",
    color: "black",
  },
  toggleButtonContainer: {
    flexDirection: "column",
  },
  toggleButton: {
    backgroundColor: "white",
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 20,
    marginTop: 10,
  },
  toggleButtonText: {
    fontSize: 14,
    color: "#Ac3803",
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#Ac3803",
  },
  selectedButtonText: {
    color: "white",
  },

  selectFeatureButton: {
    flexDirection: "row",
    height: 50,
    width: 370,
    borderColor: "#Ac3803",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  featureIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: "#bd2a2a",
  },
  selectFeatureText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 15,
  },

  contactInfoContainer: {
    backgroundColor: "ghostwhite", // Set your desired background color
    padding: 10,
    borderRadius: 5,
    width: "100%", // Ensure it spans the full width
    marginBottom: 10, // Add margin at the bottom
    marginTop: 20,
  },
  contactInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  contactInput: {
    height: 40,
    borderBottomColor: "black", // Set the bottom border color
    borderBottomWidth: 1, // Set the bottom border width
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 15,
  },
  Postbutton: {
    backgroundColor: "#Ac3803",
    width: 300,
    padding: 15,
    margin: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  PostbuttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  noteContainer: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
  },
  noteHeading: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  noteText: {
    color: "grey",
    fontSize: 14,
    marginLeft: 10,
  },
  PremiumAdButton: {
    backgroundColor: "#Ac3803",
    width: 380,
    padding: 15,
    margin: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  PremiumAdButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  selectDriveOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default FilterSearch;

