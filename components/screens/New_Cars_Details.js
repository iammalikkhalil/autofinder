import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Linking,
  ActivityIndicator,
} from "react-native";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";
import call from "react-native-phone-call";
import { UserContext } from "../../context/userContext";
import FooterContact from "../footerContact";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import New_Cars_Detail_F from "./New_Cars_Detail_F";
import New_Cars_Detail_S from "./New_Cars_Detail_S";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Fonts
import { useFonts } from "expo-font";

const TopTab = createMaterialTopTabNavigator();

export default function New_Cars_Details() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      const car1Make = await AsyncStorage.getItem("car1Make");
      const car2Make = await AsyncStorage.getItem("car2Make");

      if (!car1Make || !car2Make) {
        console.error("No car makes found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://autofinder-backend.vercel.app/api/newCar"
        );
        const data = await response.json();

        // Filter data based on makes
        const filteredData = data.data.filter(
          (car) => car.make === car1Make || car.make === car2Make
        );

        setCarData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car data", error);
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);
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
      <StatusBar backgroundColor={"#bd2a2a"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Car Comparison Details</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Images */}
        <View style={styles.imageContainer}>
          {/* Image 1 */}
          <View style={styles.My_Img_One_Car}>
            <Image source={{ uri: carData[0]?.image }} style={styles.image} />
          </View>
          {/* VS Image */}
          <View style={styles.My_Img_One_Car_E}>
            <Image
              source={require("../../assets/car.jpg")}
              style={styles.image_E}
            />
          </View>
          {/* Image 1 */}
          <View style={styles.My_Img_One_Car}>
            <Image source={{ uri: carData[1]?.image }} style={styles.image} />
          </View>
        </View>
        {/* Data */}
        <View style={styles.My_MMY_Parent}>
          {/* Box */}
          <View style={[styles.My_MMY_Parent_Sub]}>
            {/* <Text style={styles.My_Car_Heading_Text}> Car 1</Text> */}
            <Text style={styles.carNameText}>{carData[0]?.make}</Text>
            <Text style={styles.carNameText_1}>
              PKR {carData[0]?.keySpecifications.price}
            </Text>
            <Text style={styles.priceText}>{carData[0]?.model}</Text>
            <Text style={styles.locationText}>{carData[0]?.year}</Text>
          </View>
          {/* Box */}
          <View style={[styles.My_MMY_Parent_Sub]}>
            {/* <Text style={styles.My_Car_Heading_Text}> Car 2</Text> */}
            <Text style={styles.carNameText}>{carData[1]?.make}</Text>
            <Text style={styles.carNameText_1}>
              PKR {carData[1]?.keySpecifications.price}
            </Text>
            <Text style={styles.priceText}>{carData[1]?.model}</Text>
            <Text style={styles.locationText}>{carData[1]?.year}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TopTab.Navigator>
            {/* Screen 1 */}
            <TopTab.Screen
              name="Specifications"
              component={New_Cars_Detail_S}
              options={{
                tabBarLabel: "Specifications",
                tabBarLabelStyle: {
                  fontFamily: "Heebo",
                  letterSpacing: 1,
                },
                tabBarInactiveTintColor: "grey",
                tabBarIndicatorStyle: {
                  backgroundColor: "#EB2F06",
                  borderWidth: 0.5,
                  borderColor: "#EB2F06",
                },
                tabBarActiveTintColor: "#EB2F06",
              }}
            />
            {/* Screen 2 */}
            <TopTab.Screen
              name="Features"
              component={New_Cars_Detail_F}
              options={{
                tabBarLabel: "Features",
                tabBarLabelStyle: {
                  fontFamily: "Heebo",
                  letterSpacing: 1,
                },
                tabBarInactiveTintColor: "grey",
                tabBarIndicatorStyle: {
                  backgroundColor: "#EB2F06",
                  borderWidth: 0.5,
                  borderColor: "#EB2F06",
                },
                tabBarActiveTintColor: "#EB2F06",
              }}
            />
          </TopTab.Navigator>
        </View>
      </ScrollView>
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
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 5,
  },
  backButton: {
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
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  scrollContainer: {
    paddingBottom: 20, // Optional padding for extra space at the bottom
  },
  imageContainer: {
    paddingTop: 50,
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "transparent",
    paddingHorizontal: 10,
  },
  My_Img_One_Car: {
    borderWidth: 0.5,
    borderColor: "transparent",
    // borderColor: "black",
    width: 120,
    height: 95,
    padding: 5,
  },
  image: {
    width: 110,
    height: 85,
    resizeMode: "stretch",
    borderWidth: 0.5,
    borderColor: "transparent",
    // borderColor: "black",
    borderRadius: 10,
  },
  My_Img_One_Car_E: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: 50,
    height: 50,
    padding: 10,
    // marginHorizontal: 8,
  },
  image_E: {
    borderRadius: 10,
    width: 30,
    height: 30,
    borderWidth: 0.5,
    borderColor: "transparent",
    // borderColor: "black",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    right: 0,
    padding: 10,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  // New styles for individual score container
  scoreContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    marginRight: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  scoreHeading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  scoreText: {
    fontSize: 12,
    color: "#2884ec",
  },
  imageCountText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  navigationContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    marginBottom: 130,
  },
  navigationButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
    padding: 10,
  },
  navigationButtonIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  carNameText: {
    color: "#bd2a2a",
    fontSize: 16, // Adjust font size as needed
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 2,
    // fontWeight: "bold",
    letterSpacing: 1.5,
    fontFamily: "Kanit",
  },
  carNameText_1: {
    color: "#1B9200",
    fontSize: 17, // Adjust font size as needed
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 2,
    letterSpacing: 1.5,
    fontFamily: "Heebo",
  },
  priceText: {
    letterSpacing: 1.5,
    borderWidth: 0.5,
    textAlign: "center",
    color: "black",
    fontSize: 14, // Adjust font size as needed
    borderColor: "transparent",
    paddingVertical: 2,
    fontFamily: "Kanit",
  },
  locationText: {
    letterSpacing: 1.5,
    borderWidth: 0.5,
    textAlign: "center",
    color: "grey", // Adjust color as needed
    fontSize: 14, // Adjust font size as needed
    borderColor: "transparent",
    paddingVertical: 2,
    fontFamily: "Kanit",
  },
  specsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  specItem: {
    alignItems: "center",
  },
  specIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    tintColor: "#bd2a2a",
  },
  specName: {
    fontSize: 12,
    color: "grey", // Adjust color as needed
  },

  carDetailContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  carDetailHeader: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  carDetailHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  carDetailContent: {
    flexDirection: "column",
  },
  My_Heading_E: {
    borderWidth: 0.5,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 2.5,
    backgroundColor: "black",
    color: "white",
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    textTransform: "uppercase",
  },
  My_Heading: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 45,
    paddingBottom: 55,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  carDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf2",
    paddingBottom: 10,
  },
  carDetailHeading: {
    fontWeight: "bold",
    marginRight: 10,
    width: "50%",
    fontSize: 12,
  },
  carDetailName: {
    flex: 1,
    textAlign: "right",
    fontSize: 12,
  },
  BD_Txt_2_1: {
    fontSize: 12,
    color: "#575252",
    paddingHorizontal: 20,
    paddingVertical: 3,
    letterSpacing: 0.5,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
  },
  tabContainer: {
    flex: 1,
    height: 1200, // Give some height to make sure it shows up
    paddingTop: 5,
  },
  My_MMY_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  My_MMY_Parent_Sub: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: "40%",
    paddingVertical: 15,
  },
  My_Car_Heading_Text: {
    borderWidth: 0.5,
    borderColor: "transparent",
    fontWeight: "bold",
    fontSize: 21,
    paddingTop: 15,
    paddingBottom: 15,
    letterSpacing: 1.5,
    textAlign: "center",
  },
});
