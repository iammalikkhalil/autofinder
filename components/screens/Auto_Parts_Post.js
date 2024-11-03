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

const Auto_Parts_Post = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [Bike_Type, setBike_Type] = useState("");
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [imagesBase64, setImagesBase64] = useState([]);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [bikeTypes, setBikeTypes] = useState([]);
  const [bikeTypeMap, setBikeTypeMap] = useState({});

  useEffect(() => {
    // Fetch bike types from API
    const fetchBikeTypes = async () => {
      try {
        const response = await axios.get("https://autofinder-backend.vercel.app/api/autoPartCategory");
        if (response.data.ok) {
          const types = response.data.data;
          setBikeTypes(types.map(item => item.name));
          const typeMap = {};
          types.forEach(type => {
            typeMap[type.name] = type._id;
          });
          setBikeTypeMap(typeMap);
        }
      } catch (error) {
        console.error("Error fetching bike types: ", error);
      }
    };

    fetchBikeTypes();
  }, []);

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
        location: selectedLocation,
        price: parseInt(price),
        description: description,
        title: title,
        category: { _id: bikeTypeMap[Bike_Type] },
        user: user,  // Include the user object
      };

      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/autoPart/add",
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#bd2a2a"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sell Your Auto Part</Text>
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
            <Text style={styles.label}>Name</Text>
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
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelChooseCarAvailable}>Title</Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.Input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelChooseCarAvailable}>Price (in PKR)</Text>
          <TextInput
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            style={styles.Input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelChooseCarAvailable}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.Input}
            multiline={true}
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
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
    marginLeft: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginBottom: 15,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
    paddingBottom: 10,
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
    fontSize: 14,
    fontFamily: "Heebo",
    letterSpacing: 0.5,
    paddingLeft: 20,
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
    alignSelf: "flex-start",
    fontSize: 14,
    fontFamily: "Heebo",
    letterSpacing: 0.5,
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
    fontFamily: "Kanit",
    letterSpacing: 1.5,
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

export default Auto_Parts_Post;
