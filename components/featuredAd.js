/* eslint-disable prettier/prettier */
// FeaturedAd.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
// Fonts
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const FeaturedAd = ({ navigation }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/",
          { featured: true }
        );

        // console.log(response.data.data)
        setItems(response.data.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    fetchData();
  }, []);

  // Mock data for 10 items
  // const items = Array.from({ length: 10 }, (_, index) => ({
  //   id: index + 1,
  //   name: `Item ${index + 1}`,
  //   price: `$${(index + 1) * 1000}`,
  //   city: 'City Name',
  //   model: 'Model Name',
  //   kmDriven: `${(index + 1) * 5000} km`,
  //   // Image source will be provided by the user during upload
  //   // For now, using a placeholder image
  //   //imageSource: require('./path/to/placeholder-image.jpg'), // Replace with your placeholder image path
  // }));
  const handleItemPress = (itemId) => {
    // Navigate to the home.js screen with the itemId
    navigation.navigate("sellerCarDetail", { itemId });
  };
  // ----- Feature Ad List Show Only -----
  const handleListFeatureAdPress = () => {
    // Navigate to the home.js screen with the itemId
    navigation.navigate("featureAd_Detail");
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../assets/fonts/My_Soul/Kanit-Black.ttf"),
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
    <View style={styles.featuredAdsContainer}>
      {/* Box */}
      <View style={styles.Extra_Box}>
        {/* - */}
        <Text style={styles.Extra_Box_Txt_1}>Featured Ads</Text>
        {/* - */}
        <TouchableOpacity
          style={styles.Extra_Box_Txt_2_Box}
          onPress={handleListFeatureAdPress}
        >
          <Text style={styles.Extra_Box_Txt_2}>See All</Text>
        </TouchableOpacity>
      </View>
      {/* Box */}
      {/* <Text style={styles.featuredAdsLabel}>Featured Ads</Text> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {items.length > 0 &&
          items.map((item) => (
            <TouchableOpacity
              key={item._id} // Updated to use item._id as a unique key
              style={styles.itemContainer}
              onPress={() => handleItemPress(item._id)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.images[0] }} style={styles.image} />
                {/* --- Featured --- */}
                {item.featured && (
                  // <Image
                  //   source={require("../assets/featured.png")}
                  //   style={styles.featuredIcon}
                  // />
                  // --- New ---
                  <Text style={styles.featuredText}>
                    {/* <FontAwesome name="star" size={15} color="white" /> */}
                    Featured
                  </Text>
                  // --- New ---
                )}
                {/* --- Featured --- */}
              </View>
              <View style={styles.contentContainer}>
                <Text
                  style={styles.name}
                >{`${item.brand} ${item.model} ${item.varient}`}</Text>
                <Text style={styles.price}>PKR {item.price}</Text>
                <Text style={styles.city}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  featuredAdsContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
  },
  featuredAdsLabel: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  Extra_Box: {
    // borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  Extra_Box_Txt_1: {
    marginLeft: 0,
    // borderWidth: 0.5,
    color: "#696969",
    fontSize: 17,
    letterSpacing: 1,
    fontFamily: "Heebo",
  },
  // Extra_Box_Txt_2_Box: {
  //   borderWidth: 0.5,
  // },
  Extra_Box_Txt_2: {
    // borderWidth: 0.5,
    color: "black",
    fontSize: 13,
    color: "#bd2a2a",
    margin: "auto",
    marginRight: 6,
    letterSpacing: 0.5,
    fontFamily: "Kanit",
  },
  container: {
    flexDirection: "row",
    paddingTop: 5,
    marginBottom: 5,
  },
  itemContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    width: 130,
  },
  imageContainer: {
    width: "100%",
    marginRight: 0,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // marginTop: 20,
  },
  contentContainer: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#FFF2F2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {
    fontSize: 12.5,
    // fontWeight: "bold",
    marginTop: 1,
    marginBottom: 5,
    color: "#bd2a2a",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
    letterSpacing: 1,
  },
  price: {
    fontSize: 13.3,
    fontFamily: "Heebo",
    color: "#282828",
    marginBottom: 3,
    letterSpacing: 1,
  },
  featuredText: {
    overflow: "visible",
    borderWidth: 0,
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 7,
    paddingVertical: 7,
    color: "white",
    backgroundColor: "#EE0101",
    letterSpacing: 1,
    fontFamily: "Kanit",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 10,
    fontSize: 12,
  },
});

export default FeaturedAd;
