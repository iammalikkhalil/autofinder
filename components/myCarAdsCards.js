import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// Fonts
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MyCarAdsCards = ({
  _id,
  carImage,
  name,
  model,
  variant,
  price,
  year,
  fuelType,
  kmReading,
  location,
  isInspected,
  isFeatured,
  isManagedByAutoFinder,
  onBoostPress,
  onRemovePress,
  pendingCard,
}) => {
  useEffect(() => {
    console.log(typeof carImage);
  }, []);

  const cardStyle = {
    ...(isInspected
      ? {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      : {}), // Apply bottom border radius conditionally
  };
  const additionalCard = {
    ...(isInspected
      ? {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }
      : {}),
  };

  let additionalInfo = null;

  if (isInspected) {
    additionalInfo = (
      <View style={[styles.additionalInfoContainer, additionalCard]}>
        {isInspected && (
          <View style={styles.additionalInfoItem}>
            <Image
              source={require("../assets/inspected.png")}
              style={styles.additionalInfoIcon}
            />
            <Text style={styles.additionalInfoText}>Inspected</Text>
            <Text style={styles.additionalInfoSubtext}> 8/10</Text>
          </View>
        )}
        {/* {isManagedByAutoFinder && (
          <View style={styles.additionalInfoItem}>
            <Image
              source={require("../assets/fuelIcon.png")}
              style={styles.additionalInfoIcon}
            />
            <Text style={styles.additionalInfoText}>Managed by AutoFinder</Text>
          </View>
        )} */}
      </View>
    );
  }

  const source = { uri: carImage };

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
      <View style={[styles.card, cardStyle]}>
        {/* --- Manage Ad By Auto Finder --- */}
        {isManagedByAutoFinder && (
          <Text style={styles.featuredText_1}>Manage Ad</Text>
          // --- New ---
        )}
        {/* --- Featured --- */}
        {isFeatured && (
          // <Image
          //   source={require("../assets/featured.png")}
          //   style={styles.featuredIcon}
          // />
          // --- New ---
          <Text style={styles.featuredText}>
            {/* <FontAwesome name="star" size={18} color="white" /> */}
            Featured
          </Text>
          // --- New ---
        )}
        <View style={styles.imageContainer}>
          <Image source={source} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>
            {name} {model}
          </Text>
          <Text style={styles.variant}>{variant ? variant : " - "}</Text>
          <Text style={styles.price}>PKR {price}</Text>

          {/* Upper view */}
          <View style={styles.upperView}>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/modelYear.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{year}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/carMeter.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{kmReading}</Text>
            </View>
          </View>

          {/* Lower view */}
          <View style={styles.lowerView}>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/fuelIcon.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{fuelType}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/locationIcon.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{location}</Text>
            </View>
          </View>
          {!pendingCard && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => onBoostPress(_id)}
                style={[styles.button, styles.boostButton]}
              >
                <Text style={styles.buttonText}>Boost Ad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onRemovePress(_id)}
                style={[styles.button, styles.removeButton]}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* Render additional info if available */}

      {additionalInfo}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 25,
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
    marginTop: 33,
    justifyContent: "flex-start", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 110,
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
    paddingLeft: 8,
  },
  name: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    paddingTop: 0,
    paddingBottom: 5,
    color: "#bd2a2a",
    letterSpacing: 1,
  },
  variant: {
    textTransform: "capitalize",
    fontFamily: "Kanit",
    fontSize: 13,
    marginBottom: 5,
    color: "grey",
    letterSpacing: 1,
  },
  price: {
    fontSize: 13.5,
    fontFamily: "Heebo",
    color: "#4A4A4A",
    paddingBottom: 10,
    letterSpacing: 1,
  },
  upperView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 0,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Kanit",
    letterSpacing: 1,
    paddingLeft: 6,
  },
  infoText_2: {
    color: "grey",
    fontSize: 13,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
    paddingLeft: 9,
    textAlign: "right",
    paddingRight: 5,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  additionalInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  additionalInfoIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginLeft: 5,
  },
  additionalInfoText: {
    fontSize: 12,
    color: "#2e8b57",
  },
  additionalInfoSubtext: {
    fontSize: 14,
    color: "#bd2a2a",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  button: {
    flex: 1,
    width: "50%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14.5,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
  },
  boostButton: {
    backgroundColor: "green", // Green color
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: "#Bc0000", // Red color
    marginLeft: 5,
  },
  featuredText: {
    overflow: "visible",
    borderWidth: 0,
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: "white",
    backgroundColor: "#EE0101",
    letterSpacing: 1.5,
    fontFamily: "Kanit",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 10,
  },
  featuredText_1: {
    overflow: "visible",
    borderWidth: 0,
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: "black",
    backgroundColor: "#FFCD03",
    letterSpacing: 1.5,
    fontFamily: "Kanit",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 10,
  },
});

export default MyCarAdsCards;
