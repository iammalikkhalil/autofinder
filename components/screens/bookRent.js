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
import Header from "../header"; // Corrected import with PascalCase
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons"; // Importing AntDesign icons
// import SearchBar from "../searchBar";
import BookRentCards from "../bookRentCards";
// import backArrow from "../../assets/back-arrow.png";
import axios from "axios";

const BookRent = () => {
  const navigation = useNavigation();
  const [filterOptions, setFilterOptions] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCardPress = (itemId) => {
    navigation.navigate("sellerRentDetail", { itemId: itemId });
  };

  const handleFilterPress = () => {
    // Implement your filter logic here
    navigation.navigate("rentFilter");
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carRentalAd/getAll",

          {}
        );
        setData(response.data.data);
        // console.log(response.data)
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data);
        setIsloading(false);
      }
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Book Now" onPressBack={handleBackPress} />

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
          {/* <SearchBar /> */}
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
              <BookRentCards
                key={item._id}
                carImage={item.images[0]}
                brand={item.Brand}
                model={item.Model}
                variant={item.Variant}
                price={item.price}
                year={item.Year}
                fuelType={item.engineType}
                driverAvailabilty={item.driverAvailability}
                location={item.city}
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

export default BookRent;

