import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import FooterContact from "../footerContact";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const SellerRentDetail = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [carDetails, setCarDetails] = useState({});
  const route = useRoute();
  const itemId = route.params.itemId;
  const [isLoading, setIsloading] = useState(true);
  const [images, setImages] = useState([]);
  const [imagesUri, setImagesUri] = useState([]);
  useEffect(() => {
    async function loadItem() {
      try {
        const response = await axios.post(
          `https://autofinder-backend.vercel.app/api/carRentalAd/getOne`,
          { itemId }
        );
        console.log("response", response.data.ok);
        setCarDetails(response.data.data);
        setImagesUri(
          response.data.data.images.map((image) => ({ uri: `${image}` }))
        );
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    loadItem();
  }, []);

  const FeatureItem = ({ feature }) => (
    <View style={styles.feature}>
      <Image
        source={feature.icon}
        style={[styles.featureIcon, { tintColor: "#fc6f03" }]}
      />
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

  const carSpecs = [
    { name: carDetails.Year, icon: require("../../assets/modelYear.png") },
    { name: carDetails.carType, icon: require("../../assets/carTypee.png") },
    { name: carDetails.engineType, icon: require("../../assets/fuelIcon.png") },
    {
      name: carDetails.carTransmission,
      icon: require("../../assets/transmission.png"),
    },
  ];

  // const carDetails = [
  //     { heading: 'Registered In', name: 'Islamabad' },
  //     { heading: 'Exterior Color', name: 'white' },
  //     { heading: 'Assembly', name: 'imported' },
  //     { heading: 'Engine Capacity', name: '1000' },
  //     { heading: 'Body Type', name: 'Hatchback' },
  //     { heading: 'Chassis no', name: 'M700A-1002079' },
  //     { heading: 'Auction Grade', name: '3.5' },
  //     { heading: 'Last Updated', name: '9 FEB 2024' },
  //     { heading: 'Ad ID', name: '8370512' },
  //     { heading: 'Date of Inspection', name: '9 FEB 2024' },
  //     // Add more features as needed
  // ];

  const carFeatures = [
    { name: "Feature 1", icon: require("../../assets/modelYear.png") },
    { name: "Feature 2", icon: require("../../assets/modelYear.png") },
    { name: "Feature 3", icon: require("../../assets/modelYear.png") },
    { name: "Feature 4", icon: require("../../assets/modelYear.png") },
    { name: "Feature 4", icon: require("../../assets/modelYear.png") },
    { name: "Feature 6", icon: require("../../assets/modelYear.png") },
    // Add more features as needed
  ];

  const carPrice = "1,50,000";
  const carLocation = "Karachi, Pakistan";
  const handleBack = () => {
    navigation.navigate("home");
  };

  const handleShare = () => {
    console.log("Share button pressed");
  };

  const handleSaved = () => {
    console.log("Saved button pressed");
  };

  const handleImageChange = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
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
    // Add your logic here
  };

  const handleSMSPress = () => {
    console.log("SMS pressed");
    // Add your logic here
  };

  const handleChatPress = () => {
    console.log("Chat pressed");
    // Add your logic here
  };

  const handleWhatsappPress = () => {
    console.log("Whatsapp pressed");
    // Add your logic here
  };

  const handleRentACar = () => {
    navigation.navigate("rentPostService");
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
            <Text style={styles.title}>Seller Rent Detail</Text>
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleShare}>
                <Image
                  source={require("../../assets/shareIcon.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSaved}>
                <Image
                  source={require("../../assets/savedAd.png")}
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
            Rs. {carDetails && carDetails.price}/day
          </Text>

          <Text style={styles.locationText}>
            {carDetails && carDetails.city}
          </Text>

          <View style={styles.specsContainer}>
            {carSpecs.map((spec, index) => (
              <View key={index} style={styles.specItem}>
                <Image source={spec.icon} style={styles.specIcon} />
                <Text style={styles.specName}>{spec.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.carDetailContainer}>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Driver Availability</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.driverAvailability}
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Days Availability</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.Days}
              </Text>
            </View>

            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Engine Capacity</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.engineCapacity}
              </Text>
            </View>

            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Seating Capacity</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.seatingCapacity}
              </Text>
            </View>

            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Between Cities</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.betweenCities}
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Assembly Integrated</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.carAssembly}
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Body Color</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.bodyColor}
              </Text>
            </View>

            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Payment Type</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.paymentMethod}
              </Text>
            </View>
            <View style={styles.carDetailRow}>
              <Text style={styles.carDetailHeading}>Document Requirement</Text>
              <Text style={styles.carDetailName}>
                {carDetails && carDetails.DocumentationRequirements}
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

          <Text style={styles.sellerDetailTitle}>Renter Detail</Text>
          <TouchableOpacity
            onPress={handleSellerDetailsPress}
            style={styles.sellerDetailButton}
          >
            <Text style={styles.sellerDetailButtonText}>View Profile</Text>
          </TouchableOpacity>
          <Text style={styles.sellerMemberText}>Member since Feb 24, 2019</Text>

          {/* <Text style={styles.sellerDetailTitle}>Seller Comments</Text> */}
        </ScrollView>

        {/* <FooterContact
          onCallPress={handleCallPress}
          onSMSPress={handleSMSPress}
          onChatPress={handleChatPress}
          onWhatsappPress={handleWhatsappPress}
        /> */}

        <TouchableOpacity style={styles.button} onPress={handleRentACar}>
          <Text style={styles.buttonText}>Contact Renter</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

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
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
  },
  imageContainer: {
    // position: 'relative',
    // marginTop: 0,
  },
  image: {
    height: 300,
    width: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    right: 0,
    padding: 10,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  imageCount: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
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
    fontSize: 14,
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
  button: {
    backgroundColor: "#bd2a2a",
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SellerRentDetail;

