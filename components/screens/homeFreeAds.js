import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Animated,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation
import HorizontalScrollItem from "./HorizontallScrollItem";
import ManagedByAutoFinder from "./managedByAutoFinder";
import FeaturedAd from "../featuredAd";
import AutoFinderServices from "../autoFinderServices";
import AdvertisementCard from "../advertisementCard";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";

import backArrow from "../../assets/back-arrow.png";
import carInspection from "../../assets/CarInspection.jpg";
import numberOne from "../../assets/one.png";
import numberTwo from "../../assets/two.png";
import numberThree from "../../assets/three.png";
import numberFour from "../../assets/four.png";
// Fonts
import { useFonts } from "expo-font";

const HomeFreeAds = () => {
  // const route = useRoute();
  // const { service } = route.params;
  const navigation = useNavigation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const FeatureLine = ({ imageSource, text }) => (
    <View style={styles.featureLine}>
      <Image source={imageSource} style={styles.featureImage} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
  const WorksellForItForMe = ({ imageSource, text }) => (
    <View style={styles.worksellForItForMeLine}>
      <Image source={imageSource} style={styles.worksellForItForMeImage} />
      <Text style={styles.worksellForItForMeText}>{text}</Text>
    </View>
  );
  const handleBack = () => {
    // navigation.goBack(); // Go back when the back button is pressed
    navigation.goBack();
    // navigation.navigate('dashboard');
  };
  const handlePostAd = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("freeAdsPostService");
      } else {
        navigation.navigate("welcome");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };
  const handleListItForYouPress = () => {
    // Handle Premium Ads press
    console.log("Premium Ads pressed");
    // navigation.navigate("homeCarInspection");
    // navigation.navigate("homeCarInspection", { service: service });
  };

  const handlePremiumAdsPress = () => {
    // Handle Free Ads press
    console.log("Free Ads pressed");
  };

  // const handleCarInspectionPress = () => {
  //   // Handle Managed Ads press
  //   console.log("Managed Ads pressed");
  // };

  const handleBoostAdsPress = () => {
    // Handle Car Inspection press
    console.log("Car Inspection pressed");
  };
  const handlerPostAdRightAway = () => {
    navigation.navigate("sellNowChoosePlan");
  };

  const inspectionAd = () => {
    navigation.navigate("basicInfoCarInspection");
  };
  // -------------- Services OnPress ---------------
  const Prem_Ad = () => {
    navigation.navigate("homePremiumAds");
  };
  const Home_List_For_You = () => {
    navigation.navigate("homeListItForYou", { service: "001" });
  };
  const Home_Car_Inspection = () => {
    navigation.navigate("homeCarInspection", { service: "002" });
  };
  const Buy_Car_For_Me = () => {
    navigation.navigate("homeBuyCarForMe", { service: "003" });
  };
  const Rent_A_Car = () => {
    navigation.navigate("homeRentACar");
  };
  // -------------- Services OnPress ---------------
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/My_Soul/Kanit-Black.ttf"),
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={backArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Free Ads Service</Text>
        </View>
      </View>
      <ScrollView>
        <Image source={carInspection} style={styles.image} />
        <Text style={styles.addText}>AutoFinder Free Ads Service</Text>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.button} onPress={handlePostAd}>
            <Text style={styles.buttonText}>Post Ad</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.sellWorkText}>
          How AutoFinder Free Ad Service Works?
        </Text>
        <WorksellForItForMe
          imageSource={numberOne}
          text="Sign Up for free ad services."
        />
        <WorksellForItForMe
          imageSource={numberTwo}
          text="Providing details about vehicle you want to sell."
        />
        <WorksellForItForMe
          imageSource={numberThree}
          text="Your free ad will be displayed in the free ad area."
        />
        <WorksellForItForMe
          imageSource={numberFour}
          text="Interested buyers can contact the seller as well."
        />

        <Text style={styles.sellWorkText}>Note</Text>
        <Text style={styles.NoteText}>
          It's important to note that while the regular ad listing on Autofinder
          is typically free, we offer additional paid services such as "List if
          for you, Premium Ads Service, Car Inspection Service, Boost your Ads
          Service", to enhace the visibilty and promotion of your ad.
        </Text>

        <Text style={styles.sellWorkText}>AutoFinder Services</Text>
        <AutoFinderServices
          onPremiumAdsPress={handleListItForYouPress}
          onFreeAdsPress={handlePremiumAdsPress}
          onManagedAdsPress={handleBoostAdsPress}
          // onCarInspectionPress={handleCarInspectionPress}
        />

        {/* <Text style={styles.sellWorkText}>Managed By AutoFinder</Text> */}
        <View>
          <ManagedByAutoFinder />
        </View>

        {/* ------- Services Showing ------- */}
        <Text style={styles.sellWorkText}>Services Offered</Text>
        {/* - */}
        <AdvertisementCard
          title="Premimum Ads"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/premium_ads.png")}
          buttonText="Click Now"
          onPress={Prem_Ad}
          buttonColor="red"
          titleColor="red"
        />
        {/* - */}
        <AdvertisementCard
          title="Home List For You"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/list_it_for_you.png")}
          buttonText="Click Now"
          onPress={Home_List_For_You}
          buttonColor="blue"
          titleColor="blue"
        />
        {/* - */}
        <AdvertisementCard
          title="Home car Inspection"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/car_inspection.png")}
          buttonText="Click Now"
          onPress={Home_Car_Inspection}
          buttonColor="black"
          titleColor="black"
        />
        {/* - */}
        <AdvertisementCard
          title="Buy Car For Me"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/buy_car_for_me.png")}
          buttonText="Click Now"
          onPress={Buy_Car_For_Me}
          buttonColor="darkgreen"
          titleColor="darkgreen"
        />
        {/* - */}
        <AdvertisementCard
          title="Rent A Car"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/rent_car.png")}
          buttonText="Click Now"
          onPress={Rent_A_Car}
          buttonColor="#FFC300"
          titleColor="#FFC300"
        />
        {/* ------- Services Showing ------- */}

        <Text style={[styles.sellWorkText, { marginTop: 35 }]}>
          Car Inspection
        </Text>
        <AdvertisementCard
          title="Car Inspection"
          description="Get Your Car Inspected By Our Experts."
          imageSource={require("../../assets/inspectionCar.png")}
          buttonText="Get My Car Inspected"
          onPress={inspectionAd}
          buttonColor="#FC8E03"
          titleColor="#FC8E03"
        />

        {/* <Text style={styles.sellWorkText}>Feature ad</Text> */}
        <View>
          <FeaturedAd />
        </View>

        <Text style={styles.sellWorkText}>Looking to Sell Your Car?</Text>

        <View style={styles.roundedViewsContainer}>
          <View style={styles.roundedView}>
            <Text style={styles.roundedViewText}>Sell today!</Text>
            <Text style={styles.subtext}>
              Place your ad to uncover the best offer from our potential buyers
            </Text>
            <TouchableOpacity onPress={handlerPostAdRightAway}>
              <Text style={styles.textButton}>Post an Ad right away</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
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
    // paddingTop: StatusBar.currentHeight,
    // alignContent: "center",
    // alignItems: "center",
    paddingVertical: 10,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
    marginLeft: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    alignSelf: "center",
    letterSpacing: 1,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  addText: {
    textAlign: "center",
    padding: 10,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 0.5,
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
    fontFamily: "Kanit",
    letterSpacing: 2,
  },
  addTextChoose: {
    marginLeft: 10,
    padding: 10,
    color: "firebrick",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  featureLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  featureImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#bd2a2a",
  },
  featureText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  sellWorkText: {
    marginLeft: 10,
    padding: 5,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  worksellForItForMeLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  NoteText: {
    textAlign: "center",
    color: "grey",
    fontSize: 12,
    paddingHorizontal: 10,
    marginTop: "auto",
    marginBottom: "auto",
  },
  reportImage: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  worksellForItForMeImage: {
    width: 20,
    height: 20,
    marginRight: 5,
    // tintColor: "#fc6f03",
  },
  worksellForItForMeText: {
    fontSize: 14,
    color: "grey",
  },
  horizontalScroll: {
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  roundedViewsContainer: {
    flexDirection: "column",
    marginTop: 5,
    alignItems: "center",
  },
  roundedView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 320,
    height: 120,
    margin: 20,
  },
  roundedViewText: {
    fontSize: 14,
    color: "#bd2a2a",
    fontWeight: "bold",
    marginTop: 1,
  },
  subtext: {
    fontSize: 14,
    color: "grey",
    marginTop: 10,
  },
  textButton: {
    marginTop: 20,
    color: "royalblue",
  },
});

export default HomeFreeAds;
