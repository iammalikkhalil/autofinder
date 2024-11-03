import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import ImagePickerComponent from "../imagePicker";
import CarAvailabilityModel from "../carAvailabilityModal";
import PaymentType from "../paymentType";
import DocumentationRequirements from "../documentationRequirements";
import CarModelPicker from "../carModelPicker";
import LocationPicker from "../locationPicker";
// import AddressInput from "../../components/AddressInput";
import { TextInput } from "react-native-gesture-handler";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const RentPostService = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [carType, setCarType] = useState("");
  const [carTransmission, setCarTransmission] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [driverAvailability, setDriverAvailability] = useState("");
  const [betweenCities, setBetweenCities] = useState("");
  const [mileage, setMileage] = useState("");
  const [carAssembly, setCarAssembly] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [engineType, setEngineType] = useState("");
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [imagesBase64, setImagesBase64] = useState([]);

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const selectedDaysString = selectedDays.join(", ");
  // console.log("Selected Days:", selectedDaysString);
  const [
    selectedDocumentationRequirements,
    setSelectedDocumentationRequirements,
  ] = useState([]);
  const [city, setCity] = useState("");
  const [sublocation, setSubLocation] = useState("");
  const [other, setOther] = useState("");

  const [carModelModalVisible, setCarModelModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const carTypes = ["Select", "Hatchback", "Sedan", "SUVs", "Luxury", "Exotic"];
  const transmissionOptions = ["Select", "Automatic", "Manual"];
  const engineCapacities = [
    "Select",
    "Upto 1000-CC",
    "Above 1000-CC and Below 2000-CC",
    "Above 2000-CC",
  ];
  const seatingCapacities = [
    "Select",
    "2-seater",
    "4-seater",
    "5-seater",
    "7-seater",
    "8-seater or Above",
  ];
  const driverAvailabilities = ["Select", "With Driver", "Without Driver"];
  const betweenCitiesOptions = ["Select", "Yes", "No"];
  const mileageOptions = [
    "Select",
    "Less than 10,000 km",
    "10,000 - 20,000 km",
    "20,000 - 30,000 km",
    "More than 30,000 km",
  ];
  const carAssemblyOptions = ["Select", "Local", "Imported"];
  const bodyColorOptions = [
    "Select",
    "Red",
    "Blue",
    "Black",
    "White",
    "Silver",
  ];
  const engineTypeOptions = [
    "Select",
    "Petrol",
    "Hybrid",
    "CNG",
    "Diesel",
    "Electric",
  ]; // New options for Engine Type

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveDays = (days) => {
    setSelectedDays(days);
  };

  const handlePaymentType = (selectedOptions) => {
    console.log("Selected Payment Options:", selectedOptions);
    // You can handle the selected payment options as needed
  };

  const handleDocumentationRequirements = (selectedOptions) => {
    console.log("Selected Documentation Requirements:", selectedOptions);
    setSelectedDocumentationRequirements(selectedOptions);
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
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    handleCloseCarModelPicker();
  };
  const handleChangeCity = (inputCity) => {
    setCity(inputCity);
  };
  const handleChangeSubLocation = (inputCity) => {
    setSubLocation(inputCity);
  };
  const handleChangeOther = (inputCity) => {
    setOther(inputCity);
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

  const handlePostAd = async () => {
    // Mapping object keys to new variable names
    const adData = {
      user: user._id,
      images: imagesBase64,
      carType,
      carTransmission,
      engineCapacity,
      seatingCapacity,
      driverAvailability,
      betweenCities,
      mileage,
      carAssembly,
      bodyColor,
      engineType,
      Year: selectedYear,
      Days: selectedDays.join(", "),
      DocumentationRequirements: selectedDocumentationRequirements, // must be an array,
      city: selectedLocation,
      // paymentMethod: Variable
      // ADD PAYMENT METHOD AS AN ARRAY. KEY SHOULD BE: paymentMethod
      Brand: selectedBrand,
      Variant: selectedVariant,
      Model: selectedModel,
    };
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carRentalAd/upload",

        adData
      );
      if (response.data.ok) {
        console.log("SUCCESS HERE");
      }
    } catch (error) {
      console.log("ERROR HERE");
      console.log(error.response.data.error);
    }
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
          <Text style={styles.title}>Rent Your Car</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.Imageborder}>
          <ImagePickerComponent
            onSelectedImagesBase64Change={setImagesBase64}
          />
        </View>
        {/* Feature Rows */}

        <Text style={styles.labelChooseCarAvailable}>Select Car Model</Text>

        <TouchableOpacity
          style={styles.selectCarModelButton}
          onPress={handleOpenCarModelPicker}
        >
          <Image
            source={require("../../assets/carFrontIcon.png")}
            style={styles.carModelIcon}
          />
          <Text style={styles.selectCarModelText} placeholder="Car Model">
            {selectedYear ? `${selectedYear} ` : ""}
            {selectedBrand ? `${selectedBrand} ` : ""}
            {selectedModel ? `${selectedModel}` : ""}
            {selectedVariant ? `${selectedVariant}` : ""}
          </Text>
        </TouchableOpacity>
        <CarModelPicker
          isVisible={carModelModalVisible}
          onClose={handleCloseCarModelPicker}
          onSelectYear={handleYearSelect}
          onSelectBrand={handleBrandSelect}
          onSelectVariant={handleVariantSelect}
          onSelectModel={handleModelSelect}
        />

        <Text style={styles.locationText}>Select Your City</Text>

        <TouchableOpacity
          style={styles.selectLocationButton}
          onPress={handleOpenLocationPicker}
        >
          <Image
            source={require("../../assets/locationIcon.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.selectLocationText}>
            {selectedLocation || "Select Your Location"}
          </Text>
        </TouchableOpacity>
        <LocationPicker
          isVisible={locationModalVisible}
          onClose={handleCloseLocationPicker}
          onSelectLocation={handleLocationSelect}
        />

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Car Type</Text>
            <Picker
              selectedValue={carType}
              onValueChange={(itemValue) => setCarType(itemValue)}
              style={styles.dropdown}
            >
              {carTypes.map((type, index) => (
                <Picker.Item label={type} value={type} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Car Transmission</Text>
            {/* Car Transmission */}
            <Picker
              selectedValue={carTransmission}
              onValueChange={(itemValue) => setCarTransmission(itemValue)}
              style={styles.dropdown}
            >
              {transmissionOptions.map((transmission, index) => (
                <Picker.Item
                  label={transmission}
                  value={transmission}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Engine Capacity</Text>
            <Picker
              selectedValue={engineCapacity}
              onValueChange={(itemValue) => setEngineCapacity(itemValue)}
              style={styles.dropdown}
            >
              {engineCapacities.map((capacity, index) => (
                <Picker.Item label={capacity} value={capacity} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Seating Capacity</Text>
            <Picker
              selectedValue={seatingCapacity}
              onValueChange={(itemValue) => setSeatingCapacity(itemValue)}
              style={styles.dropdown}
            >
              {seatingCapacities.map((capacity, index) => (
                <Picker.Item label={capacity} value={capacity} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Driver Availability</Text>
            <Picker
              selectedValue={driverAvailability}
              onValueChange={(itemValue) => setDriverAvailability(itemValue)}
              style={styles.dropdown}
            >
              {driverAvailabilities.map((availability, index) => (
                <Picker.Item
                  label={availability}
                  value={availability}
                  key={index}
                />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Between Cities</Text>
            <Picker
              selectedValue={betweenCities}
              onValueChange={(itemValue) => setBetweenCities(itemValue)}
              style={styles.dropdown}
            >
              {betweenCitiesOptions.map((option, index) => (
                <Picker.Item label={option} value={option} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Mileage (km)</Text>
            <Picker
              selectedValue={mileage}
              onValueChange={(itemValue) => setMileage(itemValue)}
              style={styles.dropdown}
            >
              {mileageOptions.map((option, index) => (
                <Picker.Item label={option} value={option} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Car Assembly</Text>
            <Picker
              selectedValue={carAssembly}
              onValueChange={(itemValue) => setCarAssembly(itemValue)}
              style={styles.dropdown}
            >
              {carAssemblyOptions.map((option, index) => (
                <Picker.Item label={option} value={option} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Body Color</Text>
            <Picker
              selectedValue={bodyColor}
              onValueChange={(itemValue) => setBodyColor(itemValue)}
              style={styles.dropdown}
            >
              {bodyColorOptions.map((color, index) => (
                <Picker.Item label={color} value={color} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Engine Type</Text>
            <Picker
              selectedValue={engineType}
              onValueChange={(itemValue) => setEngineType(itemValue)}
              style={styles.dropdown}
            >
              {engineTypeOptions.map((type, index) => (
                <Picker.Item label={type} value={type} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.labelChooseCarAvailable}>
          Choose Your Car Availability
        </Text>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setIsModelVisible(true)}
        >
          <Text style={styles.selectButtonText}>Select Available Days</Text>
        </TouchableOpacity>
        {selectedDays.length > 0 && (
          <Text style={styles.selectedDays}>
            Selected Days: {selectedDaysString}
          </Text>
        )}
        <CarAvailabilityModel
          isVisible={isModelVisible}
          onClose={() => setIsModelVisible(false)}
          onSave={handleSaveDays}
        />

        <Text style={styles.labelChooseCarAvailable}>
          Assign Charges Per Day
        </Text>
        <TextInput
          style={styles.Input}
          onChangeText={handleChangeCity}
          value={city}
          placeholder="Rent Charges per Day"
          keyboardType="numeric"
        />

        <Text style={styles.labelChooseCarAvailable}>Payment Type</Text>
        <PaymentType onSelect={handlePaymentType} />

        <Text style={styles.labelChooseCarAvailable}>
          Documentation Requirement
        </Text>
        <DocumentationRequirements onSelect={handleDocumentationRequirements} />

        <TouchableOpacity style={styles.button} onPress={handlePostAd}>
          <Text style={styles.buttonText}>Post Ad</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
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
    fontWeight: "bold",
    alignSelf: "center",
  },
  Imageborder: {
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 10,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  featureRow: {
    flexDirection: "row",
    marginBottom: 5,
    // marginTop: 10,
  },
  featureContainer: {
    flex: 1,
    padding: 5,
    // borderRadius: 5,
    // marginHorizontal: 5,
  },
  lightGreyBackground: {
    backgroundColor: "#f0f0f0",
  },
  whiteBackground: {
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    width: 190,
  },
  labelChooseCarAvailable: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  locationText: {
    marginTop: -5,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  selectButton: {
    padding: 10,
    paddingHorizontal: 90,
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  selectButtonText: {
    color: "#bd2a2a",
    fontWeight: "bold",
  },
  selectedDays: {
    fontSize: 12,
    color: "green",
  },
  selectCarModelButton: {
    flexDirection: "row",
    height: 50,
    width: 320,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  carModelIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: "lightgrey",
  },
  selectCarModelText: {
    fontSize: 13,
    color: "grey",
    marginLeft: 15,
    // Other text styles
  },
  Input: {
    flexDirection: "row",
    height: 50,
    width: 320,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 1,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#bd2a2a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    // height: 50,
    width: 300,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectLocationButton: {
    flexDirection: "row",
    height: 50,
    width: 320,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 15,
    tintColor: "lightgrey",
  },
  selectLocationText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 15,
    marginTop: 13,
  },
});

export default RentPostService;
