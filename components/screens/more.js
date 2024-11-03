/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileScreen from "./profile";
import MyGarage from "./myGarage";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const More = ({ navigation }) => {
  const { user, dispatch } = useContext(UserContext);
  //const navigation = useNavigation();
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);

  const togglePersonalDropdown = () => {
    setShowPersonalDropdown(!showPersonalDropdown);
  };
  const toggleProductDropdown = () => {
    setShowProductDropdown(!showProductDropdown);
  };
  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
  };
  const toggleExploreDropdown = () => {
    setShowExploreDropdown(!showExploreDropdown);
  };

  const handlerViewProfile = () => {
    //  navigation.navigate('ProfileScreen');
    navigation.navigate("profile");
  };

  // const handleMyGarage = () => {
  //   console.log('MyGarage');
  //   //navigation.navigate("MyGarage");
  //   navigation.navigate('MyGarage');
  // };

  // const handleMyCart = () => {
  //   console.log('Navigate to My Cart');
  // };

  const handleSavedAs = () => {
    console.log("Navigate to Saved As");
  };
  const handleMyorders = () => {
    console.log("Navigate to My Orders");
  };

  const handleNotification = () => {
    console.log("Navigate to Notifications");
  };

  const handleLanguage = () => {
    console.log("Navigate to Languages");
  };
  const handleUsedCars = () => {
    console.log("filterSearchCar");
    navigation.navigate("filterSearchCar");
  };

  const handleNewCars = () => {
    console.log("filterSearchCar");
    navigation.navigate("filterSearchCar");
  };

  const handleBikes = () => {
    console.log("Navigate to Saved As");
  };
  const handleAutoParts = () => {
    console.log("Navigate to Saved As");
  };
  //
  const handleSellItForMe = () => {
    console.log("Navigate to My Garage");
  };

  const handleCarRegistration = () => {
    console.log("Navigate to My Cart");
  };

  const handleCarInspection = () => {
    console.log("Navigate to Saved As");
  };
  const handleCarFinance = () => {
    console.log("Navigate to Saved As");
  };
  const handleCarInsurance = () => {
    console.log("Navigate to Saved As");
  };
  const handlePartnerWorkshop = () => {
    console.log("Navigate to Saved As");
  };
  const handleContactUs = () => {
    console.log("Navigate to Saved As");
  };
  const handlerLogin = () => {
    console.log("login Pressed");
    dispatch({ type: "LOGIN", payload: userData });
  };

  const handlerLogout = async () => {
    console.log("logout pressed");
    dispatch({ type: "LOGOUT" });
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.usernameText}>Username</Text>
      <View>
        <View style={styles.loginlogoutView}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handlerViewProfile}
          >
            <Text style={styles.profileButtonText}>View Profile</Text>
            <Image
              source={require("../../assets/right-arrow.png")}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Personal  dropdown*/}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={togglePersonalDropdown}
        >
          <Text style={styles.dropdownText}>Personal</Text>
          <Image
            source={
              showPersonalDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showPersonalDropdown && (
          <View style={styles.dropdownContent}>
            {/* <TouchableOpacity style={styles.subOption} onPress={handleMyGarage}>
            <Image
              source={require('../../assets/garage.png')}
              style={styles.subOptionIcon}
              resizeMode="contain"
            />
            <Text style={styles.subOptionText}>My Garage</Text>
          </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.subOption} onPress={handleMyCart}>
            <Image
              source={require('../../assets/cart.png')}
              style={styles.subOptionIcon}
              resizeMode="contain"
            />
            <Text style={styles.subOptionText}>My Cart</Text>
          </TouchableOpacity> */}
            <TouchableOpacity style={styles.subOption} onPress={handleMyorders}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleSavedAs}>
              <Image
                source={require("../../assets/love.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Saved ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleNotification}
            >
              <Image
                source={require("../../assets/notification.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleLanguage}>
              <Image
                source={require("../../assets/language.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Choose Language</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Product Dropdown */}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={toggleProductDropdown}
        >
          <Text style={styles.dropdownText}>Product</Text>
          <Image
            source={
              showProductDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showProductDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity style={styles.subOption} onPress={handleUsedCars}>
              <Image
                source={require("../../assets/garage.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Used Cars</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleNewCars}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>New Cars</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleBikes}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Bikes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleAutoParts}
            >
              <Image
                source={require("../../assets/love.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Auto Parts & Accessories</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Services Dropdown */}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={toggleServicesDropdown}
        >
          <Text style={styles.dropdownText}>Services</Text>
          <Image
            source={
              showServicesDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showServicesDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleCarRegistration}
            >
              <Image
                source={require("../../assets/Registration.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Car registration</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleCarInsurance}
            >
              <Image
                source={require("../../assets/insurance.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Car Insurance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handlePartnerWorkshop}
            >
              <Image
                source={require("../../assets/tools.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Partner workshop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleSellItForMe}
            >
              <Image
                source={require("../../assets/cash.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Sell It For Me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleCarInspection}
            >
              <Image
                source={require("../../assets/inspections.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Car Inspection</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleCarFinance}
            >
              <Image
                source={require("../../assets/cash.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Car Finance</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Explore Dropdown */}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={toggleExploreDropdown}
        >
          <Text style={styles.dropdownText}>More</Text>
          <Image
            source={
              showExploreDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showExploreDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity style={styles.subOption} onPress={handleUsedCars}>
              <Image
                source={require("../../assets/garage.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleNewCars}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleBikes}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Cool Rides</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.centeredTextContainer}>
          <TouchableOpacity
            onPress={handleContactUs} // Add your event handler here
          >
            <Text style={styles.needHelpText}>
              Need help? <Text style={styles.contactUsText}>Contact us</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.additionalText}>11.11.86</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingHorizontal: 20,
    backgroundColor: "#bd2a2a",
  },
  usernameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: 10,
    color: "white",
  },
  loginlogoutView: {
    flexDirection: "row",
  },
  logout: {
    marginLeft: 150,
  },
  login: {},
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 10,
  },
  profileButtonText: {
    fontSize: 16,
    color: "white",
  },
  arrowIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
    tintColor: "white",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
    verticalAlign: "middle",
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    tintColor: "grey",
  },
  dropdownContent: {
    backgroundColor: "whitesmoke", //(#f5f5f5)
    marginTop: 10,
    paddingVertical: 10,
  },
  subOption: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    paddingVertical: 5,
  },
  subOptionText: {
    fontSize: 16,
    color: "black",
    marginRight: 30,
  },
  subOptionIcon: {
    width: 15,
    height: 15,
    tintColor: "grey",
    marginRight: 10,
  },
  centeredTextContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  needHelpText: {
    fontSize: 14,
    color: "dimgray",
    marginTop: 70,
    textAlign: "center",
  },
  contactUsText: {
    color: "darkred",
    textDecorationLine: "underline",
  },
  additionalText: {
    fontSize: 14,
    color: "lightslategrey",
    marginTop: 10,
    textAlign: "center",
  },
});

export default More;
