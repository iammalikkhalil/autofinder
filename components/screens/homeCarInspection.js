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
import InspectionIncludedComponentt from "./InspectionIncludedComponent";
import HorizontalScrollPackagee from "./horizontalScrollPackage";
import ManagedByAutoFinder from "./managedByAutoFinder";
// import { CommonActions } from '@react-navigation/native';
import { useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import AdvertisementCard from "../advertisementCard";

const HomeCarInspection = () => {
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
  const handleScheduleInspeection = () => {
    // schedule inspections
    console.log("begin pressed");
    navigation.navigate("BasicinfoCarIns_2");
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
    // console.log(`Button pressed for package ${itemId}`);
    // console.log("package selected");
    setSelectedPackage(itemId);

    if (itemId === 1) {
      // navigation.navigate('ABCScreenBasic');
      console.error("basic package");
    } else if (itemId === 2) {
      // navigation.navigate('ABCScreenstandard');
      console.error("standrad package");
    } else if (itemId === 3) {
      // navigation.navigate('ABCScreenPremium');
      console.error("premium package");
    }
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
  const Home_List_For_You = () => {
    navigation.navigate("homeListItForYou", { service: "001" });
  };
  const Buy_Car_For_Me = () => {
    navigation.navigate("homeBuyCarForMe", { service: "003" });
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
          <Text style={styles.title}>AutoFinder Car Inspection</Text>
        </View>
      </View>
      <ScrollView>
        <Image
          source={require("../../assets/CarInspection.jpg")}
          style={styles.image}
        />
        <Text style={styles.addText}>AutoFinder Car Inspection</Text>

        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleScheduleInspeection}
          >
            <Text style={styles.buttonText}>Schedule Inspection</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.addTextChoose}>
          Why AutoFinder is more credible for Car Inspection?
        </Text>
        <FeatureLine
          imageSource={require("../../assets/reportsCar.png")}
          text="Extensive reports of vehicles"
        />
        <FeatureLine
          imageSource={require("../../assets/qualification.png")}
          text="Skilled and certified staff"
        />
        <FeatureLine
          imageSource={require("../../assets/carInspect.png")}
          text="Satisfied inspection"
        />

        <Text style={styles.sellWorkText}>
          How AutoFinder Car Inpection Works?
        </Text>
        <WorksellForItForMe
          imageSource={require("../../assets/one.png")}
          text="Sign Up for car inpection services"
        />
        <WorksellForItForMe
          imageSource={require("../../assets/two.png")}
          text="Book a time and location for the car inspection"
        />
        <WorksellForItForMe
          imageSource={require("../../assets/three.png")}
          text="Team of Experts will visit the vehicle owner and conduct the inpections"
        />
        <WorksellForItForMe
          imageSource={require("../../assets/four.png")}
          text="Get your detailed inspection report in an hour via WhatsApp or email"
        />

        <Text style={styles.sellWorkText}>
          What's Included in the Car Inpection?
        </Text>

        <InspectionIncludedComponentt />

        <Text style={styles.sellWorkText}>Summary</Text>
        <Text style={styles.summaryText}>
          AutoFinder car inspection serves as a valuable resource for both
          buyers and sellers in the used car market. It promotes transparency,
          trust and informed decision making, helping consumers make safer and
          more confident choices when purchasing a vehicle.
        </Text>

        <Text style={styles.sellWorkText}>
          Sample AutoFinder Inpection Report
        </Text>
        <Image
          source={require("../../assets/inspectionReport.jpg")}
          style={styles.reportImage}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleViewSampleInpectionReport}
        >
          <Text style={styles.buttonText}>View Sample Inspection Report</Text>
        </TouchableOpacity>

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

        <Text style={styles.sellWorkText}>Inspection Packages</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          <HorizontalScrollPackagee
            imageSource={require("../../assets/carupto1000cc.jpg")}
            title="Basic Package"
            content="Upto 1000cc"
            onPress={() => handleHorizontalPackagesItemPress(1)}
            buttonText="PKR 4,800"
            isSelected={selectedPackage === 1}
            onButtonClick={() => handlePackageButtonClick(1)}
          />
          <HorizontalScrollPackagee
            imageSource={require("../../assets/carupto1000cc.jpg")}
            title="Standard Package"
            content="above 1000cc"
            onPress={() => handleHorizontalPackagesItemPress(2)}
            buttonText="PKR 6,800"
            isSelected={selectedPackage === 2}
            onButtonClick={() => handlePackageButtonClick(2)}
          />
          <HorizontalScrollPackagee
            imageSource={require("../../assets/carupto1000cc.jpg")}
            title="Premium Package"
            content="All 4*4, Jeeps & German cars"
            onPress={() => handleHorizontalPackagesItemPress(3)}
            buttonText="PKR 8,800"
            isSelected={selectedPackage === 3}
            onButtonClick={() => handlePackageButtonClick(3)}
            //here i want to put that component
          />
        </ScrollView>

        {/* <Text style={styles.sellWorkText}>Managed By AutoFinder</Text> */}

        <ManagedByAutoFinder />

        {/* <Text style={styles.sellWorkText}>AutoFinder Offerings</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          <HorizontalScrollItem
            imageSource={require("../../assets/Registration.png")}
            title="AutoFinder Car Inspections"
            content="200+ point inspections for peace of mind"
            onPress={() => handleHorizontalOfferingItemPress(1)}
          />
          <HorizontalScrollItem
            imageSource={require("../../assets/Registration.png")}
            title="Auction Sheet Verifications"
            content="AutoFinder guarantees confidence with verified Japanese car auction sheets"
            onPress={() => handleHorizontalOfferingItemPress(2)}
          />
          <HorizontalScrollItem
            imageSource={require("../../assets/Registration.png")}
            title="Maintain Your Car"
            content="Track your car's service history with SMS reminders"
            onPress={() => handleHorizontalOfferingItemPress(3)}
          />
          <HorizontalScrollItem
            imageSource={require("../../assets/Registration.png")}
            title="Car Finance"
            content="Explore and apply for car loans effortlessly"
            onPress={() => handleHorizontalOfferingItemPress(4)}
          />
          <HorizontalScrollItem
            imageSource={require("../../assets/Registration.png")}
            title="Car Insurance"
            content="Secure your ride with easy car insurance comparison and application"
            onPress={() => handleHorizontalOfferingItemPress(5)}
          />
        </ScrollView> */}

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

export default HomeCarInspection;
