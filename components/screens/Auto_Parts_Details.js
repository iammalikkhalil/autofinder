import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Linking,
  ActivityIndicator,
} from "react-native";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import call from "react-native-phone-call";
import SendIntent from "react-native-send-intent";
import { UserContext } from "../../context/userContext";
import FooterContact from "../footerContact";

export default function Auto_Parts_Details() {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFeature = () => {
    console.log("Car is Featured");
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : item.images.length - 1
    );
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < item.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  // --- Favorite Ads ---
  const [isFavorite, setIsFavorite] = useState(false);
  const My_Fav_handlePress = async () => {
    try {
      if (item && item._id && user && user._id) {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/addFavorite",
          { userId: user._id, adId: item._id, adType: "AutoPart" }
        );
        // alert(" Added To Favorites ");
        setIsFavorite(!isFavorite);
        console.log(response);
        console.log(" Added To Favorite ");

      }
    } catch (error) {
      console.log(error);
    }
  };
  // --- Favorite Ads ---

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "MMMM d, yyyy h:mm a");
  };

  const handleCallPress = () => {
    console.log("Call Seller pressed");
    const args = {
      number: item.user.phoneNumber, // Ensure this is the correct path to the phone number
      prompt: false,
      skipCanOpen: true,
    };
    call(args).catch(console.error);
  };

  const handleSMSPress = () => {
    console.log("SMS pressed");
    const phoneNumber = item.user.phoneNumber; // Ensure this is the correct path to the phone number
    const message = "";
    const smsMessage = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsMessage)
      .then(() => console.log("SMS opened successfully"))
      .catch((error) => console.log("Error opening SMS:", error));
  };

  const handleChatPress = () => {
    console.log("Chat pressed");
    // Add your logic here
  };

  const handleWhatsappPress = () => {
    console.log("Whatsapp pressed");
    const phoneNumber = item.user.phoneNumber; // Ensure this is the correct path to the phone number
    const adDetails = ``;
    const whatsappMessage = `whatsapp://send?text=${encodeURIComponent(
      adDetails
    )}&phone=${phoneNumber}`;
    Linking.openURL(whatsappMessage)
      .then(() => console.log("WhatsApp opened successfully"))
      .catch((error) => console.log("Error opening WhatsApp : ", error));
  };

  if (!item) {
    return <ActivityIndicator size="large" />;
  }

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
          <Text style={styles.title}>Auto Parts Details</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.images[0] }} style={styles.image} />
          {/* ----- Add To Favorite ----- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={My_Fav_handlePress}
            >
              <Image
                source={
                  isFavorite
                    ? require("../../assets/My_Fav_Red.png")
                    : require("../../assets/My_Fav_White.png")
                }
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            {/* ----- Add To Favorite ----- */}
            {/* --- Featuree Btn --- */}
            <TouchableOpacity style={styles.button} onPress={handleFeature}>
              <Image
                source={require("../../assets/featured.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            {/* --- Featuree Btn --- */}
          </View>
          <View style={styles.imageCount}>
            <Text style={styles.imageCountText}>
              {currentImageIndex + 1}/{item.images.length}
            </Text>
          </View>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              onPress={handlePrevImage}
              style={styles.navigationButton}
            >
              <Image
                source={require("../../assets/previous.png")}
                style={styles.navigationButtonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNextImage}
              style={styles.navigationButton}
            >
              <Image
                source={require("../../assets/next.png")}
                style={styles.navigationButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.carNameText}>{item.title}</Text>

        <Text style={styles.priceText}>{item.price} PKR</Text>

        <Text style={styles.locationText}>{item.location}</Text>

        <Text style={styles.BD_Txt_2_1}>{formatDate(item.createdAt)}</Text>

        <View style={[styles.carDetailContainer, { marginBottom: 20 }]}>
          <View style={styles.carDetailRow}>
            <Text style={styles.carDetailHeading}>Id</Text>
            <Text style={styles.carDetailName}>{item.category._id}</Text>
          </View>
          <View style={styles.carDetailRow}>
            <Text style={styles.carDetailHeading}>Name</Text>
            <Text style={styles.carDetailName}>{item.category.name}</Text>
          </View>
          <View style={styles.carDetailRow_E}>
            <Text style={styles.carDetailHeading_E}>Description</Text>
            <Text style={styles.carDetailName_E}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
      {/* <Text>No : {user.phoneNumber}</Text> */}
      <FooterContact
        onCallPress={handleCallPress}
        onSMSPress={handleSMSPress}
        onChatPress={handleChatPress}
        onWhatsappPress={handleWhatsappPress}
      />
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
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
    marginLeft: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginBottom: 15,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 17,
    fontFamily: "Kanit",
    alignSelf: "center",
    letterSpacing: 1.5,
  },
  imageContainer: {
    // position: 'relative',
    // marginTop: 0,
  },
  image: {
    height: 300,
    width: "100%",
    resizeMode: "cover",
    paddingBottom: 15,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 13,
    right: 0,
    padding: 10,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 7,
    marginRight: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    // tintColor: "white",
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
    // marginLeft: 5,
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
    marginTop: 10, // Adjust margin top as needed
    marginLeft: 10,
    color: "#bd2a2a",
    fontSize: 14, // Adjust font size as needed
    // fontWeight: 'bold',
    fontFamily: "Kanit",
  },
  priceText: {
    marginTop: 5, // Adjust margin top as needed
    marginLeft: 10,
    color: "black",
    fontSize: 17, // Adjust font size as needed
    fontFamily: "Heebo",
  },
  locationText: {
    marginTop: 5, // Adjust margin top as needed
    marginLeft: 10,
    color: "grey", // Adjust color as needed
    fontSize: 14, // Adjust font size as needed
    fontFamily: "Kanit",
  },
  specsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
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
  carDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf2",
    paddingBottom: 10,
  },
  carDetailHeading: {
    marginRight: 10,
    width: "50%",
    fontSize: 14,
    fontFamily: "Heebo",
    letterSpacing: 0.5,
  },
  carDetailName: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
  },
  carDetailRow_E: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf2",
    paddingBottom: 10,
  },
  carDetailHeading_E: {
    marginRight: 10,
    width: "50%",
    fontSize: 14,
    fontFamily: "Heebo",
    letterSpacing: 0.5,
  },
  carDetailName_E: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
  },
  BD_Txt_2_1: {
    fontSize: 12,
    // borderWidth: 0.5,
    color: "#575252",
    paddingHorizontal: 20,
    paddingVertical: 3,
    letterSpacing: 1,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Kanit",
  },
});
