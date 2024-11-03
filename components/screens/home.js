/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import FeaturedAd from "../featuredAd";
import CategoriesScreen from "../CategoriesScreen";
import AutoFindersOffering from "../autoFinderOffering";
import { useNavigation } from "@react-navigation/native";
import MainHeader from "../mainHeader";
import ManagedByAutoFinder from "./managedByAutoFinder";
import AdvertisementCard from "../advertisementCard";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";
// Fonts
import { useFonts } from "expo-font";

const Home = ({ navigation }) => {
  const handleLearnMore = () => {
    navigation.navigate("homeRentACar");
  };

  const handleDealerPack = () => {
    navigation.navigate("DealerPackage");
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
      {/* mainHeader sections */}
      <MainHeader />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <ManagedByAutoFinder />
        {/* Carousal */}
        <CategoriesScreen
          navigation={navigation}
          style={{ marginBottom: 30 }}
        />

        {/* Auto Finders Offering Section */}
        <AutoFindersOffering navigation={navigation} />

        {/* Additional Main Screen Content */}

        {/* Featured Ads Section */}

        {/* ----- Feature Ads ----- */}
        <FeaturedAd navigation={navigation} />
        {/* ----- Feature Ads ----- */}

        <AdvertisementCard
          title="Boost Ads, Dealer Packs"
          description="Elevate your strategy effortlessly with premium ad placement and free booster bundles."
          imageSource={require("../../assets/boost.png")}
          buttonText="Upgrade Now"
          onPress={handleDealerPack}
          buttonColor="#BC0000"
          titleColor="#BC0000"
        />

        {/* <AdvertisementCard
          title="Auto rental service"
          description="Find the perfect car for your next adventure."
          imageSource={require("../../assets/rent.png")}
          buttonText="Learn More"
          onPress={handleLearnMore}
          buttonColor="#007BFF"
          titleColor="#007BFF"
        /> */}
      </ScrollView>
      {/* ---------- Bottom Navbar ---------- */}
      <View style={styles.Nav_Parent}>
        <View style={styles.Sub_Nav_Parent}>
          {/* Box */}
          <TouchableOpacity>
            <View style={styles.E_Bottom_Box_EE}>
              <Text style={styles.E_Bottom_Box_Text_EE}>
                <MaterialCommunityIcons name="home" size={21} color="black" />
              </Text>
              <Text style={styles.E_Bottom_Box_Text_1_EE}>Home</Text>
            </View>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity onPress={() => navigation.navigate("homeFreeAds")}>
            <View style={styles.E_Bottom_Box}>
              <Text style={styles.E_Bottom_Box_Text}>
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={28}
                  color="white"
                />
              </Text>
              <Text
                style={[
                  styles.E_Bottom_Box_Text_1,
                  { paddingTop: 1, fontSize: 10 },
                ]}
              >
                Sell Now
              </Text>
            </View>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity onPress={() => navigation.navigate("moreOption")}>
            <View style={styles.E_Bottom_Box_EE}>
              <Text style={styles.E_Bottom_Box_Text_EE}>
                <MaterialCommunityIcons
                  name="unfold-more-vertical"
                  size={21}
                  color="black"
                />
              </Text>
              <Text style={styles.E_Bottom_Box_Text_1_EE}>Menu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* ---------- Bottom Navbar ---------- */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "bd2a2a",
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 117,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    // padding: 2,
    borderRadius: 20,
    backgroundColor: "#b22222",
    width: 80,
  },
  activeButton: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  activeButtonText: {
    color: "red",
  },
  bottomView: {
    marginTop: 10,
  },
  SearchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  optionItem: {
    padding: 15,
    backgroundColor: "white",
  },
  optionText: {
    color: "gray",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#dcdcdc",
  },
  Nav_Parent: {
    position: "absolute",
    bottom: 0,
    borderWidth: 0,
    borderColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 1,
    backgroundColor: "transparent",
    width: "100%",
    shadowColor: "#000", // Black shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
    shadowOpacity: 0.8, // Opacity of the shadow
    shadowRadius: 3, // Radius of the shadow
    elevation: 5, // Elevation for Android
  },
  Sub_Nav_Parent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black",
    marginHorizontal: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Make sure there's enough space at the bottom so content doesn't get hidden behind the navbar
  },
  E_Bottom_Box: {
    borderWidth: 0,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#b22222",
  },
  E_Bottom_Box_Text: {
    borderWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 2,
    textAlign: "center",
  },
  E_Bottom_Box_Text_1: {
    borderWidth: 0,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 2,
    fontSize: 9,
    letterSpacing: 1.5,
    textAlign: "center",
    fontFamily: "Kanit",
    color: "white",
  },
  E_Bottom_Box_EE: {
    borderWidth: 0,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  E_Bottom_Box_Text_EE: {
    borderWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 2,
    textAlign: "center",
  },
  E_Bottom_Box_Text_1_EE: {
    borderWidth: 0,
    paddingHorizontal: 2,
    paddingVertical: 0,
    borderRadius: 2,
    fontSize: 9,
    letterSpacing: 1.5,
    textAlign: "center",
    fontFamily: "Kanit",
    color: "black",
  },
});

export default Home;
