import React, { useState, useContext, useEffect } from "react";
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
import LocationPicker from "../locationPicker";
import { TextInput } from "react-native-gesture-handler";
import { UserContext } from "../../context/userContext";
import axios from "axios";
// Fonts
import { useFonts } from "expo-font";

const Rent_Bike_Post = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [Bike_Type, setBike_Type] = useState("");
  const [Bike_Year, setBike_Year] = useState("");
  const [Bike_Model, setBike_Model] = useState("");
  const [Bike_RegisteredIn, setBike_RegisteredIn] = useState("");
  const [Bike_KmDriven, setBike_KmDriven] = useState(""); // Updated state
  const [Bike_FuelType, setBike_FuelType] = useState("");
  const [Bike_Color, setBike_Color] = useState("");
  const [Bike_EngineType, setBike_EngineType] = useState("");
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [imagesBase64, setImagesBase64] = useState([]);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // Added description state

  const bikeTypes = [
    "Select",
    "Honda",
    "Suzuki",
    "United",
    "Road Prince",
    "Yamaha",
    "Unique",
    "Super Power",
    "Hi Speed",
  ];
  const bikeYear = [
    "Select",
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
  ];
  const bikeModel = [
    "Select",
    "Honda CD 70",
    "Honda CG 125",
    "Yamaha YBR 125",
    "Yamaha YBR 125G",
    "Yamaha YBZ 125",
    "Suzuki GD 110S",
    "Suzuki GS 150",
    "Suzuki GR 150",
    "Unique UD 70",
    "Unique UD 100",
    "Road Prince RP 70",
    "Road Prince RP 110",
    "United US 70",
    "United US 100",
    "Super Power SP 70",
    "Super Power SP 125",
    "Hi-Speed Infinity 150",
    "Hi-Speed SR 70",
  ];
  const bikeRegisteredIn = [
    "Select",
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
  ];
  const bikeKmDriven = [
    { label: "Select", value: "" },
    { label: "Less than 10,000 km", value: 10000 },
    { label: "10,000 - 20,000 km", value: 20000 },
    { label: "20,000 - 30,000 km", value: 30000 },
    { label: "More than 30,000 km", value: 40000 },
  ];
  const bikeFuelType = ["Select", "Petrol", "High-Octane Petrol"];
  const bikeColor = ["Select", "Red", "Blue", "Black"];
  const bikeEngineType = ["Select", "2-stroke", "4-stroke"]; // New options for Engine Type

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeCity = (inputCity) => {
    setCity(inputCity);
  };

  const handleOpenLocationPicker = () => {
    setLocationModalVisible(true);
  };

  const handleCloseLocationPicker = () => {
    setLocationModalVisible(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleCloseLocationPicker();
  };

  const uploadToCloudinary = async (file) => {
    const NAME_OF_UPLOAD_PRESET = "fzjlnas0";
    const YOUR_CLOUDINARY_ID = "dzofo9uh0";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const img = await res.json();
    return img.url;
  };

  const handlePostAd = async () => {
    try {
      const uploadedImages = await Promise.all(
        imagesBase64.map((image) => uploadToCloudinary(image))
      );

      const adData = {
        images: uploadedImages,
        year: parseInt(Bike_Year), // Ensure year is parsed to integer
        brand: Bike_Type.toLowerCase(), // Convert to lowercase as per example
        model: Bike_Model,
        location: selectedLocation,
        registeredIn: Bike_RegisteredIn,
        price: parseInt(price), // Ensure price is parsed to integer
        color: Bike_Color.toLowerCase(), // Convert to lowercase as per example
        KmDriven: parseInt(Bike_KmDriven), // Ensure KmDriven is parsed to integer
        fuelType: Bike_FuelType,
        engineType: Bike_EngineType,
        description: description, // Added description
        user: user, // Include the user object
      };

      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/bike/add",
        adData
      );
      if (response.data.ok) {
        console.log("Ad Posted Successfully");
      }
    } catch (error) {
      console.log("ERROR HERE");
      console.log(error.response.data.error);
    }
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/My_Soul/Kanit-Black.ttf"),
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
          <Text style={styles.title}>Rent Your Bike</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.Imageborder}>
          <ImagePickerComponent
            onSelectedImagesBase64Change={setImagesBase64}
          />
        </View>

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
            <Text style={styles.label}>Bike Type</Text>
            <Picker
              selectedValue={Bike_Type}
              onValueChange={(itemValue) => setBike_Type(itemValue)}
              style={styles.dropdown}
            >
              {bikeTypes.map((type, index) => (
                <Picker.Item label={type} value={type} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Year</Text>
            <Picker
              selectedValue={Bike_Year}
              onValueChange={(itemValue) => setBike_Year(itemValue)}
              style={styles.dropdown}
            >
              {bikeYear.map((year, index) => (
                <Picker.Item label={`${year}`} value={`${year}`} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Model</Text>
            <Picker
              selectedValue={Bike_Model}
              onValueChange={(itemValue) => setBike_Model(itemValue)}
              style={styles.dropdown}
            >
              {bikeModel.map((model, index) => (
                <Picker.Item label={model} value={model} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Registered In</Text>
            <Picker
              selectedValue={Bike_RegisteredIn}
              onValueChange={(itemValue) => setBike_RegisteredIn(itemValue)}
              style={styles.dropdown}
            >
              {bikeRegisteredIn.map((registered, index) => (
                <Picker.Item
                  label={registered}
                  value={registered}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Km Driven</Text>
            <Picker
              selectedValue={Bike_KmDriven}
              onValueChange={(itemValue) => setBike_KmDriven(itemValue)}
              style={styles.dropdown}
            >
              {bikeKmDriven.map((kmDriven) => (
                <Picker.Item
                  key={kmDriven.value}
                  label={kmDriven.label}
                  value={kmDriven.value}
                />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Fuel Type</Text>
            <Picker
              selectedValue={Bike_FuelType}
              onValueChange={(itemValue) => setBike_FuelType(itemValue)}
              style={styles.dropdown}
            >
              {bikeFuelType.map((fuelType, index) => (
                <Picker.Item label={fuelType} value={fuelType} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={[styles.featureContainer, styles.lightGreyBackground]}>
            <Text style={styles.label}>Color</Text>
            <Picker
              selectedValue={Bike_Color}
              onValueChange={(itemValue) => setBike_Color(itemValue)}
              style={styles.dropdown}
            >
              {bikeColor.map((color, index) => (
                <Picker.Item label={color} value={color} key={index} />
              ))}
            </Picker>
          </View>
          <View style={[styles.featureContainer, styles.whiteBackground]}>
            <Text style={styles.label}>Engine Type</Text>
            <Picker
              selectedValue={Bike_EngineType}
              onValueChange={(itemValue) => setBike_EngineType(itemValue)}
              style={styles.dropdown}
            >
              {bikeEngineType.map((engineType, index) => (
                <Picker.Item
                  label={engineType}
                  value={engineType}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelChooseCarAvailable}>Price</Text>
          <TextInput
            style={styles.Input}
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            placeholder="Enter price"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelChooseCarAvailable}>Description</Text>
          <TextInput
            style={[styles.Input, { height: 100, textAlignVertical: "top", paddingTop: 10, }]}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={4}
            placeholder="Enter description"
          />
        </View>

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
    backgroundColor: "#bc0000",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 10,
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
    fontSize: 17,
    alignSelf: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
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
    marginBottom: 5,
    fontFamily: "Kanit",
    fontSize: 13,
    paddingLeft: 10,
    letterSpacing: 0.5,
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
    fontFamily: "Kanit",
    // fontWeight: "bold",
    alignSelf: "flex-start",
  },
  locationText: {
    marginTop: 5,
    marginLeft: 20,
    fontSize: 14,
    alignSelf: "flex-start",
    fontFamily: "Heebo",
    letterSpacing: 0.5,
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
    fontFamily: "Kanit",
    // fontWeight: "bold",
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
    paddingLeft: 30,
    fontFamily: "Kanit",
    letterSpacing: 1,
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
    paddingBottom: 12,
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
    fontFamily: "Kanit",
    letterSpacing: 0.5,
  },
});

export default Rent_Bike_Post;
