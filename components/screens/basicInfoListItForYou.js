import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  StatusBar,
} from "react-native";
import { Picker } from "react-native";
import { useRoute } from "@react-navigation/native";
import { UserContext, userContext } from "../../context/userContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation
import CarModelPicker from "../carModelPicker";
import LocationPicker from "../locationPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BasicInfoListItForYou = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const route = useRoute();
  const { service } = route.params;
  const numColumns = 3;
  const numColumn = 4;
  const [fullName, setFullName] = useState(user.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [engineCC, setEngineCC] = useState("");
  const [isYearModalVisible, setYearModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isBrandModalVisible, setBrandModalVisible] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [carSummary, setCarSummary] = useState("");
  const [carModelModalVisible, setCarModelModalVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [emptyPhoneError, setEmptyPhoneError] = useState(false);
  const [InvalidPhoneError, setInvalidPhoneError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [engineCCerror, setEngineCCerror] = useState(false);
  const [validationOK, setvalidationOK] = useState(false);
  // const [selectedPickerValue, setSelectedPickerValue] = useState("java");
  const [isCapacityModalVisible, setIsCapacityModalVisible] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [errorEngineCapacity, setErrorEngineCapacity] = useState(false);
  const [errorCarModel, setErrorCarModel] = useState(false);

  // const handleBrandSearch = (text) => {
  //   const filtered = brands.filter((brand) =>
  //     brand.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredBrands(filtered);
  // };

  /// for refreshing page
  useEffect(() => {
    // This block of code will run when the component mounts
    clearData();
  }, []); // Empty dependency array means it only runs once on mount

  const clearData = () => {
    setSelectedCity(null);
    setSelectedYear(null);
    setSelectedBrand(null);
    setFilteredBrands([]);
    setCarSummary("");
  };

  const handleBack = () => {
    // navigation.goBack(); // Go back when the back button is pressed
    clearData(); //refreshing page
    navigation.goBack();
  };

  const validation = () => {
    if (fullName.length <= 3) {
      setEmptyNameError(true);
      return false;
    } else {
      setEmptyNameError(false);
      // Add logic to proceed to the next step
    }
    const phoneRegex = /^03\d{9}$/;
    if (phoneNumber !== "" && !phoneRegex.test(phoneNumber)) {
      setInvalidPhoneError(true);
      return false;
    } else {
      setInvalidPhoneError(false);
    }
    if (phoneNumber === "") {
      setEmptyPhoneError(true);
      return false;
    } else {
      setEmptyPhoneError(false);
    }

    if (selectedLocation === "") {
      setCityError(true);
      return false;
    } else {
      setCityError(false);
    }

    if (selectedCapacity === "") {
      setErrorEngineCapacity(true);
      return false;
    } else {
      setErrorEngineCapacity(false);
    }

    if (selectedBrand === "" || selectedModel === "" || selectedYear === "") {
      setErrorCarModel(true);
      return false;
    } else {
      setErrorCarModel(false);
    }

    return true;
  };

  const handleNext = () => {
    // if (setvalidationOK) {
    //   navigation.navigate("bookExpertVisitCarInspection", { name: "faizan" });
    //   console.log(validationOK);
    // } else {
    //   validation();
    // }

    validation();

    let price = 0;
    if (service === "001") {
      if (selectedCapacity === "basic-package") {
        price = 1800;
      } else if (selectedCapacity === "standard-package") {
        price = 4000;
      } else if (selectedCapacity === "premium-package") {
        price = 5500;
      }
    }
    if (service === "002") {
      if (selectedCapacity === "basic-package") {
        price = 3200;
      } else if (selectedCapacity === "standard-package") {
        price = 4200;
      } else if (selectedCapacity === "premium-package") {
        price = 6500;
      }
    }

    if (service === "003") {
      price = 5000;
    }

    const data = {
      user: user._id,
      location: selectedLocation,
      brand: selectedBrand,
      year: selectedYear,
      model: selectedModel,
      varient: selectedVariant,
      price: price,
      description: carSummary,
      pacakageType: selectedCapacity,
      service: service,
    };

    // console.log(data);
    if (validation() || setvalidationOK) {
      navigation.navigate("checkoutCarInspection", data);
    }
  };
  const handleCitySelection = (city) => {
    setSelectedCity(city);
    setCityModalVisible(false);
  };

  const openCityModal = () => {
    setCityModalVisible(true);
  };

  const closeCityModal = () => {
    setCityModalVisible(false);
  };
  //
  const handleYearSelection = (year) => {
    setSelectedYear(year);
    setYearModalVisible(false);
  };

  const openYearModal = () => {
    setYearModalVisible(true);
  };

  const closeYearModal = () => {
    setYearModalVisible(false);
  };

  const handleBrandSelection = (brand) => {
    setSelectedBrand(brand);
    setBrandModalVisible(false);
  };

  const openBrandModal = () => {
    setBrandModalVisible(true);
  };

  const closeBrandModal = () => {
    setBrandModalVisible(false);
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

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    handleCloseCarModelPicker();
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    handleCloseCarModelPicker();
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

  const handleCapacitySelect = (capacity) => {
    setSelectedCapacity(capacity);
  };

  const cities = [
    "Faisalabad",
    "Gujranwala",
    "Hyderabad",
    "Islamabad",
    "Karachi",
    "Lahore",
    "Multan",
    "Peshawar",
    "Rawalpindi",
  ];
  const year = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
    "1997",
    "1996",
    "1995",
    "1994",
    "1993",
    "1992",
    "1991",
    "1990",
    "1989",
  ];
  const brands = [
    "Toyota",
    "Suzuki",
    "Honda",
    "KIA",
    "Nissan",
    "Hyndai",
    "Daihastsu",
    "Mitsubishi",
    "Changan",
    "Mercedes",
    "MG",
    "Audi",
    "Proton",
    "BMW",
    "DFSK",
    "Haval",
    "FAW",
    "Lexus",
    "Mazda",
    "Prince",
    "Chevrolet",
    "Cherry",
    "Jeep",
    "Range Rover",
    "Tesla",
  ];
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
          <Text style={styles.title}>Basic info</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.getStartedText}>Let's get you started</Text>
          {/* Name Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Full Name</Text>
            <TextInput
              style={styles.textField}
              // placeholder="Enter full name"
              placeholderTextColor="#999" // Lighter text color when the field is empty
              onChangeText={setFullName} // Update fullName state
              value={fullName} // Bind value to fullName state
              editable={false}
            />
            {emptyNameError && (
              <Text style={styles.errorText}>Please enter your full name.</Text>
            )}
          </View>

          {/* Phone Number Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Phone Number</Text>
            <TextInput
              style={styles.textField}
              placeholder="03xxxxxxxxx"
              placeholderTextColor="#999" // Lighter text color when the field is empty
              keyboardType="phone-pad" // Opens numeric keyboard on mobile devices
              onChangeText={setPhoneNumber} // Update phoneNumber state
              value={phoneNumber} // Bind value to phoneNumber state
              editable={false}
            />
            {emptyPhoneError && (
              <Text style={styles.errorText}>
                Please enter your Phone Number.
              </Text>
            )}
            {InvalidPhoneError && (
              <Text style={styles.errorText}>Invalid format.</Text>
            )}
          </View>

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
            {cityError && (
              <Text style={styles.errorText}>Select Your City.</Text>
            )}
          </TouchableOpacity>

          <LocationPicker
            isVisible={locationModalVisible}
            onClose={handleCloseLocationPicker}
            onSelectLocation={handleLocationSelect}
          />

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={handleOpenCarModelPicker}
          >
            <Text style={styles.label}>Tell us about your car brand*</Text>
            <View style={styles.citySelectionField}>
              <Text style={styles.selectedCity}>
                {/* {selectedBrand || "Select brand"} */}
                <Text style={styles.selectCarModelText}>
                  {selectedYear ? `${selectedYear} ` : ""}
                  {selectedBrand ? `${selectedBrand} ` : ""}
                  {selectedModel ? `${selectedModel} ` : ""}
                  {selectedVariant || "Select Car Model"}
                </Text>
              </Text>

              <Image
                source={require("../../assets/right-arrow.png")}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Vehicle Description</Text>
            <TextInput
              style={styles.summaryInput}
              placeholder="Add description about your car..."
              placeholderTextColor="grey"
              multiline
              numberOfLines={4}
              onChangeText={(text) => setCarSummary(text)}
            />
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CarModelPicker
        isVisible={carModelModalVisible}
        onClose={handleCloseCarModelPicker}
        onSelectYear={handleYearSelect}
        onSelectBrand={handleBrandSelect}
        onSelectVariant={handleVariantSelect}
        onSelectModel={handleModelSelect}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#bd2a2a",
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
    fontWeight: "bold",
    alignSelf: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  getStartedText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#bd2a2a",
  },
  inputContainer: {
    marginBottom: 20,
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
    backgroundColor: "#bd2a2a",
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
  errorText: {
    color: "red",
    fontSize: 12,
  },
  packageView: {
    marginTop: -10,
    marginBottom: 20,
  },
  Packages: {
    fontSize: 8,
    color: "#2e8b57",
    marginTop: 1,
  },
});

export default BasicInfoListItForYou;