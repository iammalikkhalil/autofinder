import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
  Modal,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation
import axios from "axios";
import { UserContext } from "../../context/userContext"; // Import UserContext for user data
import SearchBar from "../searchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Fonts
import { useFonts } from "expo-font";

const New_Cars = () => {
  // --- Model 1 - ( Car 1) ---
  const [showStatus, setShowStatus] = useState(false);
  // --- Model 2 - ( Car 2) ---
  const [showStatus_1, setShowStatus_1] = useState(false);
  // --- My API Data ---
  const navigation = useNavigation();

  const [car1, setCar1] = useState({ year: "", make: "", model: "" });
  const [car2, setCar2] = useState({ year: "", make: "", model: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, value, carNumber) => {
    if (carNumber === 1) {
      setCar1({ ...car1, [name]: value });
    } else {
      setCar2({ ...car2, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const data = { car1, car2 };
    setIsLoading(true); // Start loading
    try {
      // Save car makes to localStorage
      await AsyncStorage.setItem("car1Make", car1.make);
      await AsyncStorage.setItem("car2Make", car2.make);

      navigation.navigate("New_Cars_Details");
    } catch (error) {
      console.error("Error saving data", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  // --- My API Data ---
  const { user } = useContext(UserContext); // Get user data from context

  const handleBack = () => {
    navigation.goBack();
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
      <View style={styles.header}>
        {/* - */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Car Comparison</Text>
        </View>
      </View>
      {/* - Search Bar - */}
      <View style={styles.rowContainer}>
        {/* Search bar */}
        <View style={styles.SearchBar}>
          {/* Your search bar component goes here */}
          <SearchBar />
        </View>
      </View>
      {/* - Search Bar - */}
      <View style={styles.Container_Sub}>
        {/* - Main Box - */}
        <View style={styles.CC_Main_Box}>
          {/* --- Image Body --- */}
          <View style={styles.CC_Image_Parent}>
            <Image
              source={require("../../assets/car.jpg")}
              style={styles.CC_Image}
            />
          </View>
          {/* --- Box Body --- */}
          <View style={styles.Compare_Car_X_Box_Parent}>
            {/* Box */}
            <TouchableOpacity
              onPress={() => {
                setShowStatus(true);
              }}
            >
              <View style={styles.Compare_Car_X_Box}>
                <View style={styles.Compare_Car_X_Box_Part1}>
                  <View style={styles.Compare_Car_X_Box_Part1_Sub}>
                    <Image
                      source={require("../../assets/car.jpg")}
                      style={styles.Compare_Icon}
                    />
                  </View>
                </View>
                <View style={styles.Compare_Car_X_Box_Part2}>
                  <Text style={styles.Compare_Car_X_Box_Part2_Txt}>
                    Compare
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* Box */}
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => {
                setShowStatus_1(true);
              }}
            >
              <View style={styles.Compare_Car_X_Box}>
                <View style={styles.Compare_Car_X_Box_Part1}>
                  <View style={styles.Compare_Car_X_Box_Part1_Sub}>
                    <Image
                      source={require("../../assets/car.jpg")}
                      style={styles.Compare_Icon}
                    />
                  </View>
                </View>
                <View style={styles.Compare_Car_X_Box_Part2}>
                  <Text style={styles.Compare_Car_X_Box_Part2_Txt}>With</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* Box - ( Press Button ) */}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => handleSubmit("New_Cars_Details")}
            >
              <Text style={styles.buttonText_1}>Compare Cars</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* --- Model 1 - Car 1 ) --- */}
      <Modal transparent={true} animationType="fade" visible={showStatus}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Car 1</Text>
            <TextInput
              style={styles.input}
              placeholder=" Enter Year"
              keyboardType="numeric"
              value={car1.year}
              onChangeText={(text) => handleInputChange("year", text, 1)}
            />
            <TextInput
              style={styles.input}
              placeholder=" Enter Make"
              value={car1.make}
              onChangeText={(text) => handleInputChange("make", text, 1)}
            />
            <TextInput
              style={styles.input}
              placeholder=" Enter Model"
              value={car1.model}
              onChangeText={(text) => handleInputChange("model", text, 1)}
            />
            <TouchableOpacity
              style={[styles.button_Modal]}
              onPress={() => {
                setShowStatus(false);
              }}
            >
              <Text style={styles.button_Modal_Text_1}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* --- Model 1 - Car 1 ) --- */}
      {/* ------------------------- */}
      {/* --- Model 2 - Car 2 ) --- */}
      <Modal transparent={true} animationType="fade" visible={showStatus_1}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Car 2</Text>
            <TextInput
              style={styles.input}
              placeholder=" Enter Year"
              keyboardType="numeric"
              value={car2.year}
              onChangeText={(text) => handleInputChange("year", text, 2)}
            />
            <TextInput
              style={styles.input}
              placeholder=" Enter Make"
              value={car2.make}
              onChangeText={(text) => handleInputChange("make", text, 2)}
            />
            <TextInput
              style={styles.input}
              placeholder=" Enter Model"
              value={car2.model}
              onChangeText={(text) => handleInputChange("model", text, 2)}
            />
            <TouchableOpacity
              style={[styles.button_Modal]}
              onPress={() => {
                setShowStatus_1(false);
              }}
            >
              <Text style={styles.button_Modal_Text_1}>Compare</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* --- Model 1 - Car 1 ) --- */}
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
    marginLeft: 5,
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    letterSpacing: 1,
    fontFamily: "Kanit",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: 100,
    marginRight: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    // marginTop: 20,
  },
  featuredIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bd2a2a",
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  upperView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
  },
  rowContainer: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 10,
  },
  SearchBar: {
    alignSelf: "center",
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    paddingHorizontal: 1,
    width: "90%",
    borderColor: "transparent",
    marginHorizontal: 20,
  },
  Container_Sub: {
    borderWidth: 0,
    borderColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // paddingVertical: 40,
    paddingHorizontal: 40,
  },
  CC_Main_Box: {
    borderWidth: 0.5,
    borderColor: "#D1D1D1",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  Compare_Car_X_Box_Parent: {
    borderWidth: 0,
    borderColor: "transparent",
    // backgroundColor: "lightyellow",
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: "100%",
    alignSelf: "center",
  },
  Compare_Car_X_Box: {
    borderWidth: 0,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D7D7D7",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightyellow",
  },
  Compare_Car_X_Box_Part1: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "white",
    width: "25%",
    paddingVertical: 1,
  },
  Compare_Car_X_Box_Part1_Sub: {
    borderWidth: 0,
    backgroundColor: "#DADADA",
    paddingVertical: 7.5,
    borderRadius: 50,
  },
  Compare_Icon: {
    borderWidth: 0,
    borderColor: "transparent",
    width: 25,
    height: 25,
    alignSelf: "center",
  },
  Compare_Car_X_Box_Part2: {
    borderWidth: 0,
    borderColor: "transparent",
    width: "75%",
    paddingVertical: 5,
  },
  Compare_Car_X_Box_Part2_Txt: {
    borderWidth: 0,
    borderColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 15,
    fontSize: 18,
    letterSpacing: 1.8,
    fontFamily: "Kanit",
    color: "#bc0000",
  },
  button: {
    backgroundColor: "#bd2a2a",
    padding: 15,
    marginTop: 30,
    borderRadius: 5,
  },
  buttonText_1: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanit",
    textAlign: "center",
    letterSpacing: 2.5,
  },
  button_Modal: {
    backgroundColor: "#bd2a2a",
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  button_Modal_Text_1: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanit",
    textAlign: "center",
    letterSpacing: 2.5,
  },
  CC_Image_Parent: {
    borderWidth: 0,
    borderColor: "transparent",
    marginBottom: 20,
    borderRadius: 10,
  },
  CC_Image: {
    borderWidth: 0,
    borderColor: "transparent",
    borderColor: "black",
    width: 200,
    height: 130,
    borderRadius: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
    fontFamily: "Heebo",
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "white",
    fontSize: 13,
    letterSpacing: 2.5,
    fontFamily: "Kanit",
  },
});

export default New_Cars;
