import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SearchBar from "../searchBar";
import BuyNowCard from "../buyNowCards";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BuyNow = () => {
  const route = useRoute();
  const filter = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        let response;
        if (filter) {
          response = await axios.post(
            "https://autofinder-backend.vercel.app/api/carAd/filter",
            filter
          );
        } else {
          response = await axios.post(
            "https://autofinder-backend.vercel.app/api/carAd/",
            {
              limit: 10,
            }
          );
        }
        if (response.data.ok) {
          if (response.data.ok) {
            // const sortedData = response.data.data.sort(
            //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            // );
            // setData(sortedData);
            // --- New ---
            const sortedData = response.data.data.sort((a, b) => {
              if (a.ManagedByAutoFinder && !b.ManagedByAutoFinder) return -1;
              if (!a.ManagedByAutoFinder && b.ManagedByAutoFinder) return 1;
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            });

            setData(sortedData);
          } else {
            setNoDataError("No Data To Show");
          }
        } else {
          setNoDataError("No Data To Show");
        }
      } catch (error) {
        console.error(error);
        setNoDataError(error.response?.data?.error || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [filter]);

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true);
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/filter",
        filterData
      );
      console.log("Filter API response:", response.data);
      if (response.data.ok) {
        if (response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setNoDataError("No Data To Show");
        }
      } else {
        setNoDataError("No Data To Show");
      }
    } catch (error) {
      console.log("Error applying filter:", error);
      setNoDataError(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Sort Functions ---
  const [showStatus_Loading, setShowStatus_Loading] = useState(false);
  // 1
  const sortNewestToOldest = () => {
    const sortedData = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData([...sortedData]); // Spread the sorted data to trigger re-render
    // Modal Close
    setShowStatus_Loading(false);
  };
  // 2
  const sortOldestToNewest = () => {
    const sortedData = data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData([...sortedData]); // Spread the sorted data to trigger re-render
    // Modal Close
    setShowStatus_Loading(false);
  };
  // 3
  const sortHighestToLowestPrice = () => {
    const sortedData = data.sort((a, b) => b.price - a.price);
    setData([...sortedData]); // Spread the sorted data to trigger re-render
    // Modal Close
    setShowStatus_Loading(false);
  };
  // 4
  const sortLowestToHighestPrice = () => {
    const sortedData = data.sort((a, b) => a.price - b.price);
    setData([...sortedData]); // Spread the sorted data to trigger re-render
    // Modal Close
    setShowStatus_Loading(false);
  };
  // --- Sort Functions ---

  const handleFilterPress = () => {
    navigation.navigate("filterSearchCar", {
      onFilterApply: handleFilterApply,
    });
  };

  const handleCardPress = (itemId) => {
    navigation.navigate("sellerCarDetail", { itemId: itemId });
  };

  const handleRentABike = () => {
    navigation.navigate("homeFreeAds");
  };
  // Main Body
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#bd2a2a" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Buy Cars</Text>
        </View>
      </View>
      {/* Search Bar & Filter */}
      <View style={styles.rowContainer}>
        <View style={styles.SearchBar}>
          <SearchBar />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <AntDesign name="filter" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton_1}
          onPress={() => {
            setShowStatus_Loading(true);
          }}
        >
          <FontAwesome name="sort" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* --- Sort --- */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showStatus_Loading}
      >
        <View style={styles.ParentStatus}>
          <View style={styles.sub_ParentStatus}>
            <Text style={styles.Modal_Txt}>Sort</Text>
            {/* --- Btn Parent --- */}
            {/* Btn */}
            <TouchableOpacity
              style={styles.Modal_Btn}
              onPress={() => sortNewestToOldest()}
            >
              <Text style={styles.Modal_Btn_Txt}>
                Newest to Oldest ( Default )
              </Text>
            </TouchableOpacity>
            {/* Btn */}
            <TouchableOpacity
              style={styles.Modal_Btn}
              onPress={() => sortOldestToNewest()}
            >
              <Text style={styles.Modal_Btn_Txt}>Oldest to Newest</Text>
            </TouchableOpacity>
            {/* Btn */}
            <TouchableOpacity
              style={styles.Modal_Btn}
              onPress={() => sortHighestToLowestPrice()}
            >
              <Text style={styles.Modal_Btn_Txt}>
                Highest Price to Lowest Price
              </Text>
            </TouchableOpacity>
            {/* Btn */}
            <TouchableOpacity
              style={styles.Modal_Btn}
              onPress={() => sortLowestToHighestPrice()}
            >
              <Text style={styles.Modal_Btn_Txt}>
                Lowest Price to Highest Price
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* --- Sort --- */}
      {/* Main Body */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#cd0100" />
      ) : (
        <View style={styles.Container_Sub}>
          <ScrollView>
            {data && data.length > 0 ? (
              data.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleCardPress(item._id)}
                >
                  <BuyNowCard
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
              ))
            ) : (
              <Text>{noDataError}</Text>
            )}
          </ScrollView>
          {/* --- Post Ad Btn --- */}
          <View style={styles.button_Parent}>
            <TouchableOpacity style={styles.button} onPress={handleRentABike}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
          {/* --- Post Ad Btn --- */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#F3F3F3",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    tintColor: "white",
    marginLeft: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    // tintColor: "white",
  },
  titleContainer: {
    flex: 1,
    paddingBottom: 5,
  },
  title: {
    // color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    alignSelf: "center",
    letterSpacing: 1,
  },
  rowContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#DCDCDC",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 20,
    // marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  SearchBar: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    borderRadius: 5,
    marginRight: 0,
    paddingHorizontal: 10,
  },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#f39c12",
    paddingVertical: 10.5,
    paddingHorizontal: 7,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  filterButton_1: {
    flexDirection: "row",
    backgroundColor: "#Bc0000",
    paddingVertical: 10.5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  // filterText: {
  //   // color: "white",
  //   marginRight: 5,
  //   fontSize: 14,
  //   fontFamily: "Kanit",
  //   letterSpacing: 1,
  // },
  Container_Sub: {
    flex: 1,
  },
  button_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
    bottom: 15,
    right: 5,
  },
  button: {
    backgroundColor: "#bd2a2a",
    paddingVertical: 26,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 70,
    borderRadius: 50,
    alignSelf: "flex-end",
    shadowColor: "black",
    elevation: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Kanit",
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
  },
  imageContainer: {
    width: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bd2a2a",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  lowerView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
  },
  infoText_2: {
    fontSize: 12,
    paddingVertical: 10,
  },
  featuredTag: {
    backgroundColor: "#ff0",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  upperView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
  },
  ParentStatus: {
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    flex: 1,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sub_ParentStatus: {
    // borderWidth: 1,
    width: "81%",
    backgroundColor: "white",
    paddingVertical: 30,
    borderRadius: 10,
  },
  Modal_Txt: {
    textAlign: "center",
    borderWidth: 0,
    // borderColor: "transparent",
    fontFamily: "Heebo",
    letterSpacing: 2,
    fontSize: 25,
    marginBottom: 20,
  },
  Modal_Btn: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    marginHorizontal: 20,
    paddingVertical: 3,
    paddingHorizontal: 1,
    letterSpacing: 1,
    // color: "grey",
    fontFamily: "Kanit",
    marginBottom: 5,
  },
  Modal_Btn_Txt: {
    borderWidth: 0,
    borderColor: "transparent",
    paddingHorizontal: 13,
    paddingVertical: 5,
    letterSpacing: 1,
    // color: "grey",
    textAlign: "left",
    fontFamily: "Kanit",
  },
});

export default BuyNow;
