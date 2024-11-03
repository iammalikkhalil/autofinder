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
import { useNavigation, useRoute } from "@react-navigation/native"; // Import navigation hook from react-navigation
import HorizontalScrollItem from "./HorizontallScrollItem";
import ManagedByAutoFinder from "./managedByAutoFinder";
// import InspectionIncludedComponentt from './InspectionIncludedComponent';
// import HorizontalScrollPackagee from './HorizontalScrollPackage';
import { useEffect, useRef } from "react";
import AdvertisementCard from "../advertisementCard";

const HomeBuyCarForMe = ({ navigation }) => {
  const route = useRoute();
  const { service } = route.params;

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
    navigation.navigate("home");
  };
  const handleFacilitateMyCarPurchase = () => {
    navigation.navigate("basicInfoListItForYou", { service: service });
  };
  const handleHorizontalOfferingItemPress = (itemId) => {
    // Handle the press event for the specific item (optional)
    console.log(`Item ${itemId} pressed`);
  };
  const handlerPostAdRightAway = () => {
    // post an ad right away
    console.log("Post an Ad right away");
    navigation.navigate("sellNowChoosePlan");
  };
  // -------------- Services OnPress ---------------
  const Free_Ad = () => {
    navigation.navigate("homeFreeAds");
  };
  const Prem_Ad = () => {
    navigation.navigate("homePremiumAds");
  };
  const Home_List_For_You = () => {
    navigation.navigate("homeListItForYou", { service: "001" });
  };
  const Home_Car_Inspection = () => {
    navigation.navigate("homeCarInspection", { service: "002" });
  };
  const Rent_A_Car = () => {
    navigation.navigate("homeRentACar");
  };
  // -------------- Services OnPress ---------------
  // Main Body
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
          <Text style={styles.title}>Buy Car For Me</Text>
        </View>
      </View>

      <ScrollView>
        <Image
          source={require("../../assets/CarInspection.jpg")}
          style={styles.image}
        />
        <Text style={styles.addText}>Buy Car For Me</Text>

        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFacilitateMyCarPurchase}
          >
            <Text style={styles.buttonText}>Facilitate My Car Purchase</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.addTextChoose}>
          Why AutoFinder is best to "Buy Car For You"?{" "}
        </Text>
        <FeatureLine
          imageSource={require("../../assets/consultation.png")}
          text="Personalized consultation"
        />
        <FeatureLine
          imageSource={require("../../assets/searchCar.png")}
          text="Extensive vehicle search"
        />
        <FeatureLine
          imageSource={require("../../assets/saleman.png")}
          text="Professional purchased executives"
        />
        <FeatureLine
          imageSource={require("../../assets/tensionfree.png")}
          text="Tension free service"
        />

        <Text style={styles.sellWorkText}>
          How AutoFinder Buy Car For Me service works?
        </Text>
        <WorksellForItForMe
          imageSource={require("../../assets/one.png")}
          text="Sign Up for Buy Car For Me service."
        />
        <WorksellForItForMe
          imageSource={require("../../assets/two.png")}
          text="Our team will promptly contact you to collect information for your desired future car."
        />
        <WorksellForItForMe
          imageSource={require("../../assets/three.png")}
          text="you have to pay initial payment through different channels available at your convenience."
        />

        {/* <Text style={styles.sellWorkText}>What's Included in the Car Inpection?</Text>
                <InspectionIncludedComponentt /> */}

        <Text style={styles.sellWorkText}>Summary</Text>
        <Text style={styles.summaryText}>
          Exciting News! Our new "Buy Car For Me" service is here to streamline
          your car-buying journey. Simply share your preferences. Our dedicated
          team will not only find your car but also ensure its quality with a
          thorough inspection. Enjoy transparent pricing and let us negotiate
          the best deal for you. Experience a stress-full car buying experience
          with Autofinder.
        </Text>

        {/* ------- Services Showing ------- */}
        <Text style={[styles.sellWorkText, { marginTop: 20 }]}>
          Services Offered
        </Text>
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
          title="Home List For You"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/list_it_for_you.png")}
          buttonText="Click Now"
          onPress={Home_List_For_You}
          buttonColor="black"
          titleColor="black"
        />
        {/* - */}
        <AdvertisementCard
          title="Home car Inspection"
          description="Auto Finder Service"
          imageSource={require("../../assets/images/car_inspection.png")}
          buttonText="Click Now"
          onPress={Home_Car_Inspection}
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
    color: "black",
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
    paddingLeft: 5,
    paddingRight: 5,
  },
  reportImage: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  worksellForItForMeImage: {
    width: 20,
    height: 20,
    marginRight: 10,
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

export default HomeBuyCarForMe;
