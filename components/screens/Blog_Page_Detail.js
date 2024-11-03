import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Clipboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { format } from "date-fns";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../header"; // Corrected import with PascalCase
// Fonts
import { useFonts } from "expo-font";

export default function Blog_Page_Detail() {
  const route = useRoute();
  const { item } = route.params;
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "MMMM d, yyyy h:mm a");
  };

  const [copiedMessage, setCopiedMessage] = useState("");

  const shareViaWhatsApp = () => {
    const message = `Check out this blog post:\n\nTitle: ${
      item.title
    }\n\nSubtitle: ${item.subTitle}\n\nAuthor: ${
      item.author
    }\n\nEdited On: ${formatDate(item.createdAt)}\n\nContent:\n${item.body}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const navigateToFacebookLogin = async () => {
    const facebookLoginURL = "https://www.facebook.com/login/";
    try {
      const supported = await Linking.canOpenURL(facebookLoginURL);
      if (supported) {
        await Linking.openURL(facebookLoginURL);
      } else {
        Alert.alert("Share Error", "Unable to open Facebook login.");
      }
    } catch (error) {
      console.error("Error opening Facebook login:", error);
    }
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
      <Header title="Blog Detail" onPressBack={handleBackPress} />
      <View style={styles.Sub_container}>
        {/* Body */}
        <ScrollView>
          <View style={styles.Blog_Page_Parent}>
            {/* 1 - Image */}
            <View style={styles.BD_Img_Parent}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.Blog_Box_Part_1_Img}
                resizeMode="stretch"
              />
            </View>
            {/* 2 Post - Heading */}
            <Text style={styles.BD_Txt_1_Post}>{item.title}</Text>
            {/* 2 - Heading */}
            <Text style={styles.BD_Txt_1}>{item.subTitle}</Text>
            {/* 3 - Author */}
            <Text style={styles.BD_Txt_2}>Written By {item.author}</Text>
            {/* 3 Post - Date */}
            <Text style={styles.BD_Txt_2_1}>
              Edited On {formatDate(item.createdAt)}
            </Text>
            {/* --- Share --- */}
            <View style={styles.BD_Txt_Share}>
              {/* 1 */}
              <View style={styles.BD_Txt_Share_1}>
                <Text style={styles.BD_Txt_Share_1_Txt}>Share Via</Text>
              </View>
              {/* 2 */}
              <View style={styles.BD_Txt_Share_2}>
                <TouchableOpacity
                  style={styles.BD_Txt_Share_2_Btn_Parent}
                  onPress={shareViaWhatsApp}
                >
                  <View style={styles.BD_Txt_Share_2_Btn_V}>
                    <Text style={styles.BD_Txt_Share_2_Btn_T}>
                      <FontAwesome name="whatsapp" size={20} color="white" />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* 3 */}
              <View style={styles.BD_Txt_Share_2}>
                <TouchableOpacity
                  style={[
                    styles.BD_Txt_Share_2_Btn_Parent,
                    { backgroundColor: "#0866FF" },
                  ]}
                  onPress={navigateToFacebookLogin}
                >
                  <View style={styles.BD_Txt_Share_2_Btn_V}>
                    <Text style={styles.BD_Txt_Share_2_Btn_T}>
                      <FontAwesome name="facebook" size={20} color="white" />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* 4 - Body */}
            <View style={styles.BD_Txt_3}>
              <RenderHTML
                contentWidth={width}
                source={{ html: item.body }}
                systemFonts={['Kanit']}
                tagsStyles={{
                  body: { fontFamily: "Kanit", fontSize: 14, color: "grey", letterSpacing: 0.1, },
                  h1: { fontFamily: 'Kanit', fontSize: 24, color: 'grey' },
                  h2: { fontFamily: 'Kanit', fontSize: 24, color: 'grey' },
                  h3: { fontFamily: 'Kanit', fontSize: 24, color: 'grey' },
                  h4: { fontFamily: 'Kanit', fontSize: 24, color: 'grey' },
                  h5: { fontFamily: 'Kanit', fontSize: 24, color: 'grey' },
                  h6: { fontFamily: 'Kanit', fontSize: 24, color: 'grey' },
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
    // paddingTop: 20,
    flex: 1,
    backgroundColor: "white",
  },
  htmlContent: {
    fontFamily: "Kanit",
    // Add other text styling here if needed
  },
  Sub_container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 25,
  },
  Blog_Page_Parent: {
    // borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  BD_Img_Parent: {
    // borderWidth: 0.5,
    paddingHorizontal: 3,
    paddingVertical: 3,
    // backgroundColor: "lightyellow",
  },
  Blog_Box_Part_1_Img: {
    width: "100%",
    height: 220,
    alignSelf: "center",
    borderRadius: 3,
  },
  BD_Txt_1_Post: {
    fontSize: 20,
    fontFamily: "Heebo",
    // borderWidth: 0.5,
    marginTop: 20,
    color: "#393636",
    paddingHorizontal: 5,
    paddingVertical: 5,
    letterSpacing: 0.8,
  },
  BD_Txt_1: {
    fontSize: 15,
    fontFamily: "Kanit",
    // borderWidth: 0.5,
    marginVertical: 5,
    color: "#393636",
    paddingHorizontal: 8,
    paddingVertical: 15,
    letterSpacing: 1,
  },
  BD_Txt_2: {
    fontSize: 13,
    // borderWidth: 0.5,
    color: "#575252",
    paddingHorizontal: 10,
    paddingVertical: 5,
    letterSpacing: 0.5,
    textAlign: "right",
    fontFamily: "Kanit",
  },
  BD_Txt_2_1: {
    fontSize: 13,
    // borderWidth: 0.5,
    color: "#575252",
    paddingHorizontal: 10,
    paddingVertical: 5,
    letterSpacing: 0.5,
    textAlign: "right",
    marginTop: 5,
    fontFamily: "Kanit",
  },
  BD_Txt_3: {
    marginVertical: 5,
    // borderWidth: 0.5,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  BD_Txt_Share: {
    // borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  BD_Txt_Share_1: {
    // borderWidth: 0.5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  BD_Txt_Share_1_Txt: {
    // borderWidth: 0.5,
    padding: 1,
    fontSize: 15,
    letterSpacing: 0.2,
    fontFamily: "Kanit",
  },
  BD_Txt_Share_2: {
    // borderWidth: 0.5,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  BD_Txt_Share_2_Btn_Parent: {
    // borderWidth: 0.5,
    paddingVertical: 2,
    paddingHorizontal: 3,
    backgroundColor: "#25D366",
    borderRadius: 10,
  },
  BD_Txt_Share_2_Btn_V: {
    // borderWidth: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 1.2,
    borderRadius: 10,
  },
  BD_Txt_Share_2_Btn_T: {
    // borderWidth: 0.5,
    paddingHorizontal: 3,
    borderRadius: 10,
  },
});
