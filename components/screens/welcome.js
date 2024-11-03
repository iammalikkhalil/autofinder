/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import GoogleLogo from "../../assets/Googlelogo.jpeg";
import email from "../../assets/email.png";
import { useNavigation } from "@react-navigation/native";
// Fonts
import { useFonts } from "expo-font";

const Welcome = () => {
  const handleTermsPress = () => {
    console.log("handel termpress");
  };
  const handlePrivacyPress = () => {
    console.log("handel termpress");
  };

  const navigation = useNavigation();
  const handleGoogleSignIn = () => {
    navigation.navigate("googleSignin");
  };

  const handleFacebookSignIn = () => {};

  const handleEmailSignIn = () => {
    navigation.navigate("emailSignin");
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/Kanit-Black.ttf"),
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign In To Continue</Text>
        <Text style={styles.getStartedText}>Let's Get Started !</Text>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.prefixText}>+92 |</Text>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#A0A0A0"
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={styles.continueWithText}>Continue with Mobile Number</Text> */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonGoogle]}
            onPress={handleGoogleSignIn}
          >
            <Image source={GoogleLogo} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Continue with Facebook */}
          {/* <TouchableOpacity
            style={[styles.button, styles.buttonFacebook]}
            onPress={handleFacebookSignIn}>
            <Image
              source={GoogleLogo}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </TouchableOpacity> */}

          {/* Continue with Email */}
          <TouchableOpacity
            style={[styles.button, styles.buttonEmail]}
            onPress={handleEmailSignIn}
          >
            <Image source={email} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.agreementContainer}>
          <Text style={styles.agreementText}>
            By continuing you agree to our
          </Text>

          <View style={styles.Mix}>
            <TouchableOpacity onPress={handleTermsPress}>
              <Text style={styles.inlineUnderlineGray}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.agreementText}>And</Text>
            <TouchableOpacity onPress={handlePrivacyPress}>
              <Text style={styles.inlineUnderlineBlack}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    color: "white",
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    marginTop: 70,
    textAlignVertical: "center",
    textAlign: "center",
    color: "black",
    fontFamily: "Heebo",
  },
  getStartedText: {
    fontSize: 38,
    marginTop: 80,
    color: "#bd2a2a",
    fontFamily: "HeeboExtra",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 15,
  },
  prefixText: {
    marginRight: 10,
    fontSize: 18,
    color: "#333333",
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 15,
    color: "#333333",
  },
  continueWithText: {
    marginTop: 20,
    fontSize: 16,
    color: "darkgrey",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    width: "80%",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#BC0000",
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  buttonGoogle: {
    borderColor: "#000000",
  },
  buttonFacebook: {
    borderColor: "#000000",
  },
  buttonEmail: {
    borderColor: "#000000",
  },
  agreementContainer: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  agreementText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    fontFamily: "Kanit",
    paddingVertical: 5,
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  inlineText: {
    fontFamily: "Kanit",
    color: "gray",
    paddingTop: 20,
    textTransform: "capitalize",
    letterSpacing: 0.5,
    letterSpacing: 0.5,
  },
  inlineUnderlineGray: {
    textTransform: "capitalize",
    fontFamily: "Kanit",
    color: "gray",
    marginRight: 5,
    letterSpacing: 0.5,
  },
  inlineUnderlineBlack: {
    textTransform: "capitalize",
    fontFamily: "Kanit",
    color: "gray",
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  Mix: {
    // borderWidth: 0.5,
    paddingVertical: 3,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Welcome;
