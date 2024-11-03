// LogoutHeader.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
// Fonts
import { useFonts } from "expo-font";

const LogoutHeader = ({
  username,
  onViewProfilePress,
  onLogoutPress,
  onLoginPress,
}) => {
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
  return (
    <TouchableOpacity onPress={onLoginPress} style={styles.container}>
      {/* --- Image --- */}
      <View style={styles.Img_Parent}>
        <Image source={require("../assets/logo.jpg")} style={styles.Img} />
      </View>
      {/* --- Image --- */}
      {/* Bottom */}
      <View style={styles.userInfo_Parent}>
        <View style={styles.userInfo}>
          <Text style={styles.usernameText}>Welcome {username} !</Text>
          <TouchableOpacity onPress={onViewProfilePress}>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onLogoutPress}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 120,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#bd2a2a",
    padding: 50 + StatusBar.currentHeight,
    flexDirection: "column",
    justifyContent: "space-between", // Align items horizontally with space between
    alignItems: "center",
  },
  userInfo_Parent: {
    // borderWidth: 0.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "column", // Arrange username and view profile button vertically
  },
  usernameText: {
    fontSize: 17,
    color: "white",
    fontFamily: "Kanit",
    paddingVertical: 15,
    letterSpacing: 1.5,
  },
  viewProfileText: {
    fontSize: 13.5,
    color: "white",
    fontFamily: "Kanit",
    letterSpacing: 1.2,
  },
  logoutText: {
    fontSize: 13.5,
    marginTop: 50,
    marginBottom: 10,
    color: "white",
    fontFamily: "Kanit",
    letterSpacing: 1.2,
  },
  Img_Parent: {
    // borderWidth: 0.5,
    paddingVertical: 20,
    width: "100%",
  },
  Img: {
    borderWidth: 0,
    borderColor: "transparent",
    width: 130,
    height: 90,
    alignSelf: "center",
    borderRadius: 30,
  },
});

export default LogoutHeader;
