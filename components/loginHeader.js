// LoginHeader.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { useContext } from "react";
import { UserContext } from "../context/userContext";
// Fonts
import { useFonts } from "expo-font";

const LoginHeader = ({ onLoginPress }) => {
  const { user } = useContext(UserContext);
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
      <Text style={styles.Txt}>Continue With Login</Text>
      <TouchableOpacity onPress={onLoginPress} style={styles.button}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: StatusBar.currentHeight,
    backgroundColor: "#bd2a2a",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 70,
    paddingVertical: 11,
    paddingHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 5,
  },
  loginText: {
    fontSize: 17,
    color: "#bc0000",
    fontFamily: "Heebo",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  Txt: {
    fontFamily: "Kanit",
    letterSpacing: 2,
    fontSize: 14,
    color: "white",
    paddingVertical: 10,
  },
});

export default LoginHeader;
