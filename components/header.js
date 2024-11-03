import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import backArrow from "../assets/back-arrow.png";
// Fonts
import { useFonts } from "expo-font";

const Header = ({ title, onPressBack }) => {
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
    <View style={styles.container}>
      <StatusBar backgroundColor="#bd2a2a" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Image
            source={require("../assets/back-arrow.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fc6f03",
    // paddingTop: StatusBar.currentHeight - 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bd2a2a",
    paddingVertical: 10,
  },
  backButton: {
    tintColor: "white",
    marginLeft: 5,
  },
  backImage: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  title: {
    fontSize: 18,
    fontFamily: "Kanit",
    letterSpacing: 1,
    color: "white",
    textAlign: "center",
    flex: 1, // To make the title take up remaining space
  },
});

export default Header;
