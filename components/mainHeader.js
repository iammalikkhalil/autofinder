import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import SellNowPopup from "./screens/sellNowPopup";
import SearchBar from "./searchBar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import FilterSearchCar from "./screens/filterSearch";
// Fonts
import { useFonts } from "expo-font";

const MainHeader = ({
  onPressHome,
  onPressMyAds,
  onPressSellNow,
  onPressMore,
}) => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleHomePress = () => {
    // Replace this with your actual logic for the Home button press
    // console.log('Home button pressed');
  };

  const [sellNowPopupVisible, setSellNowPopupVisible] = React.useState(false);

  const handleSellNowPress = () => {
    // Replace this with your actual logic for the Sell Now button press
    // console.log('Sell Now button pressed');

    setSellNowPopupVisible(true);
  };

  const handleMorePress = () => {
    // Replace this with your actual logic for the More button press
    console.log("More button pressed");
    // navigation.navigate("more");
    navigation.navigate("moreOption");
  };

  const handleBuyNowPress = () => {
    navigation.navigate("buyNow");
  };

  const handleRentPress = () => {
    navigation.navigate("DealerPackage");
    // navigation.navigate("transactionApproval");
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../assets/fonts/My_Soul/Kanit-Black.ttf"),
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
    <View>
      {/* StatusBar */}
      <StatusBar backgroundColor={"#bd2a2a"} />
      {/* ---------- 4 Buttons ----------- */}
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.buttonHolder}>
          {/* <TouchableOpacity style={styles.buttons} onPress={handleMyAdsPress}>
            <Text style={styles.buttonText}>Used Cars</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.buttons} onPress={handleSellNowPress}>
            <Text style={styles.buttonText}>New Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handleBuyNowPress}>
            <Text style={styles.buttonText}>Used Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handleRentPress}>
            <Text style={styles.buttonText}>Packages</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* ---------- 4 Buttons ----------- */}
      {/* ---------- Search Bar ----------- */}
      <View style={styles.headerContainer}>
        {/* User Name */}
        {/* More Button
        <TouchableOpacity
          style={styles.moreButton}
          onPress={onPressMore || handleMorePress}
        >
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity> */}
        {/* Search bar */}
        <View style={styles.rowContainer}>
          {/* Search bar */}
          <View style={styles.SearchBar}>
            {/* Your search bar component goes here */}
            <SearchBar />
          </View>
        </View>
      </View>
      {/* ---------- Search Bar ----------- */}
      <SellNowPopup
        visible={sellNowPopupVisible}
        onClose={() => setSellNowPopupVisible(false)}
        onSelectCategory={(category) => {
          console.log(`Selected category: ${category}`);
          setSellNowPopupVisible(false); // Close the popup
        }}
      />
      {/* --- Box Shadow --- */}
      <View style={styles.box_Shadow}>
        {/* Empty Just For SHadow Applied */}
      </View>
      {/* --- Box Shadow --- */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: "#bd2a2a",
    backgroundColor: "#F3F3F3",
    // shadowColor: "black",
    // elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 26,
    paddingHorizontal: 12,
  },
  userName: {
    color: "white",
    fontWeight: "900",
    fontSize: 22,
  },
  welcomeText: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
  },
  buttonHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 1,
    paddingTop: 30,
    paddingHorizontal: 5,
    width: "100%",
    backgroundColor: "#F3F3F3",
    // borderWidth: 1,
    // borderColor: "white",
  },
  buttons: {
    backgroundColor: "white",
    width: "28%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#B5B5B5",
    // marginHorizontal: 2,
  },
  buttonText: {
    textAlign: "center",
    color: "#bd2a2a",
    fontFamily: "Kanit",
    fontSize: 14,
    letterSpacing: 0.2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2.5,
    paddingVertical: 0,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "green",
  },
  SearchBar: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    // backgroundColor: "white",
    borderRadius: 5,
    marginRight: 1,
    paddingHorizontal: 1,
    width: "100%",
    borderColor: "grey",
  },
  box_Shadow: {
    borderWidth: 0.1,
    borderColor: "transparent",
  },
});

export default MainHeader;
