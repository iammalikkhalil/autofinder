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
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LocationPicker from "../locationPicker";
import CarModelPicker from "../carModelPicker";
import RegisteredPicker from "../registeredPicker";
import BodyColorPicker from "../bodyColor";
import DescribeYourCar from "../screens/pendingAds";
import FuelTypePicker from "../fuelTypePicker";
import PremiumAdCharges from "../premiumAdCharges";
import ImagePickerComponent from "../imagePicker";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
//import Alert
import { Alert } from "react-native";

const FreeAdsPostService = () => {
  const { user } = useContext(UserContext);
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEngineCapcity, setEngineCapacity] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [errorLocation, setErrorLocation] = useState(false);
  // const [errorCarModel, setErrorCarModel] = useState(false);
  const [errorRegistration, setErrorRegistration] = useState(false);
  const [errorBodyShade, setErrorErrorBodyShade] = useState(false);
  const [errorKiloTravel, setErrorKiloTravel] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorcapacity, setErrorCapacity] = useState(false);
  const [errorFuel, setErrorFuel] = useState(false);
  const [errorGear, setErrorGear] = useState(false);
  const [errorAssembly, setErrorAssembly] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  // const handleSelectImage = () => {
  //   // Handle the image selection (to be implemented later)
  //   console.log('Image selected');
  // };

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
  const handleModelSelect = (model) => {
    setSelectedModel(model);
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
  const [selectedFeaturess, setSelectedFeaturess] = useState([]);
  const handleDescribeYourCarDone = (selectedOptions) => {
    setSelectedDescription(selectedOptions.join(", "));
    setSelectedFeaturess(selectedOptions);
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

  const handleAssemblySelect = (assemblyType) => {
    setSelectedAssembly(assemblyType);
  };

  const handleFeaturePickerDone = (selectedFeatures) => {
    setSelectedFeatures(selectedFeatures);
    setIsFeaturePickerVisible(false);
  };

  const handleCloseModall = () => {
    setIsVisible(false);
  };

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [imagesBase64, setImagesBase64] = useState([]);

  //   const [errorRegistration, setErrorRegistration] = useState(false);
  // const [errorBodyShade, setErrorErrorBodyShade] = useState(false);
  // const [errorKiloTravel, setErrorKiloTravel] = useState(false);
  // const [errorPrice, setErrorPrice] = useState(false);
  // const [errorcapacity, setErrorCapacity] = useState(false);
  // const [errorFuel, setErrorFuel] = useState(false);
  // const [errorGear, setErrorGear] = useState(false);
  // const [errorAssembly, setErrorAssembly] = useState(false);

  const validation = () => {
    if (selectedLocation === "") {
      setErrorLocation(true);
      return false;
    } else {
      setErrorLocation(false);
    }

    // if (selectedYear || selectedBrand || selectedModel) {
    //   setErrorCarModel(true);
    //   return false;
    // } else {
    //   setErrorCarModel(false);
    // }

    if (selectedRegisteredLocation === "") {
      setErrorRegistration(true);
      return false;
    } else {
      setErrorRegistration(false);
    }

    if (selectedBodyColor === "") {
      setErrorErrorBodyShade(true);
      return false;
    } else {
      setErrorErrorBodyShade(false);
    }

    if (selectedKmDriven === "") {
      setErrorKiloTravel(true);
      return false;
    } else {
      setErrorKiloTravel(false);
    }

    if (selectedPrice === "") {
      setErrorPrice(true);
      return false;
    } else {
      setErrorPrice(false);
    }

    if (selectedEngineCapcity === "") {
      setErrorCapacity(true);
      return false;
    } else {
      setErrorCapacity(false);
    }

    if (selectedFuelType === "") {
      setErrorFuel(true);
      return false;
    } else {
      setErrorFuel(false);
    }

    if (selectedTransmission === "") {
      setErrorGear(true);
      return false;
    } else {
      setErrorGear(false);
    }

    if (selectedAssembly === "") {
      setErrorAssembly(true);
      return false;
    } else {
      setErrorAssembly(false);
    }

    return true;
  };

  const handlePostYourAd = async () => {
    console.log("Ad posted!");

    if (validation()) {
      const adData = {
        images: imagesBase64,
        location: selectedLocation,
        year: selectedYear,
        brand: selectedBrand,
        model: selectedModel,
        varient: selectedVariant,
        registeredIn: selectedRegisteredLocation,
        bodyColor: selectedBodyColor,
        kmDriven: selectedKmDriven,
        price: selectedPrice,
        fuelType: selectedFuelType,
        transmission: selectedTransmission,
        assembly: selectedAssembly,
        engineCapacity: selectedEngineCapcity,
        name: name,
        features: selectedFeaturess,
        phoneNumber: phoneNumber,
        user: user._id,
        description: carDescription,
      };
      // console.log(carDescription);
      try {
        console.log("here");
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/upload",

          adData
        );
        console.log(response.data);
        if (response.data.ok) {
          setIsVisible(true);
        }
      } catch (error) {
        console.log(error.response.data);
        setIsError(true);
        setError(error.response.data.error);
      }
    }
  };

  const handleDealerPackages = async () => {
    if (validation()) {
      const adData = {
        images: imagesBase64,
        location: selectedLocation,
        year: selectedYear,
        brand: selectedBrand,
        model: selectedModel,
        varient: selectedVariant,
        registeredIn: selectedRegisteredLocation,
        bodyColor: selectedBodyColor,
        kmDriven: selectedKmDriven,
        price: selectedPrice,
        fuelType: selectedFuelType,
        transmission: selectedTransmission,
        assembly: selectedAssembly,
        engineCapacity: selectedEngineCapcity,
        name: name,
        features: selectedFeaturess,
        phoneNumber: phoneNumber,
        user: user._id,
        description: carDescription,
        DealerPackageUsed: true,
        featured: true,
      };

      if (user.package === null) {
        Alert.alert(
          "Alert",
          "You Dont have a Dealer Package. Please buy a Dealer Package to proceed.",
          [
            { text: "Cancel" },
            {
              text: "Proceed to buy",
              onPress: () => navigation.navigate("DealerPackage"),
            },
          ],
          { cancelable: false }
        );
      } else {
        try {
          const response = await axios.post(
            "https://autofinder-backend.vercel.app/api/carAd/upload",
            adData
          );
          console.log(response.data.ok);
          if (response.data.ok) {
            Alert.alert("Success", "Ad Posted Successfully", [{ text: "OK" }], {
              cancelable: false,
            });
          }
        } catch (error) {
          console.log(error.response.data);
          Alert.alert(
            "Alert",
            `${error.response.data.error}`,
            [{ text: "OK" }],
            {
              cancelable: false,
            }
          );

          // setIsError(true);
          // setError(error.response.data.error);
        }
      }
    }
  };

  const [dataForPremiumAd, setDataForPremiumAd] = useState({});

  const handlePremiumAdService = () => {
    if (validation()) {
      const adData = {
        images: imagesBase64,
        location: selectedLocation,
        year: selectedYear,
        brand: selectedBrand,
        model: selectedModel,
        varient: selectedVariant,
        registeredIn: selectedRegisteredLocation,
        bodyColor: selectedBodyColor,
        kmDriven: selectedKmDriven,
        price: selectedPrice,
        description: carDescription,
        fuelType: selectedFuelType,
        transmission: selectedTransmission,
        assembly: selectedAssembly,
        engineCapacity: selectedEngineCapcity,
        name: name,
        phoneNumber: phoneNumber,
        user: user._id,
        features: selectedFeaturess,
      };
      setDataForPremiumAd(adData);
      setModalVisible(true);
    }
  };

  const handlePostThirdAd = () => {
    console.log("ok");
    const adData = {
      images: imagesBase64,
      location: selectedLocation,
      year: selectedYear,
      brand: selectedBrand,
      model: selectedModel,
      varient: selectedVariant,
      registeredIn: selectedRegisteredLocation,
      bodyColor: selectedBodyColor,
      kmDriven: selectedKmDriven,
      price: selectedPrice,
      fuelType: selectedFuelType,
      transmission: selectedTransmission,
      assembly: selectedAssembly,
      engineCapacity: selectedEngineCapcity,
      name: name,
      features: selectedFeaturess,
      phoneNumber: phoneNumber,
      user: user._id,
      description: carDescription,
    };
    setIsError(false);
    navigation.navigate("checkoutCarInspection", {
      priceToPay: 525,
      service: "000",
      ...adData,
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleImagesSelection = (selectedImages) => {
    // Do something with the selected images
    console.log(selectedImages);
  };
  const [carDescription, setCarDescription] = useState("");
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
          <Text style={styles.title}>Post Premium Ad</Text>
        </View>
      </View>
      {/* <View style={styles.MarqueeContainer}>
        <MarqueeText
          style={styles.marqueeText}
          speed={1}
          marqueeOnStart={true}
          loop={true}
          delay={1200}
        >
          The first two ads are free of charge, but starting from the third ad, there will be a fee of PKR 525.00 per ad in ''free Ads Service''.
        </MarqueeText>
      </View> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Button to select images */}

        <View style={styles.Imageborder}>
          <ImagePickerComponent
            onSelectedImagesBase64Change={setImagesBase64}
          />
        </View>

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
        {errorLocation && (
          <Text style={styles.errorText}>Please Select Your Location</Text>
        )}
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
          <Text style={styles.selectCarModelText} placeholder="Car Model">
            {selectedYear ? `${selectedYear} ` : ""}
            {selectedBrand ? `${selectedBrand} ` : ""}
            {selectedModel ? `${selectedModel}` : ""}
            {selectedVariant ? `${selectedVariant}` : "Select Car Model"}
          </Text>
        </TouchableOpacity>
        {/* {errorCarModel && (
          <Text>Please Select Your Car's Year, Brand, Model</Text>
        )} */}

        <CarModelPicker
          isVisible={carModelModalVisible}
          onClose={handleCloseCarModelPicker}
          onSelectYear={handleYearSelect}
          onSelectBrand={handleBrandSelect}
          onSelectVariant={handleVariantSelect}
          onSelectModel={handleModelSelect}
        />

        <TouchableOpacity
          style={styles.selectRegisteredButton}
          onPress={handleOpenRegisteredPicker}
        >
          <Image
            source={require("../../assets/registered.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.selectLocationText}>
            {selectedRegisteredLocation || "Registration Site"}
          </Text>
        </TouchableOpacity>
        {errorRegistration && (
          <Text style={styles.errorText}>
            Please Select Your Car Registration
          </Text>
        )}
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
            source={require("../../assets/bodycolour.png")}
            style={styles.bodyColorIcon}
          />
          <Text style={styles.selectBodyColorText}>
            {selectedBodyColor || "Body Shade"}
          </Text>
        </TouchableOpacity>
        {errorBodyShade && (
          <Text style={styles.errorText}>
            Please Select Your Car Exterior Color
          </Text>
        )}
        <BodyColorPicker
          isVisible={bodyColorModalVisible}
          onClose={handleCloseBodyColorPicker}
          onSelectColor={handleBodyColorSelect}
        />

        <View style={styles.selectKmDrivenButton}>
          <Image
            source={require("../../assets/distanceKM.png")}
            style={styles.kmIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Kilometers Travelled"
            value={selectedKmDriven}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              const formattedValue = parseInt(numericValue, 10).toLocaleString(
                "en-IN"
              );
              setSelectedKmDriven(text);
            }}
            keyboardType="numeric"
          />
        </View>
        {errorKiloTravel && (
          <Text style={styles.errorText}>
            Please Enter Car's Kilometers Driven
          </Text>
        )}
        <View style={styles.selectPriceButton}>
          <Image
            source={require("../../assets/priceTag.png")}
            style={styles.priceIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Selling Price (PKR)"
            value={selectedPrice}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              const formattedValue = parseInt(numericValue, 10).toLocaleString(
                "en-IN"
              );
              setSelectedPrice(text);
            }}
            keyboardType="numeric"
          />
        </View>
        {errorPrice && (
          <Text style={styles.errorText}>
            Please Enter Selling Price of Your Car
          </Text>
        )}

        <View style={styles.selectPriceButton}>
          <Image
            source={require("../../assets/powerIcon.png")}
            style={styles.priceIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Engine Capacity"
            value={selectedEngineCapcity ? `${selectedEngineCapcity} CC` : ""}
            // value={selectedPrice ? `${selectedPrice} CC` : ''} // Include "CC" after the entered value if not empty
            onChangeText={(text) => {
              const formattedValue = parseInt(text);
              setEngineCapacity(formattedValue);
            }}
            keyboardType="numeric"
          />
        </View>
        {errorcapacity && (
          <Text style={styles.errorText}>
            Please Enter Car's Engine Capacity
          </Text>
        )}

        {/* <View style={styles.selectDescriptionButton}>
          <Image
            source={require("../assets/descriptionIcon.png")}
            style={styles.descriptionIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Select Features"
            value={selectedDescription}
            onChangeText={(text) => setSelectedDescription(text)}
            readOnly
          />
        </View> */}

        <TouchableOpacity
          style={styles.selectFuelTypeButton}
          onPress={handleOpenFuelTypePicker}
        >
          <Image
            source={require("../../assets/fuelIcon.png")}
            style={styles.fuelTypeIcon}
          />
          <Text style={styles.selectFuelTypeText}>
            {selectedFuelType || "Fuel Category"}
          </Text>
        </TouchableOpacity>
        {errorFuel && (
          <Text style={styles.errorText}>Please Select Your Fuel type</Text>
        )}
        <FuelTypePicker
          isVisible={fuelTypeModalVisible}
          onClose={handleCloseFuelTypePicker}
          onSelectFuelType={handleFuelTypeSelect}
        />

        <TouchableOpacity
          style={styles.viewSuggestionsButton}
          onPress={handleViewSuggestions}
        >
          <Text style={styles.viewSuggestionsText}>
            Tap for Feature Selection
          </Text>
        </TouchableOpacity>
        <View style={styles.featureContainer}>
          {selectedFeaturess.length > 0 &&
            selectedFeaturess.map((item) => (
              <Text style={styles.bulletPointText}>• {item}</Text>
            ))}
        </View>

        <DescribeYourCar
          isVisible={describeYourCarModalVisible}
          onClose={() => setDescribeYourCarModalVisible(false)}
          onDone={handleDescribeYourCarDone}
        />

        {/* ////////////////////////////////////// */}

        <View style={styles.selectPriceButton}>
          <Image
            source={require("../../assets/descriptionIcon.png")}
            style={styles.descriptionIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            multiline={true} // Allow multiline input
            numberOfLines={4}
            value={carDescription}
            onChangeText={(text) => setCarDescription(text)}
          />
        </View>

        <View style={styles.selectTransmissionContainer}>
          <Text style={styles.selectTransmissionText}>Gear Transmission</Text>
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
          <Text style={styles.selectAssemblyText}>Assembly Integrated</Text>
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

        {/* <View style={styles.selectPriceButton}>
          <Image source={require('../assets/powerIcon.png')} style={styles.priceIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Engine Capacity"
            value={selectedEngineCapcity ? `${selectedEngineCapcity} CC` : ''} // Include "CC" after the entered value if not empty
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, '');
              const formattedValue = parseInt(numericValue, 10).toLocaleString('en-IN');
              setEngineCapacity(formattedValue);
            }}
            keyboardType="numeric"
          />
        </View> */}

        {/* "Contact Info" section */}
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactInfoText}>Contact Info</Text>
          {/* Add two text fields below "Contact Info" */}
          <TextInput
            style={styles.contactInput}
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            placeholderTextColor="black"
            value={user.name}
            readOnly
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
            placeholderTextColor="black"
            value={user.phoneNumber}
            readOnly
          />
        </View>

        <TouchableOpacity style={styles.Postbutton} onPress={handlePostYourAd}>
          <Text style={styles.PostbuttonText}>Publish Ad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dealerbutton}
          onPress={handleDealerPackages}
        >
          <Text style={styles.PostbuttonText}>Utilize Dealer Package</Text>
        </TouchableOpacity>

        {/* <View style={styles.noteContainer}>
          <Text style={styles.noteHeading}>Note</Text>
          <Text style={styles.noteText}>
            If you will buy 3rd standard free ad, and then willing to buy
            Premium ad service, your paid 525/- amount will be adjusted in
            Premium ad service.
          </Text>
        </View> */}

        <TouchableOpacity
          style={styles.PremiumAdButton}
          onPress={handlePremiumAdService}
        >
          <Text style={styles.PremiumAdButtonText}> Pick Premium Plan</Text>
        </TouchableOpacity>

        <PremiumAdCharges
          isVisible={modalVisible}
          onClose={handleCloseModal}
          data={dataForPremiumAd}
        />

        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

        <View style={styless.container}>
          <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseModall}
          >
            <View style={styless.modalContainer}>
              <View style={styless.modalContent}>
                <Text>Ad Posted Successfully!!</Text>
                <TouchableOpacity onPress={handleCloseModall}>
                  <Text>Close Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

        <View style={styless.container}>
          <Modal
            visible={isError}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsError(false)}
          >
            <View style={styless.modalContainer}>
              <View style={styless.modalContent}>
                <Text>{error}</Text>
                <TouchableOpacity
                  style={styles.Postbutton}
                  onPress={handlePostThirdAd}
                >
                  <Text style={styless.buttonText}>
                    Pay Pkr-525 to post an Ad.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsError(false)}>
                  <Text style={styless.buttonTextt}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonTextt: {
    paddingTop: 20,
    fontWeight: "bold",
    color: "#3496eb",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 75,
  },
  Imageborder: {
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 10,
  },
  backButton: {
    // paddingRight: 20,
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
    letterSpacing: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },

  MarqueeContainer: {
    // marginBottom: 20, // Increased margin for better spacing
    marginTop: 20,
  },
  marqueeText: {
    fontSize: 16,
    color: "#2884ec",
    fontWeight: "500",
  },

  selectImageButton: {
    alignItems: "center",
    height: 250,
    width: 320,
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  imageIcon: {
    width: 50,
    height: 50,
    marginTop: 30,
    tintColor: "#bd2a2a",
  },
  selectImageText: {
    fontSize: 14,
    color: "grey",
  },
  selectLocationButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 40,
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
  selectCarModelButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    // borderColor: "grey",
    // borderWidth: 1,
    // // borderRadius: 5,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    marginTop: 10,
    alignItems: "center",
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
  selectRegisteredButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    // borderColor: "grey",
    // borderWidth: 1,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 10,
    // justifyContent: 'center',
  },
  selectBodyColorButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    // borderColor: "grey",
    // borderWidth: 1,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  bodyColorIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: "lightgrey",
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
    // borderColor: "grey",
    // borderWidth: 1,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  kmIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "lightgrey",
  },
  textInput: {
    flex: 1,
    height: "100%",
    // borderColor: "white",
    // borderWidth: 1, // Remove the border to make it look like other fields
    // borderRadius: 5,
    // borderColor: "black",
    // borderBottomWidth: 1,
    paddingLeft: 10,
    fontSize: 14,
  },
  selectPriceButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    // borderColor: "grey",
    // borderWidth: 1,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  priceIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "lightgrey",
  },

  selectDescriptionButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    // borderColor: "grey",
    // borderWidth: 1,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  descriptionIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "lightgrey",
  },
  viewSuggestionsText: {
    color: "#2884ec",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 30,
    padding: 10,
    textAlign: "center",
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 25,
  },
  selectFuelTypeButton: {
    flexDirection: "row",
    height: 50,
    width: 300,
    // borderColor: "grey",
    // borderWidth: 1,
    borderColor: "#bd2a2a",
    borderBottomWidth: 1,
    // borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
  },
  fuelTypeIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    justifyContent: "center",
    tintColor: "lightgrey",
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
    borderColor: "#bd2a2a",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 20,
  },
  toggleButtonText: {
    fontSize: 14,
    color: "#bd2a2a",
    textAlign: "center",
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: "#bd2a2a",
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
    paddingHorizontal: 10,
    marginRight: 20,
    marginTop: 10,
  },
  toggleButtonText: {
    fontSize: 14,
    color: "#bd2a2a",
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#bd2a2a",
  },
  selectedButtonText: {
    color: "white",
  },

  selectFeatureButton: {
    flexDirection: "row",
    height: 50,
    width: 370,
    borderColor: "#bd2a2a",
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
    backgroundColor: "#bd2a2a",
    width: 300,
    padding: 15,
    margin: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  dealerbutton: {
    backgroundColor: "#2e8b57",
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
    fontSize: 12,
    marginLeft: 10,
  },
  PremiumAdButton: {
    backgroundColor: "#007BFF",
    width: 300,
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
  featureContainer: {
    alignItems: "flex-start",
    // paddingLeft: 50,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#bd2a2a",
    display: "flex",
    borderStyle: "dashed",
    flex: 1,
    gap: 10,
    width: 300,
  },
  bulletPointsContainer: {
    backgroundColor: "black",
    flexDirection: "row", // Display bullet points in a row
    alignItems: "flex-start", // Align bullet points at the top
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  bulletPointText: {
    fontSize: 12,
    // marginBottom: 2,
    marginRight: 20, // Add margin to create space between bullet points
    marginLeft: 10,
    color: "black",
  },
});

export default FreeAdsPostService;
