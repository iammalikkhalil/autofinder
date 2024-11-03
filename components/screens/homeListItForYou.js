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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation

import AsyncStorage from "@react-native-async-storage/async-storage";

import HorizontalScrollItem from "./HorizontallScrollItem";
import InspectionIncludedComponentt from "./InspectionIncludedComponent";
// import HorizontalScrollPackagee from "./horizontalScrollPackage";
import ManagedByAutoFinder from "./managedByAutoFinder";
import FeaturedAd from "../featuredAd";
// import { CommonActions } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import AdvertisementCard from "../advertisementCard";

const HomeListItForYou = () => {
  const route = useRoute();
  const { service } = route.params;
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
  // const handleBack = () => {
  //     // Reset the stack to HomeScreen and Dashboard
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [
  //           { name: 'home' },
  //           { name: 'dashboard' },
  //         ],
  //       })
  //     );
  //   };

  const handleScheduleListItforYou = async () => {
    // schedule inspections
    console.log("begin pressed");
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("basicInfoListItForYou", { service: service });
      } else {
        navigation.navigate("welcome");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };
  const handleScheduleListItforYou_1 = async () => {
    // schedule inspections
    console.log("begin pressed");
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("FreeAdsPostService_List");
      } else {
        navigation.navigate("welcome");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };
  const handleHorizontalOfferingItemPress = (itemId) => {
    // Handle the press event for the specific item (optional)
    console.log(`Item ${itemId} pressed`);
  };
  const handleHorizontalPackagesItemPress = (itemId) => {
    // Handle the press event for the specific item (optional)
    console.log(`Item ${itemId} pressed`);
  };
  const handlePackageButtonClick = (itemId) => {
    // Handle the button press event for the specific package
    console.log(`Button pressed for package ${itemId}`);
    console.log("package selected");
    setSelectedPackage(itemId);

    // if (itemId == 1) {
    //     // navigation.navigate('ABCScreenBasic');
    //     console.error('basic package');
    // } else if (itemId == 2) {
    //     // navigation.navigate('ABCScreenstandard');
    //     console.error('standrad package');
    // } else if (itemId == 3) {
    //     // navigation.navigate('ABCScreenPremium');
    //     console.error('premium package');
    // } else {
    //     // Handle the case when no package is selected
    //     console.error('No package selected');
    // }
  };
  const handleViewSampleInpectionReport = () => {
    // View sample inspection report
  };
  const handlerPostAdRightAway = () => {
    navigation.navigate("sellNowChoosePlan");
  };
  // -------------- Services OnPress ---------------
  const Free_Ad = () => {
    navigation.navigate("homeFreeAds");
  };
  const Prem_Ad = () => {
    navigation.navigate("homePremiumAds");
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
          <Text style={styles.title}>AutoFinder List It For You</Text>
        </View>
      </View>
      <ScrollView>
        <Image
          source={require("../../assets/CarInspection.jpg")}
          style={styles.image}
        />
        <Text style={styles.addText}>AutoFinder List It For You</Text>

        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleScheduleListItforYou_1}
          >
            <Text style={styles.buttonText}>Schedule List It For You</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.addTextChoose}>
          Why AutoFinder is best for List It For You?
        </Text>
        <FeatureLine
          imageSource={require("../../assets/tensionfree.png")}
          text="Tension Free Service"
        />
        <FeatureLine
          imageSource={require("../../assets/saleman.png")}
          text="Professional Sales Executive"
        />
        <FeatureLine
          imageSource={require("../../assets/carPrice.png")}
          text="Your Car Your Price"
        />
        <FeatureLine
          imageSource={require("../../assets/peaceMoney.png")}
          text="Peaceful Transaction of your money"
        />

        <Text style={styles.sellWorkText}>How this will happen?</Text>
        <WorksellForItForMe
          imageSource={require("../../assets/one.png")}
          text="Sign Up for List it for you service"
        />
        <WorksellForItForMe
          imageSource={require("../../assets/two.png")}
          text="Book a time and location for the listing service"
        />
        <WorksellForItForMe
          imageSource={require("../../assets/three.png")}
          text="Team of Experts will visit the vehicle owner and conduct the inpections and create a car listing on your behalf"
        />
        <WorksellForItForMe
          imageSource={require("../../assets/four.png")}
          text="Your advertisement is prominently and promoted throughout the AutoFinder's website mobile app"
        />

        {/* <Text style={styles.sellWorkText}>What's Included in the Car Inpection?</Text>

                <InspectionIncludedComponentt /> */}

        <Text style={styles.sellWorkText}>Summary</Text>
        <Text style={styles.summaryText}>
          Our premium service includes professional photo capture, detailed
          inspections, and listing creation on Autofinder's platform. We handle
          all inquiries, manage offers, and negotiate deals on your behalf. With
          us, you're guaranteed a secure payment transfer after finalizing the
          deal. Sell hassle-free with Autofinder.
        </Text>

        {/* ------- Services Showing ------- */}
        <Text style={styles.sellWorkText}>Services Offered</Text>
        {/* - */}
        <AdvertisementCard
          title="Free Ads"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/free_ads.png")}
          buttonText="Click Now"
          onPress={Free_Ad}
          buttonColor="red"
          titleColor="red"
        />
        {/* - */}
        <AdvertisementCard
          title="Premimum Ads"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/premium_ads.png")}
          buttonText="Click Now"
          onPress={Prem_Ad}
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

        <View>
          <ManagedByAutoFinder />
        </View>

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
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
    marginLeft: 5,
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
    fontWeight: "bold",
    alignSelf: "center",
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
    marginTop: 20,
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
  addTextChoose: {
    marginLeft: 10,
    padding: 10,
    color: "#fc6f03",
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
    // tintColor: "#fc6f03",
  },
  featureText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2884ec",
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
  summaryText: {
    textAlign: "center",
    color: "grey",
    fontSize: 12,
    marginHorizontal: 25, // Use marginHorizontal instead of marginLeft
  },
  // reportImage: {
  //     height: 250,
  //     width: 250,
  //     alignSelf: 'center'
  // },
  worksellForItForMeImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    // tintColor: "#fc6f03",
  },
  worksellForItForMeText: {
    fontSize: 14,
    color: "grey",
    marginRight: 10,
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
    fontSize: 16,
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

export default HomeListItForYou;
