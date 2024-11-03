import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import ManagedByAutoFinder from "./screens/managedByAutoFinder";
// Fonts Icon
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "../context/userContext";
import call from "react-native-phone-call";
import axios from "axios";

const BuyNowCard = ({
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
}) => {
  useEffect(() => {
    console.log(typeof carImage);
  }, []);

  const { user } = useContext(UserContext);

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

  // --- Favorite Ads ---
  const [isFavorite, setIsFavorite] = useState(false);
  const My_Fav_handlePress = async () => {
    setIsFavorite(!isFavorite);
    console.log(" 😂 Added To Favorite ");
  };
  // --- Favorite Ads ---

  // --- Call Logic Detail ---
  const handleCallPress = () => {
    console.log("Call Seller pressed");
    const args = {
      number: user.phoneNumber, // Ensure this is the correct path to the phone number
      prompt: false,
      skipCanOpen: true,
    };
    call(args).catch(console.error);
  };

  const handleWhatsappPress = () => {
    console.log("Whatsapp pressed");
    const phoneNumber = user.phoneNumber; // Ensure this is the correct path to the phone number
    const adDetails = ``;
    const whatsappMessage = `whatsapp://send?text=${encodeURIComponent(
      adDetails
    )}&phone=${phoneNumber}`;
    Linking.openURL(whatsappMessage)
      .then(() => console.log("WhatsApp opened successfully"))
      .catch((error) => console.log("Error opening WhatsApp : ", error));
  };
  // --- Call Logic Detail ---

  return (
    <View style={styles.cardParent}>
      <View style={[styles.card, cardStyle]}>
        <View style={styles.imageContainer}>
          <Image source={source} style={styles.image} />
          {/* --- ManagedByAutoFinder --- */}
          {isManagedByAutoFinder && (
            // <Image
            //   source={require("../assets/featured.png")}
            //   style={styles.featuredIcon}
            // />
            // --- New ---
            <Text style={styles.featuredText_1}>Manage Ad By Auto Finder</Text>
            // --- New ---
          )}
          {/* --- ManagedByAutoFinder --- */}
          {/* --- Featured --- */}
          {isFeatured && (
            // <Image
            //   source={require("../assets/featured.png")}
            //   style={styles.featuredIcon}
            // />
            // --- New ---
            <Text style={styles.featuredText}>Featured</Text>
            // --- New ---
          )}
          {/* --- Featured --- */}
          {/* ----- Add To Favorite ----- */}
          <View style={styles.buttonContainer_Fav}>
            <TouchableOpacity
              style={styles.button_Fav}
              onPress={My_Fav_handlePress}
            >
              <Image
                source={
                  isFavorite
                    ? require("../assets/My_Fav_Red.png")
                    : require("../assets/My_Fav_White.png")
                }
                style={styles.buttonIcon_Fav}
              />
            </TouchableOpacity>
            {/* ----- Add To Favorite ----- */}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>
            {name} {model} , {variant}
          </Text>
          {/* <Text style={styles.variant}>{variant}</Text> */}
          <Text style={styles.price}>PKR {price}</Text>
          {/* Below View Parent */}
          <View style={styles.parentView}>
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
          </View>
          {/* --- Call --- */}
          <View style={styles.parentBtnPress_Head}>
            {/* Button */}
            <TouchableOpacity
              style={[styles.parentBtnPress, { backgroundColor: "#FFE1E1" }]}
              onPress={handleCallPress}
            >
              <Text style={styles.parentBtnPress_Txt_1}>Sim Call</Text>
              <Text style={styles.parentBtnPress_Txt_2}>
                <MaterialCommunityIcons
                  name="phone-forward"
                  size={22}
                  color="#Bc0000"
                />
              </Text>
            </TouchableOpacity>
            {/* Button */}
            <TouchableOpacity
              style={[styles.parentBtnPress, { backgroundColor: "#E6FFDF" }]}
              onPress={handleWhatsappPress}
            >
              <Text style={styles.parentBtnPress_Txt_1}>Whatsapp</Text>
              <Text style={styles.parentBtnPress_Txt_2}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={22}
                  color="green"
                />
              </Text>
            </TouchableOpacity>
          </View>
          {/* --- Call --- */}
        </View>
      </View>
      {/* Render additional info if available */}
      {additionalInfo}
    </View>
  );
};

const styles = StyleSheet.create({
  cardParent: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingBottom: 3,
    paddingHorizontal: 0,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: "100%",
    marginRight: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // overflow: "hidden", // Hides any content overflowing out of the container
  },
  buttonContainer_Fav: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 3,
    right: 0,
    padding: 0,
  },
  button_Fav: {
    borderRadius: 30,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: 1,
  },
  buttonIcon_Fav: {
    width: 30,
    height: 30,
    // tintColor: "white",
  },
  // featuredIcon: {
  //   borderWidth: 0.5,
  //   borderColor: "black",
  //   position: "absolute",
  //   top: 150,
  //   right: 10,
  //   width: 50,
  //   height: 50,
  //   overflow: "visible",
  // },
  featuredText: {
    overflow: "visible",
    borderWidth: 0,
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 9,
    paddingVertical: 9,
    color: "white",
    backgroundColor: "#EE0101",
    letterSpacing: 1.8,
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
    paddingHorizontal: 9,
    paddingVertical: 9,
    color: "black",
    backgroundColor: "#FFCD03",
    letterSpacing: 1.8,
    fontFamily: "Kanit",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    paddingVertical: 10,
    color: "#bd2a2a",
    letterSpacing: 1,
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 15,
    fontFamily: "Heebo",
    color: "#4A4A4A",
    paddingBottom: 8,
    letterSpacing: 1,
  },
  parentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  upperView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lowerView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 3,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Kanit",
    letterSpacing: 1,
    paddingLeft: 9,
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
  parentBtnPress_Head: {
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderTopColor: "#DCDCDC",
    // borderColor: "transparent",
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  parentBtnPress: {
    borderWidth: 0,
    borderColor: "transparent",
    borderColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 7,
    borderRadius: 5,
    width: "47%",
    flexDirection: "row",
    justifyContent: "center",
  },
  parentBtnPress_Txt_1: {
    borderWidth: 0,
    borderColor: "transparent",
    textAlign: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
    color: "grey",
    width: "75%",
    paddingTop: 0,
    fontSize: 15,
  },
  parentBtnPress_Txt_2: {
    borderWidth: 0,
    borderColor: "transparent",
    textAlign: "center",
    width: "25%",
  },
});

export default BuyNowCard;
