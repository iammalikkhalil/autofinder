import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import Header from "../header"; // Corrected import with PascalCase
// Fonts
import { useFonts } from "expo-font";

export default function Blog_Page() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://autofinder-backend.vercel.app/api/blog"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching blog data: ", error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "MMMM d, yyyy h:mm a");
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
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
      <StatusBar backgroundColor={"#bd2a2a"} />
      {/* Header */}
      <Header title="Blogs" onPressBack={handleBackPress} />
      {/* Body */}
      {data.length > 0 &&
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.Blog_Box_Grand_Parent}
            onPress={() => navigation.navigate("Blog_Page_Detail", { item })}
          >
            {/* First */}
            <View style={styles.Blog_Box_Parent}>
              <View style={styles.Blog_Box_Part_1}>
                <View style={styles.Blog_Box_Part_1_Sub}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.Blog_Box_Part_1_Img}
                  />
                </View>
              </View>
              <View style={styles.Blog_Box_Part_2}>
                <Text style={styles.Blog_Box_Part_2_Txt_1}>
                  {item.subTitle}
                </Text>
                {/* <Text style={styles.Blog_Box_Part_2_Txt_2}>{item.author}</Text> */}
                <Text style={styles.Blog_Box_Part_2_Txt_2}>
                  {formatDate(item.createdAt)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 3,
    paddingTop: 0,
  },
  Blog_Box_Grand_Parent: {
    backgroundColor: "white",
    // borderWidth: 0.5,
    width: "100%",
    paddingVertical: 5,
  },
  Blog_Box_Parent: {
    backgroundColor: "white",
    // borderWidth: 0.5,
    marginTop: 25,
    width: "88%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row",
    // Apply shadow properties
    elevation: 5, // for Android
  },
  Blog_Box_Part_1: {
    // borderWidth: 0.5,
    width: "37",
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignSelf: "center",
    borderRadius: 3,
  },
  Blog_Box_Part_1_Sub: {
    // borderWidth: 0.5,
    width: "100%",
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 3,
  },
  Blog_Box_Part_1_Img: {
    width: 70,
    height: 55,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignSelf: "center",
    borderRadius: 3,
    // borderWidth: 0.5,
    borderColor: "black",
  },
  Blog_Box_Part_2: {
    // borderWidth: 0.5,
    width: "65%",
    paddingHorizontal: 3,
    paddingVertical: 3,
    alignSelf: "center",
    borderRadius: 3,
    marginLeft: 5,
  },
  Blog_Box_Part_2_Txt_1: {
    // borderWidth: 0.5,
    marginBottom: 5,
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: "Kanit",
  },
  Blog_Box_Part_2_Txt_2: {
    // borderWidth: 0.5,
    letterSpacing: 1,
    marginTop: 4,
    fontSize: 13,
    fontFamily: "Kanit",
    color: "grey",
  },
});
