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

const DealerPackage = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("ran");
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/DealerPackage/getAll"
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
        navigation.navigate("checkoutCarInspection", {
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

  const handleBikeDealer = () => {
    navigation.navigate("DealerPackage_Bike");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Header title="Car Dealer Packages" onPressBack={handleBackPress} />
      {/* --- Bike Package --- */}
      <View style={styles.Bike_Package_Parent}>
        <TouchableOpacity
          style={styles.Bike_Package_Btn}
          onPress={handleBikeDealer}
        >
          <Text style={styles.Bike_Package_Btn_Txt}>Bike Packeges</Text>
          <Text style={styles.Bike_Package_Btn_Txt_1}>
            <MaterialCommunityIcons name="motorbike" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      {/* --- Bike Package --- */}
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
    padding: 20,
    backgroundColor: "#fff",
  },
  Bike_Package_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingHorizontal: 50,
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: "white",
  },
  Bike_Package_Btn: {
    borderWidth: 0.5,
    borderColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "center",
  },
  Bike_Package_Btn_Txt: {
    borderWidth: 0.5,
    borderColor: "orange",
    paddingVertical: 5,
    paddingHorizontal: 8,
    textAlign: "center",
    letterSpacing: 1.5,
    borderRadius: 10,
    // color: "white"
  },
  Bike_Package_Btn_Txt_1: {
    borderWidth: 0.5,
    borderColor: "orange",
    paddingBottom: 1,
    paddingHorizontal: 1,
    textAlign: "center",
    letterSpacing: 1.5,
    borderRadius: 10,
    // color: "white"
  },
  Bike_Package_Btn_Icon: {
    borderWidth: 0.5,
    borderColor: "black",
  },
});

export default DealerPackage;
