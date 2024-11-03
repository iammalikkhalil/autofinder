/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
// MainStack.js

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SellNowPopup from "./screens/sellNowPopup";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./screens/profile";
import Welcome from "./screens/welcome";
import EmailSignin from "./screens/emailSignin";
import GoogleSignin from "./screens/googleSignin";
import SignUp from "./screens/signUp";
// import More from "./more";
// import MyGarage from './myGarage';
import homeCarInspection from "./screens/homeCarInspection";
import home from "./screens/home";
import homeBuyCarForMe from "./screens/homeBuyCarForMe";
import BasicInfoCarInspection from "./screens/basicInfoCarInspection";
import BookExpertVisitCarInspection from "./screens/bookExpertVisitCarInspection";
import CheckoutCarInspection from "./screens/checkoutCarInspection";
// import ManagedByAutoFinder from './components/ManagedByAutoFinder';
import sellNowChoosePlan from "./screens/sellNowChoosePlan";
// import HomeSellItForMe from './homeSellItForMe';
import HomeFreeAds from "./screens/homeFreeAds";
import FreeAdsPostService from "./screens/freeAdsPostService";
import HomeListItForYou from "./screens/homeListItForYou";
import SellerCarDetail from "./screens/sellerCarDetail";
import MyAds from "./screens/myAds";
import ActiveAds from "./screens/activeAds";
import PendingAds from "./screens/pendingAds";
import Packages from "./screens/packages";
import SellerProfile from "./screens/sellerProfile";
import HomePremiumAds from "./screens/homePremiumAds";
import HomeRentACar from "./screens/homeRentACar";
import RentPostService from "./screens/rentPostService";
import FilterSearch from "./screens/filterSearch";
import PremiumAdsPostService from "./screens/premiumAdsPostService";
import BasicInfoBuyCarForMe from "./screens/basicInfoBuyCarForMe";
import BasicInfoListItForYou from "./screens/basicInfoListItForYou";
import FilterSearchCar from "./screens/filterSearchCar";
import TransactionApproval from "./screens/transactionApproval";
import BuyNow from "./screens/buyNow";
import BookRent from "./screens/bookRent";
import Testing from "./screens/testing";
import SellerRentDetail from "./screens/sellerRentDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import MoreOption from "./screens/moreOption";
import axios from "axios";
import DealerPackage from "./screens/dealerPackage";
import DealerPackage_Bike from "./screens/dealerPackage_Bike";
import RentFilter from "./screens/rentFilter";
import Blog_Page from "./screens/Blog_Page";
import Blog_Page_Detail from "./screens/Blog_Page_Detail";
import Video_Page from "./screens/Video_Page";
import Rent_Bike from "./screens/Rent_Bike";
import Rent_Bike_Post from "./screens/Rent_Bike_Post";
import Rent_Bike_Details from "./screens/Rent_Bike_Details";
import Auto_Parts from "./screens/Auto_Parts";
import Auto_Parts_Details from "./screens/Auto_Parts_Details";
import Auto_Parts_Post from "./screens/Auto_Parts_Post";
import New_Cars from "./screens/New_Cars";
import New_Cars_Details from "./screens/New_Cars_Details";
import New_Cars_Detail_S from "./screens/New_Cars_Detail_S";
import New_Cars_Detail_F from "./screens/New_Cars_Detail_F";
import My_Favorite from "./screens/My_Favorite";
import featureAd_Detail from "./featureAd_Detail";
import Filter_AutoParts from "./screens/Filter_AutoParts";
import CategoriesScreen from "./CategoriesScreen";
import Filter_RentBike from "./screens/Filter_RentBike";
import checkoutCarInspection_Bike from "./screens/checkoutCarInspection_Bike";
import transactionApproval_Bike from "./screens/transactionApproval_Bike";
import New_Cars_Find from "./screens/New_Cars_Find";
import New_Cars_Details_Single from "./screens/New_Cars_Details_Single";
import New_Cars_Detail_S_Single from "./screens/New_Cars_Detail_S_Single";
import New_Cars_Detail_F_Single from "./screens/New_Cars_Detail_F_Single";
import BasicinfoCarIns_2 from "./screens/basicinfoCarIns_2";
import My_CarInspect from "./screens/My_CarInspect";
import My_Package from "./screens/My_Package";
import PremiumAdsPostService_Listit from "./screens/premiumAdsPostService_Listit";
import FreeAdsPostService_List from "./screens/freeAdsPostService_List";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, dispatch } = useContext(UserContext);

  const rehydrateUser = async () => {
    try {
      const response = await axios.get(
        "https://autofinder-backend.vercel.app/api/user/rehydrateUser"
      );
      console.log("rehydratedUser", response.data);
      dispatch({ type: "LOGIN", payload: response.data.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const checkTokenAndRehydrate = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          rehydrateUser();
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    checkTokenAndRehydrate();
  }, [user]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={home} />
      <Stack.Screen
        name="SellNowPopup"
        component={SellNowPopup}
        options={{
          cardStyle: { backgroundColor: "transparent" },
          animationEnabled: false,
        }}
      />
      <Stack.Screen name="homeCarInspection" component={homeCarInspection} />
      {/* <Stack.Screen name="more" component={More} /> */}
      <Stack.Screen name="profile" component={Profile} />
      {/* --- New --- */}
      <Stack.Screen name="My_CarInspect" component={My_CarInspect} />
      {/* --- New --- */}
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="emailSignin" component={EmailSignin} />
      <Stack.Screen name="googleSignin" component={GoogleSignin} />
      <Stack.Screen name="signUp" component={SignUp} />
      {/* <Stack.Screen name="MyGarage" component={MyGarage} /> */}
      <Stack.Screen name="homeBuyCarForMe" component={homeBuyCarForMe} />
      <Stack.Screen
        name="basicInfoCarInspection"
        component={BasicInfoCarInspection}
      />
      {/* --- New Car Inspection Page --- */}
      <Stack.Screen name="BasicinfoCarIns_2" component={BasicinfoCarIns_2} />
      {/* --- New Car Inspection Page --- */}
      <Stack.Screen
        name="bookExpertVisitCarInspection"
        component={BookExpertVisitCarInspection}
      />
      <Stack.Screen
        name="checkoutCarInspection"
        component={CheckoutCarInspection}
      />
      {/* --- Bike Checkout --- */}
      <Stack.Screen
        name="checkoutCarInspection_Bike"
        component={checkoutCarInspection_Bike}
      />
      {/* --- Bike Checkout --- */}
      {/* <Stack.Screen name="ManagedByAutoFinder" component={ManagedByAutoFinder} /> */}
      <Stack.Screen name="sellNowChoosePlan" component={sellNowChoosePlan} />
      {/* <Stack.Screen name="homeSellItForMe" component={HomeSellItForMe} /> */}
      <Stack.Screen name="homeFreeAds" component={HomeFreeAds} />
      <Stack.Screen name="freeAdsPostService" component={FreeAdsPostService} />
      <Stack.Screen
        name="FreeAdsPostService_List"
        component={FreeAdsPostService_List}
      />
      <Stack.Screen
        name="premiumAdsPostService"
        component={PremiumAdsPostService}
      />
      <Stack.Screen
        name="PremiumAdsPostService_Listit"
        component={PremiumAdsPostService_Listit}
      />
      <Stack.Screen name="homeListItForYou" component={HomeListItForYou} />
      <Stack.Screen name="myAds" component={MyAds} />
      <Stack.Screen name="My_Package" component={My_Package} />
      <Stack.Screen name="actsiveAds" component={ActiveAds} />
      {/* <Stack.Screen
        name="activeAds"
        component={(props) => <ActiveAds {...props} />}
      /> */}
      <Stack.Screen name="pendingAds" component={PendingAds} />
      <Stack.Screen name="packages" component={Packages} />
      <Stack.Screen name="sellerCarDetail" component={SellerCarDetail} />
      <Stack.Screen name="sellerProfile" component={SellerProfile} />
      <Stack.Screen name="homePremiumAds" component={HomePremiumAds} />
      <Stack.Screen name="homeRentACar" component={HomeRentACar} />
      <Stack.Screen name="rentPostService" component={RentPostService} />
      <Stack.Screen name="filterSearch" component={FilterSearch} />
      <Stack.Screen name="filterSearchCar" component={FilterSearchCar} />
      {/* --- My New Filters --- */}
      <Stack.Screen name="filter_AutoParts" component={Filter_AutoParts} />
      <Stack.Screen name="filter_RentBike" component={Filter_RentBike} />
      {/* --- My New Filters --- */}
      {/* --- Category Select --- */}
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      {/* --- Category Select --- */}
      <Stack.Screen name="moreOption" component={MoreOption} />
      <Stack.Screen
        name="transactionApproval"
        component={TransactionApproval}
      />
      {/* --- Bike Transaction --- */}
      <Stack.Screen
        name="transactionApproval_Bike"
        component={transactionApproval_Bike}
      />
      {/* --- Bike Transaction --- */}
      <Stack.Screen
        name="basicInfoBuyCarForMe"
        component={BasicInfoBuyCarForMe}
      />
      <Stack.Screen
        name="basicInfoListItForYou"
        component={BasicInfoListItForYou}
      />
      <Stack.Screen name="buyNow" component={BuyNow} />
      <Stack.Screen name="bookRent" component={BookRent} />
      <Stack.Screen name="sellerRentDetail" component={SellerRentDetail} />
      <Stack.Screen name="testing" component={Testing} />
      <Stack.Screen name="DealerPackage" component={DealerPackage} />
      {/* --- Bike Package --- */}
      <Stack.Screen name="DealerPackage_Bike" component={DealerPackage_Bike} />
      {/* --- Bike Package --- */}
      <Stack.Screen name="rentFilter" component={RentFilter} />
      {/* Blog */}
      <Stack.Screen name="Blog_Page" component={Blog_Page} />
      <Stack.Screen name="Blog_Page_Detail" component={Blog_Page_Detail} />
      {/* Video */}
      <Stack.Screen name="Video_Page" component={Video_Page} />
      {/* Rent Bike */}
      <Stack.Screen name="Rent_Bike" component={Rent_Bike} />
      <Stack.Screen name="Rent_Bike_Post" component={Rent_Bike_Post} />
      <Stack.Screen name="Rent_Bike_Details" component={Rent_Bike_Details} />
      {/* Auto Parts */}
      <Stack.Screen name="Auto_Parts" component={Auto_Parts} />
      <Stack.Screen name="Auto_Parts_Details" component={Auto_Parts_Details} />
      <Stack.Screen name="Auto_Parts_Post" component={Auto_Parts_Post} />
      {/* New Cars */}
      <Stack.Screen name="New_Cars" component={New_Cars} />
      <Stack.Screen name="New_Cars_Details" component={New_Cars_Details} />
      <Stack.Screen
        name="New_Cars_Details_Single"
        component={New_Cars_Details_Single}
      />
      <Stack.Screen name="New_Cars_Detail_S" component={New_Cars_Detail_S} />
      <Stack.Screen
        name="New_Cars_Detail_S_Single"
        component={New_Cars_Detail_S_Single}
      />
      <Stack.Screen name="New_Cars_Detail_F" component={New_Cars_Detail_F} />
      <Stack.Screen
        name="New_Cars_Detail_F_Single"
        component={New_Cars_Detail_F_Single}
      />
      <Stack.Screen name="New_Cars_Find" component={New_Cars_Find} />
      {/* My Favorite ( My Ads ) */}
      <Stack.Screen name="My_Favorite" component={My_Favorite} />
      {/* Featured Ad List Only */}
      <Stack.Screen name="featureAd_Detail" component={featureAd_Detail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
