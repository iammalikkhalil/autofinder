import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterContact from "../footerContact";
import axios from "axios";
import call from "react-native-phone-call";
import { UserContext } from "../../context/userContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SellerCarDetail = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carDetails, setCarDetails] = useState({});
  const route = useRoute();
  const itemId = route.params.itemId;
  const [isLoading, setIsloading] = useState(true);
  const [imagesUri, setImagesUri] = useState([]);
  const [carFeatures, setCarFeatures] = useState([]);

  useEffect(() => {
    async function loadItem() {
      try {
        const response = await axios.get(
          `https://autofinder-backend.vercel.app/api/carAd/${itemId}`
        );
        console.log("response", response.data.ok);
        setCarDetails(response.data.data);
        setImagesUri(
          response.data.data.images.map((image) => ({ uri: `${image}` }))
        );
        const nfeatures = response.data.data.features.map((feature) => ({
          name: feature,
          icon: require("../../assets/featureTick.png"),
        }));
        setCarFeatures(nfeatures);
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    loadItem();
  }, []);

  const FeatureItem = ({ feature }) => (
    <View style={styles.feature}>
      <Image source={feature.icon} style={styles.featureIcon} />
      <Text style={styles.featureName}>{feature.name}</Text>
    </View>
  );

  const renderFeatureTable = (features) => {
    const rows = Math.ceil(features.length / 2);
    const featureTable = [];

    for (let i = 0; i < rows; i++) {
      const featureRow = (
        <View key={i} style={styles.tableRow}>
          {features[i * 2] && (
            <View style={styles.tableCell}>
              <FeatureItem feature={features[i * 2]} />
            </View>
          )}
          {features[i * 2 + 1] && (
            <View style={styles.tableCell}>
              <FeatureItem feature={features[i * 2 + 1]} />
            </View>
          )}
        </View>
      );
      featureTable.push(featureRow);
    }

    return featureTable;
  };

  // --- Favorite Ads ---
  const [isFavorite, setIsFavorite] = useState(false);
  const My_Fav_handlePress = async () => {
    try {
      if (carDetails && carDetails._id && user && user._id) {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/addFavorite",
          { userId: user._id, adId: carDetails._id, adType: "CarAd" }
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

  const carSpecs = [
    { name: carDetails.year, icon: require("../../assets/modelYear.png") },
    { name: carDetails.kmDriven, icon: require("../../assets/carMeter.png") },
    { name: carDetails.fuelType, icon: require("../../assets/fuelIcon.png") },
    {
      name: carDetails.transmission,
      icon: require("../../assets/transmission.png"),
    },
  ];

  const handleBack = () => {
    navigation.navigate("home");
  };

  const handleFeature = () => {
    console.log("Car is Featured");
  };

  const handleAuctionSheet = () => {
    Linking.openURL("https://www.google.com");
  };

  const handleInspectionScore = () => {
    Linking.openURL("https://www.google.com");
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imagesUri.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imagesUri.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleSellerDetailsPress = () => {
    navigation.navigate("sellerProfile");
  };

  const handleCallPress = () => {
    console.log("Call Seller pressed");
    const args = {
      number: carDetails.user.phoneNumber,
      prompt: false,
      skipCanOpen: true,
    };
    call(args).catch(console.error);
  };

  const handleSMSPress = () => {
    console.log("SMS pressed");
    const phoneNumber = carDetails.user.phoneNumber;
    const message = "";
    const smsMessage = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsMessage)
      .then(() => console.log("SMS opened successfully"))
      .catch((error) => console.log("Error opening SMS:", error));
  };

  const handleChatPress = () => {
    console.log("Chat pressed");
  };

  const handleWhatsappPress = () => {
    console.log("Whatsapp pressed");
    const phoneNumber = carDetails.user.phoneNumber;
    const adDetails = ``;
    const whatsappMessage = `whatsapp://send?text=${encodeURIComponent(
      adDetails
    )}&phone=${phoneNumber}`;
    Linking.openURL(whatsappMessage)
      .then(() => console.log("WhatsApp opened successfully"))
      .catch((error) => console.log("Error opening WhatsApp:", error));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Image
              source={require("../../assets/back-arrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seller Details</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={
                imagesUri[currentImageIndex]
                  ? { uri: imagesUri[currentImageIndex].uri }
                  : null
              }
              style={styles.image}
            />
            {/* ----- Showing Number Of Days Left - ( Featured Only ) ----- */}
            {carDetails.featured && (
              <>
                {/* --- Featured Text --- */}
                <Text style={styles.featuredText}>
                  {" "}
                  <FontAwesome name="star" size={16} color="white" /> {"  "}
                  Featured
                </Text>
                {/* --- Days Left --- */}
                <View style={styles.Parent_Time_Remain}>
                  <View style={styles.Parent_Sub_Time_Remain}>
                    <Text style={styles.Parent_Sub_Time_Remain_Txt}>
                      <FontAwesome name="calendar" size={16} color="white" /> {"  "}
                      {carDetails?.days
                        ? carDetails.days !== null
                          ? carDetails.days
                          : "-"
                        : "-"}{" "}
                      Days Left
                    </Text>
                  </View>
                </View>
              </>
            )}
            {/* ----- Showing Number Of Days Left - ( Featured Only ) ----- */}
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
              <TouchableOpacity style={styles.button} onPress={handleFeature}>
                <Image
                  source={require("../../assets/featured.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imageCount}>
              <Text style={styles.imageCountText}>
                {currentImageIndex + 1}/{imagesUri.length}
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

          <Text
            style={styles.carNameText}
          >{`${carDetails.brand}, ${carDetails.model}, ${carDetails.varient}`}</Text>

          <Text style={styles.priceText}>
            PKR {carDetails && carDetails.price}
          </Text>

          <Text style={styles.locationText}>
            {carDetails && carDetails.location}
          </Text>

          <View style={styles.specsContainer}>
            {carSpecs.map((spec, index) => (
              <View key={index} style={styles.specItem}>
                <Image source={spec.icon} style={styles.specIcon} />
                <Text style={styles.specName}>{spec.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.scoresContainer}>
            {/* Inspection Score View */}
            <TouchableOpacity
              style={styles.scoreContainer}
              onPress={handleInspectionScore}
            >
              <Text style={styles.scoreHeading}>Inspection Score:</Text>
              <Text style={styles.scoreText}>
                {carDetails.inspectionScore}7/10
              </Text>
            </TouchableOpacity>
            {/* Auction Sheet Score View */}
            <TouchableOpacity
              style={styles.scoreContainer}
              onPress={handleAuctionSheet}
            >
              <Text style={styles.scoreHeading}>Auction Sheet Score:</Text>
              <Text style={styles.scoreText}>
                {carDetails.auctionSheetScore}3/5
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.carDetailContainer}>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Registered In</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.location}
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Assembly</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.assembly}
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Engine Capacity</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.engineCapacity} CC
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Exterior Color</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.bodyColor}
              </Text>
            </View>
          </View>
          {/* <View style={styles.carDetailContainer}>
                    {carDetails.map((detail, index) => (
                        <View key={index} style={styles.carDetailRow}>
                        <Text style={styles.carDetailHeading}>{detail.heading}</Text>
                            <Text style={styles.carDetailName}>{detail.name}</Text>
                            </View>
                            ))}
                        </View> */}

          {/* Note:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                add inspection sheet
            add Auction report */}

          <Text style={styles.sectionFeatureTitle}>Features</Text>

          <View style={styles.featuresContainer}>
            {renderFeatureTable(carFeatures)}
          </View>

          <Text style={styles.sellerDetailTitle}>Seller Detail</Text>
          <TouchableOpacity
            onPress={handleSellerDetailsPress}
            style={styles.sellerDetailButton}
          >
            <Text style={styles.sellerDetailButtonText}>View Profile</Text>
          </TouchableOpacity>
          <Text style={styles.sellerMemberText}>
            Member since{" "}
            {carDetails.createdAt &&
              new Date(carDetails.createdAt).toLocaleDateString()}
          </Text>

          <Text style={styles.sellerDetailTitle}>Seller Comments</Text>
          <Text style={styles.comments}>
            {carDetails && carDetails.description}
          </Text>
        </ScrollView>

        <FooterContact
          onCallPress={handleCallPress}
          onSMSPress={handleSMSPress}
          onChatPress={handleChatPress}
          onWhatsappPress={handleWhatsappPress}
        />
      </View>
    );
  }
};

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
    padding: -100 + StatusBar.currentHeight,
    paddingBottom: 10,
  },
  backButton: {
    // paddingRight: 10,
    tintColor: "white",
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
    marginTop: 20,
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontFamily: "Kanit",
    alignSelf: "center",
    marginTop: 20,
    letterSpacing: 0.5,
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
  },
  priceText: {
    marginTop: 5, // Adjust margin top as needed
    marginLeft: 10,
    color: "black",
    fontSize: 18, // Adjust font size as needed
    fontWeight: "bold",
  },
  locationText: {
    marginTop: 5, // Adjust margin top as needed
    marginLeft: 10,
    color: "grey", // Adjust color as needed
    fontSize: 14, // Adjust font size as needed
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
    fontWeight: "bold",
    marginRight: 10,
    width: "50%",
  },
  carDetailName: {
    flex: 1,
    textAlign: "right",
  },
  // sectionFeatureTitle: {
  //     marginLeft: 20,
  //     marginTop: 10,
  //     fontWeight: 'bold',
  //     fontSize: 18,
  //     color: '#333',
  // },

  featuresContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionFeatureTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableCell: {
    width: "60%", // Adjust as needed
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  featureIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    // marginLeft: 10,
  },
  featureName: {
    fontSize: 12,
    color: "#8b8c8c",
    tintColor: "#Ac3803",
  },

  sellerDetailTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  // sellerDetailButton: {
  //     marginLeft: 20,
  //     marginTop: 10,
  //     backgroundColor: '#Ac3803',
  //     padding: 10,
  //     borderRadius: 5,
  //     alignItems: 'center',
  // },
  sellerDetailButtonText: {
    color: "#2884ec",
    fontSize: 12,
    marginLeft: 20,
    // fontWeight: 'bold',
  },
  sellerMemberText: {
    color: "#bd2a2a",
    fontSize: 12,
    marginLeft: 20,
    fontWeight: "bold",
  },
  comments: {
    fontSize: 12,
    marginLeft: 20,
  },
  featuredText: {
    overflow: "visible",
    borderWidth: 0,
    position: "absolute",
    top: 12,
    left: 0,
    width: "42.2%",
    textAlign: "center",
    paddingVertical: 7,
    paddingHorizontal: 1,
    color: "white",
    backgroundColor: "#EE0101",
    letterSpacing: 1.8,
    fontFamily: "Kanit",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  Parent_Time_Remain: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: "50%",
    paddingRight: 25,
    paddingVertical: 50,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    left: 0,
  },
  Parent_Sub_Time_Remain: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#00A800",
  },
  Parent_Sub_Time_Remain_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
});

export default SellerCarDetail;
