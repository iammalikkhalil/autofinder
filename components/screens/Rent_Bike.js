import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  StyleSheet,
  StatusBar,
  Linking,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { AntDesign } from "@expo/vector-icons"; // Importing AntDesign icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SearchBar from "../searchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonts
import { useFonts } from "expo-font";
// Fonts Icon
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// Call
import call from "react-native-phone-call";
import { UserContext } from "../../context/userContext";

const Rent_Bike = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/bike/",
          {
            limit: 10,
          }
        );
        if (response.data.ok) {
          const sortedData = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setData(sortedData);
        } else {
          setNoDataError("No Data To Show");
        }
      } catch (error) {
        console.log("Error fetching initial data:", error);
        setNoDataError(error.response?.data?.error || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true);
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/bike/filter",
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

  const handleFilterPress = () => {
    navigation.navigate("filter_RentBike", {
      onFilterApply: handleFilterApply,
    });
  };

  const handleRentABike = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Rent_Bike_Post");
      } else {
        navigation.navigate("welcome");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };

  // --- Favorite Ads ---
  const [isFavorite, setIsFavorite] = useState(false);
  const My_Fav_handlePress = async (item) => {
    try {
      if (item && item._id && user && user._id) {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/addFavorite",
          { userId: user._id, adId: item._id, adType: "Bike" }
        );
        // alert(" Added To Favorites ");
        setIsFavorite(!isFavorite);
        console.log(response);
        console.log(" Added To Favorite ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // --- Favorite Ads ---

  // --- Call Logic ---
  const { user } = useContext(UserContext);

  const handleCallPress = (mydata) => {
    console.log("Call Seller pressed");
    const args = {
      number: mydata, // Ensure this is the correct path to the phone number
      prompt: false,
      skipCanOpen: true,
    };
    call(args).catch(console.error);
  };

  const handleWhatsappPress = (mydata) => {
    console.log("Whatsapp pressed");
    const phoneNumber = mydata; // Ensure this is the correct path to the phone number
    const adDetails = ``;
    const whatsappMessage = `whatsapp://send?text=${encodeURIComponent(
      adDetails
    )}&phone=${phoneNumber}`;
    Linking.openURL(whatsappMessage)
      .then(() => console.log("WhatsApp opened successfully"))
      .catch((error) => console.log("Error opening WhatsApp : ", error));
  };
  // --- Call Logic ---

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
      <StatusBar backgroundColor="#bd2a2a" />
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
          <Text style={styles.title}>Rent Bike</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.SearchBar}>
          {/* Your search bar component goes here */}
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
      {/* --- Main Body --- */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#cd0100" />
      ) : (
        <View style={styles.Container_Sub}>
          <ScrollView>
            {data && data.length > 0 ? (
              data.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    navigation.navigate("Rent_Bike_Details", { item })
                  }
                >
                  <View style={styles.cardParent}>
                    <View style={[styles.card]}>
                      <View style={styles.imageContainer}>
                        {item.images.length > 0 && (
                          <Image
                            source={{ uri: item.images[0] }}
                            style={styles.image}
                          />
                        )}
                        {/* ----- Add To Favorite ----- */}
                        <View style={styles.buttonContainer_Fav}>
                          <TouchableOpacity
                            style={styles.button_Fav}
                            onPress={() => My_Fav_handlePress(item)}
                          >
                            <Image
                              source={
                                isFavorite
                                  ? require("../../assets/My_Fav_Red.png")
                                  : require("../../assets/My_Fav_White.png")
                              }
                              style={styles.buttonIcon_Fav}
                            />
                          </TouchableOpacity>
                          {/* ----- Add To Favorite ----- */}
                        </View>
                      </View>
                      <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.model}</Text>
                        <Text style={styles.variant}>{item.brand}</Text>
                        <Text style={styles.price}>PKR {item.price}</Text>
                        {/* Below View Parent */}
                        <View style={styles.parentView}>
                          {/* Upper view */}
                          <View style={styles.upperView}>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/modelYear.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>{item.year}</Text>
                            </View>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/carMeter.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>
                                {item.KmDriven}
                              </Text>
                            </View>
                          </View>

                          {/* Lower view */}
                          <View style={styles.lowerView}>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/fuelIcon.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>
                                {item.fuelType}
                              </Text>
                            </View>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/locationIcon.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>
                                {item.location}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {/* --- Call --- */}
                        <View style={styles.parentBtnPress_Head}>
                          {/* Button */}
                          <TouchableOpacity
                            style={[
                              styles.parentBtnPress,
                              { backgroundColor: "#FFE1E1" },
                            ]}
                            onPress={() => {
                              handleCallPress(item.user.phoneNumber);
                            }}
                          >
                            <Text style={styles.parentBtnPress_Txt_1}>
                              Sim Call
                            </Text>
                            <Text style={styles.parentBtnPress_Txt_2}>
                              <MaterialCommunityIcons
                                name="phone-forward"
                                size={22}
                                color="#Bc0000"
                              />
                            </Text>
                          </TouchableOpacity>
                          {/* Button */}
                          <TouchableOpacity
                            style={[
                              styles.parentBtnPress,
                              { backgroundColor: "#E6FFDF" },
                            ]}
                            onPress={() => {
                              handleWhatsappPress(item.user.phoneNumber);
                            }}
                          >
                            <Text style={styles.parentBtnPress_Txt_1}>
                              Whatsapp
                            </Text>
                            <Text style={styles.parentBtnPress_Txt_2}>
                              <MaterialCommunityIcons
                                name="whatsapp"
                                size={22}
                                color="green"
                              />
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {/* --- Call --- */}
                        <Text style={styles.infoText_2}>
                          Posted :{" "}
                          {formatDistanceToNow(new Date(item.createdAt))} ago
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>{noDataError}</Text>
            )}
          </ScrollView>
        </View>
      )}
      {/* --- Post Ad Btn --- */}
      <View style={styles.button_Parent}>
        <TouchableOpacity style={styles.button} onPress={handleRentABike}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      {/* --- Post Ad Btn --- */}
    </View>
  );
};

// CSS
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
  // New
  cardParent: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingBottom: 3,
    paddingHorizontal: 0,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: "100%",
    marginRight: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: "hidden", // Hides any content overflowing out of the container
  },
  buttonContainer_Fav: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 3,
    right: 0,
    padding: 0,
  },
  button_Fav: {
    borderRadius: 30,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: 1,
  },
  buttonIcon_Fav: {
    width: 30,
    height: 30,
    // tintColor: "white",
  },
  featuredIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    paddingTop: 0,
    paddingBottom: 5,
    color: "#bd2a2a",
    letterSpacing: 1,
  },
  variant: {
    textTransform: "capitalize",
    fontFamily: "Kanit",
    fontSize: 13,
    marginBottom: 5,
    color: "grey",
    letterSpacing: 1,
  },
  price: {
    fontSize: 13.5,
    fontFamily: "Heebo",
    color: "#4A4A4A",
    paddingBottom: 5,
    letterSpacing: 1,
  },
  parentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  upperView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lowerView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 3,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Kanit",
    letterSpacing: 1,
    paddingLeft: 9,
  },
  infoText_2: {
    color: "grey",
    fontSize: 13,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
    paddingLeft: 9,
    textAlign: "right",
    paddingRight: 5,
  },
  parentBtnPress_Head: {
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderTopColor: "#DCDCDC",
    // borderColor: "transparent",
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  parentBtnPress: {
    borderWidth: 0,
    borderColor: "transparent",
    borderColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 7,
    borderRadius: 5,
    width: "47%",
    flexDirection: "row",
    justifyContent: "center",
  },
  parentBtnPress_Txt_1: {
    borderWidth: 0,
    borderColor: "transparent",
    textAlign: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
    color: "grey",
    width: "75%",
    paddingTop: 0,
    fontSize: 15,
  },
  parentBtnPress_Txt_2: {
    borderWidth: 0,
    borderColor: "transparent",
    textAlign: "center",
    width: "25%",
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

export default Rent_Bike;
