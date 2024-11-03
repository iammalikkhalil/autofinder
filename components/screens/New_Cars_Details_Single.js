import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import New_Cars_Detail_S_Single from "./New_Cars_Detail_S_Single";
import New_Cars_Detail_F_Single from "./New_Cars_Detail_F_Single";
// Fonts
import { useFonts } from "expo-font";

const TopTab = createMaterialTopTabNavigator();

export default function New_Cars_Details_Single() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  const route = useRoute();
  const { item } = route.params;
  const carSpecs = [
    { name: item.year, icon: require("../../assets/modelYear.png") },
    {
      name: item.keySpecifications.topSpeed,
      icon: require("../../assets/carMeter.png"),
    },
    {
      name: item.keySpecifications.fuelType,
      icon: require("../../assets/fuelIcon.png"),
    },
    {
      name: item.keySpecifications.transmission,
      icon: require("../../assets/transmission.png"),
    },
  ];
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
            <Image source={{ uri: item?.image }} style={styles.image} />
          </View>
        </View>
        {/* Data */}
        <View style={styles.My_MMY_Parent}>
          {/* Box */}
          <View style={[styles.My_MMY_Parent_Sub]}>
            <Text style={styles.carNameText}>{item.make}</Text>
            <Text style={styles.carNameText_1}>
              PKR {item?.keySpecifications.price}
            </Text>
            <Text style={styles.priceText}>{item.model}</Text>
          </View>
        </View>
        {/* Image Data */}
        <View style={styles.specsContainer}>
          {carSpecs.map((spec, index) => (
            <View key={index} style={styles.specItem}>
              <Image source={spec.icon} style={styles.specIcon} />
              <Text style={styles.specName}>{spec.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tabContainer}>
          <TopTab.Navigator>
            {/* Screen 1 */}
            <TopTab.Screen
              name="Specifications"
              component={New_Cars_Detail_S_Single}
              initialParams={{
                item,
              }}
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
              component={New_Cars_Detail_F_Single}
              initialParams={{
                item,
              }}
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
    letterSpacing: 1.5,
  },
  scrollContainer: {
    paddingBottom: 20, // Optional padding for extra space at the bottom
  },
  imageContainer: {
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingHorizontal: 10,
    // backgroundColor: "yellow",
  },
  My_Img_One_Car: {
    borderWidth: 0.5,
    borderColor: "transparent",
    // borderColor: "red",
    paddingVertical: 0,
    paddingHorizontal: 5,
  },
  image: {
    width: 200,
    height: 195,
    borderWidth: 0.5,
    // borderColor: "black",
    borderColor: "transparent",
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "contain",
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
    fontSize: 18, // Adjust font size as needed
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 1,
    // fontWeight: "bold",
    letterSpacing: 1.5,
    fontFamily: "Kanit",
  },
  carNameText_1: {
    color: "#1B9200",
    fontSize: 20, // Adjust font size as needed
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 3,
    letterSpacing: 1.1,
    fontFamily: "Heebo",
  },
  priceText: {
    letterSpacing: 1.5,
    borderWidth: 0.5,
    textAlign: "center",
    color: "grey",
    fontSize: 16, // Adjust font size as needed
    borderColor: "transparent",
    paddingVertical: 3,
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
  },
  specsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
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
  tabContainer: {
    flex: 1,
    height: 1200, // Give some height to make sure it shows up
    paddingTop: 5,
  },
  My_MMY_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingHorizontal: 5,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  My_MMY_Parent_Sub: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: "100%",
    paddingTop: 0,
    paddingBottom: 20,
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
    fontSize: 11.5,
    color: "grey", // Adjust color as needed
    fontFamily: "Kanit",
    letterSpacing: 0.1,
  },
});
