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
} from "react-native";
// Fonts
import { useFonts } from "expo-font";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function My_Favorite({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const handleBack = () => {
    navigation.goBack();
  };
   const handleNavigateToSingleCarAd = (itemId) => {
    // navigate(`/used-car/detail/${itemId}`);
    console.log(" Clicked Item ID : ", itemId);
  };
  // --- Favorite API ---
  const { user } = useContext(UserContext);
  const [noDataError, setNoDataError] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/favoriteAds",
          { userId: user._id }
        );
        if (response.data.ok) {
          // Updated logic to sort the data by createdAt date before setting it
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
  // --- Favorite API ---
  // --- Delete All Saved Ads ---
  const handleDeleteFavorite = async () => {
    try {
      if (user && user._id) {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/deleteFavorite",
          { userId: user._id }
        );
        // alert(" All Favorite Ads Are Deleted ");
        console.log(response);
        console.log(" All Saved Ads Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // --- Delete All Saved Ads ---
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
          <Text style={styles.title}>My Favorite Ads</Text>
        </View>
      </View>
      {/* --- Delete Favorite Ads Btn --- */}
      <View style={styles.My_Del_Btn_Head}>
        <TouchableOpacity
          style={styles.My_Del_Btn}
          onPress={handleDeleteFavorite}
        >
          <Text style={styles.My_Del_Btn_Txt}>
            <MaterialIcons name="delete" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      {/* --- Delete Favorite Ads Btn --- */}
      {/* -------------- */}
      {/* Favorite Body */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#cd0100" />
      ) : (
        <View style={styles.Container_Sub}>
          <ScrollView>
            {data && data.length > 0 ? (
              data.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.card}
                  onPress={() => handleNavigateToSingleCarAd(item._id)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.images[0] }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.detailsContainer}>
                    {/* --- Condition Here For Auto Part & Car , Bike --- */}
                    {item.brand && item.model && item.year ? (
                      <>
                        <Text style={styles.name}>{item.model}</Text>
                        <Text style={styles.variant}>{item.brand}</Text>
                        <Text style={styles.price}>PKR {item.price}</Text>
                      </>
                    ) : (
                      <Text style={styles.name}>
                        {item.title} {item.year}
                      </Text>
                    )}
                    {/* --- Condition Here For Auto Part & Car , Bike --- */}
                    <View style={styles.lowerView}>
                      <View style={styles.infoContainer}>
                        <Image
                          source={require("../../assets/locationIcon.png")}
                          style={styles.infoImage}
                        />
                        <Text style={styles.infoText}>{item.location}</Text>
                      </View>
                    </View>
                    {/* Time */}
                    <Text style={styles.infoText_2}>
                      Posted : {formatDistanceToNow(new Date(item.createdAt))}{" "}
                      ago
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>{noDataError}</Text>
            )}
          </ScrollView>
        </View>
      )}
      {/* -------------- */}
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
    marginVertical: 25,
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
    paddingVertical: 5,
    color: "#bd2a2a",
    letterSpacing: 1,
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 15,
    fontFamily: "Heebo",
    color: "#4A4A4A",
    paddingBottom: 8,
    letterSpacing: 1,
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
    // paddingLeft: 9,
    textAlign: "right",
    paddingRight: 5,
  },
  // Delete Btn
  My_Del_Btn_Head: {
    borderColor: "tansparenr",
    borderWidth: 0,
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  My_Del_Btn: {
    borderColor: "tansparenr",
    borderWidth: 0,
    paddingVertical: 10,
    width: "15%",
    backgroundColor: "#bc0000",
    alignSelf: "flex-end",
    borderRadius: 20,
  },
  My_Del_Btn_Txt: {
    borderColor: "tansparenr",
    borderWidth: 0,
    textAlign: "center",
  },
});
