import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Header from "./header"; // Corrected import with PascalCase
import { useNavigation, useRoute } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons"; // Importing AntDesign icons
import SearchBar from "./searchBar";
import BuyNowCard from "./buyNowCards";
// import backArrow from "../../assets/back-arrow.png";
import axios from "axios";

const FeatureAd_Detail = () => {
  const route = useRoute();
  const filter = route.params;
  const navigation = useNavigation();
  const [filterOptions, setFilterOptions] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCardPress = (itemId) => {
    navigation.navigate("sellerCarDetail", { itemId: itemId });
  };

  const handleFilterPress = () => {
    // Implement your filter logic here
    navigation.navigate("filterSearchCar");
  };

  useEffect(() => {
    async function getData() {
      if (filter === undefined) {
        try {
          const response = await axios.post(
            "https://autofinder-backend.vercel.app/api/carAd/",
            { featured: true }
          );
          setData(response.data.data);
          // console.log(response.data)
          setIsloading(false);
        } catch (error) {
          console.log(error.response.data);
          setIsloading(false);
        }
      } else {
        try {
          console.log(filter);
          const response = await axios.post(
            "https://autofinder-backend.vercel.app/api/carAd/filter",
            filter
          );
          setData(response.data.data);
          // console.log(response.data)
          setIsloading(false);
        } catch (error) {
          console.log(error.response.data);
          setIsloading(false);
        }
      }
    }
    getData();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header title="Featured Ads" onPressBack={handleBackPress} />

      {/* <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={backArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Free Ads Service</Text>
        </View>
      </View> */}

      <View style={styles.rowContainer}>
        {/* Search bar */}
        <View style={styles.SearchBar}>
          {/* Your search bar component goes here */}
          <SearchBar />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Text style={styles.filterText}>Filter</Text>
          <AntDesign name="filter" size={22} color="#fc6f03" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {isLoading && (
          <View style={[styless.container, styless.horizontal]}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        )}

        {!isLoading && data.length === 0 && <Text>No Cars To show</Text>}

        {!isLoading &&
          data.length > 0 &&
          data.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleCardPress(item._id)}
            >
              <BuyNowCard
                key={item._id}
                carImage={item.images[0]}
                name={item.brand}
                model={item.model}
                variant={item.varient}
                price={item.price}
                year={item.year}
                fuelType={item.fuelType}
                kmReading={item.kmDriven}
                location={item.location}
                isInspected={item.inspected}
                isFeatured={item.featured}
                isManagedByAutoFinder={item.ManagedByAutoFinder}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};


const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  SearchBar: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#2e8b57",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    marginRight: 5,
  },
});

export default FeatureAd_Detail;
