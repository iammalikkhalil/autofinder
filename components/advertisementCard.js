import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// Fonts
import { useFonts } from "expo-font";

const AdvertisementCard = ({
  title,
  description,
  imageSource,
  onPress,
  buttonText,
  buttonColor,
  titleColor,
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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: "Heebo",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Kanit",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Kanit",
  },
});

export default AdvertisementCard;
