import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
// Fonts
import { useFonts } from "expo-font";

const FooterContact = ({
  onCallPress,
  onSMSPress,
  // onChatPress,
  onWhatsappPress,
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
  // Main Body
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onCallPress}
        style={[styles.button, styles.callButton]}
      >
        <Text style={styles.callButton}>Call Seller</Text>
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={onSMSPress} style={styles.iconButton}>
          <Image
            source={require("../assets/smsIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>SMS</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onChatPress} style={styles.iconButton}>
          <Image
            source={require("../assets/chatIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onWhatsappPress} style={styles.iconButton}>
          <Image
            source={require("../assets/whatsappIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    // height: 50,
  },
  buttonText: {
    color: "#2884ec",
    fontSize: 12,
    fontFamily: "Kanit",
    letterSpacing: 1,
    marginLeft: 3,
  },
  callButton: {
    backgroundColor: "#bd2a2a",
    color: "white",
    fontSize: 14,
    fontFamily: "Kanit",
    letterSpacing: 1.5,
  },
  rowContainer: {
    flexDirection: "row",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default FooterContact;
