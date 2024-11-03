import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MyCarAdsCards from "../myCarAdsCards";
import axios from "axios";
import { UserContext } from "../../context/userContext";

export default function PendingAds() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAdRequest",
          { user: user._id }
        );
        // console.log(response.data.data)
        setData(response.data.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    fetchData();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {data.length > 0 &&
          data.map((item) => (
            <MyCarAdsCards
              carImage={item.images[0]}
              name={item.brand}
              model={item.model}
              variant={item.varient}
              price={item.price}
              year={item.year}
              fuelType={item.fuelType}
              kmReading={item.kmDriven}
              location={item.location}
              isInspected={item.isInspected} // Set to true or false based on whether it is inspected
              isFeatured={item.featured} // Set to true or false based on whether it is featured
              isManagedByAutoFinder={item.isManagedByAutoFinder} // Set to true or false based on whether it is managed by AutoFinder
              pendingCard={true}
            />
          ))}
      </View>
    </ScrollView>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 3,
    paddingTop: 0,
  },
});
