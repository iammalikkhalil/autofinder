import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ActiveAds from "./activeAds";
import PendingAds from "./pendingAds";
import Packages from "./packages";
import Header from "../header";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const MyAds = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <Header title="My Ads" onPressBack={handleBackPress} />
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Active Ads" component={ActiveAds} />
          <Tab.Screen name="Pending Ads" component={PendingAds} />
          <Tab.Screen name="packages" component={Packages} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MyAds;
