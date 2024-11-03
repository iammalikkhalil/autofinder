import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import DealerCard from "../dealerCard";
import { useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../header";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const DealerPackage_Bike = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("ran");
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/dealerPackage/getAllbike"
        );
        if (response.data.ok) {
          console.log(response.data.data);
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error.response.data.ok);
      }
    }
    fetchData();
  }, []);

  const borderColors = [
    "#fc6f03",
    "#00FF00",
    "#1e81b0",
    "#FF0000",
    "#d1ba9e",
    "#FF00FF",
  ];

  const handleSelectPackage = async (packageData) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("checkoutCarInspection_Bike", {
          package: packageData._id,
          price: packageData.discountedRate,
          user: user._id,
          service: "004",
        });
      } else {
        navigation.navigate("welcome");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Header title="Bike Dealer Packages" onPressBack={handleBackPress} />
      <View style={styles.container}>
        {data.map((item) => (
          <DealerCard
            key={item._id}
            packageInfo={item}
            onPress={handleSelectPackage}
            borderColor={borderColors[0]}
          />
        ))}

        {/* Add more DealerCard components here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export default DealerPackage_Bike;
