import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
// Fonts
import { useFonts } from "expo-font";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
// Img
import True_Img from "../../assets/featureTick.png";
import False_Img from "../../assets/False_Img.png";

export default function My_Package({ navigation }) {
  // User
  const { user } = useContext(UserContext);

  const handleBack = () => {
    navigation.goBack();
  };

  // --- API ---
  //Variables
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);

  // FUNCTIONS
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/buyPackageRequest/getAll"
        );
        const response_1 = await axios.post(
          "https://autofinder-backend.vercel.app/api/bikePackageRequest/getAll"
        );

        if (response.data.ok && response_1.data.ok) {
          // Filter car and bike package data where the user._id matches the logged-in user._id
          const filteredCarData = response.data.data.filter(
            (item) => item.user && item.user._id === user._id
          );
          const filteredBikeData = response_1.data.data.filter(
            (item) => item.user && item.user._id === user._id
          );

          setData(filteredCarData);
          setData_1(filteredBikeData);
        }
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
      }
    }
    // Only run fetchData if `user` is defined (i.e., user is logged in)
    if (user) {
      fetchData();
    }
  }, [user]);

  //COLUMNS
  const columns = [
    {
      name: "Status",
      selector: (row) =>
        row.package && row.approved !== undefined ? (
          <img
            src={row.approved ? True_Img : False_Img}
            alt="Approval Status"
            width="30"
          />
        ) : (
          " - "
        ),
      width: "15%",
    },
  ];
  // --- API ---

  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/My_Soul/Kanit-Black.ttf"),
  });
  // It Will Load Font
  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    }
  }, [loaded]);
  // It Tells If Font Is Loaded Or If Not Loaded Then Nothing Will Show,
  if (!fontsLoaded) {
    return null;
  }
  // --- Fonts Family ---
  // Main Body
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar backgroundColor={"#bd2a2a"} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Packages</Text>
        </View>
      </View>
      {/* Apply Scroll from This Portion */}
      {/* ------------------------------------ */}
      {/* --- Car Dealer Package --- */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* --- Car Dealer Package --- */}
            <Text style={styles.My_Heading}>Car Dealer Package Request</Text>
            {data.length === 0 ? (
              <Text style={styles.noDataMessage}>No Car Dealer Request</Text>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <View style={styles.itemContainer_AllBox}>
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Name :</Text>
                        <Text style={styles.itemText_1}>
                          {item.user && item.user.name ? item.user.name : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Price :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.actualPrice
                            ? item.package.actualPrice
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Premium Bundles :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.premiumBundles
                            ? item.package.premiumBundles
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Live Ad Days :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.liveAdDays
                            ? item.package.liveAdDays
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Free Booster Pack :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.freeBoosterPack
                            ? item.package.freeBoosterPack
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Status :</Text>
                        <Text style={styles.itemText_1_Status}>
                          {item.package && item.approved !== undefined ? (
                            <Image
                              source={item.approved ? True_Img : False_Img}
                              style={{ width: 17, height: 17 }}
                              resizeMode="contain"
                            />
                          ) : null}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </>
        }
        ListFooterComponent={
          <>
            {/* --- Bike Dealer Package --- */}
            <Text style={styles.My_Heading}>Bike Dealer Package Request</Text>
            {data_1.length === 0 ? (
              <Text style={styles.noDataMessage}>No Bike Dealer Request</Text>
            ) : (
              <FlatList
                data={data_1}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <View style={styles.itemContainer_AllBox}>
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Name :</Text>
                        <Text style={styles.itemText_1}>
                          {item.user && item.user.name ? item.user.name : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Price :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.actualPrice
                            ? item.package.actualPrice
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Premium Bundles :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.premiumBundles
                            ? item.package.premiumBundles
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Live Ad Days :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.liveAdDays
                            ? item.package.liveAdDays
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Free Booster Pack :</Text>
                        <Text style={styles.itemText_1}>
                          {item.package && item.package.freeBoosterPack
                            ? item.package.freeBoosterPack
                            : " - "}
                        </Text>
                      </View>
                      {/* Box */}
                      <View style={styles.Item_Subbox}>
                        <Text style={styles.itemText}>Status :</Text>
                        <Text style={styles.itemText_1_Status}>
                          {item.package && item.approved !== undefined ? (
                            <Image
                              source={item.approved ? True_Img : False_Img}
                              style={{ width: 17, height: 17 }}
                              resizeMode="contain"
                            />
                          ) : null}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </>
        }
      />
    </View>
  );
}

// CSS
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
    paddingBottom: 5,
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
    fontFamily: "Kanit",
    alignSelf: "center",
    letterSpacing: 1,
    paddingVertical: 8,
  },
  itemContainer: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  itemContainer_AllBox: {
    borderRadius: 0,
    borderColor: "transparent",
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginHorizontal: 21,
    marginBottom: 10,
    backgroundColor: "#FFE7E7",
    borderRadius: 10,
  },
  Item_Subbox: {
    borderRadius: 0,
    borderColor: "transparent",
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 3,
  },
  itemText: {
    borderRadius: 0,
    borderColor: "transparent",
    fontFamily: "Kanit",
    letterSpacing: 1,
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 15,
    width: "55%",
  },
  itemText_1: {
    borderRadius: 0,
    borderColor: "transparent",
    fontFamily: "Kanit",
    letterSpacing: 1,
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 15,
    width: "45%",
    textAlign: "center",
    color: "#bc0000",
  },
  itemText_1_Status: {
    borderRadius: 0,
    borderColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: "45%",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  noDataMessage: {
    textAlign: "center",
    fontFamily: "Kanit",
    backgroundColor: "#bc0000",
    marginHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 50,
    color: "white",
    letterSpacing: 1,
    marginVertical: 30,
  },
  My_Heading: {
    fontFamily: "Heebo",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 30,
    letterSpacing: 1.2,
  },
});
