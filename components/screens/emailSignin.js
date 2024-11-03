import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonts
import { useFonts } from "expo-font";

// Function to validate email format
// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

// Function to validate password format
// const validatePassword = (password) => {
//   // Password must be minimum 8 characters and include at least 1 digit
//   const passwordRegex = /^(?=.*\d).{8,}$/;
//   return passwordRegex.test(password);
// };

const EmailSignin = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user, dispatch } = useContext(UserContext);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = () => {
    console.log("Sign Up button pressed");
    navigation.navigate("signUp");
  };

  const handleSignIn = async () => {
    const empty = [];

    if (!email) {
      empty.push("Your Email");
    }
    if (!password) {
      empty.push("Your Password");
    }

    if (empty.length > 0) {
      setEmptyFields(empty);
      return;
    }

    // if (!validateEmail(email)) {
    //   setInvalidEmail(true);
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   setInvalidPassword(true);
    //   return;
    // }

    //api
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/login",
        {
          phoneNumber: email,
          password,
        }
      );

      if (response.data.ok) {
        try {
          await AsyncStorage.setItem("token", response.data.token);
          dispatch({ type: "LOGIN", payload: response.data.data });
          navigation.navigate("home");
        } catch (error) {
          console.error("Error saving token to AsyncStorage:", error);
        }
      }

      // console.log(result); // 'bar'
    } catch (error) {
      console.error(error.response.data);
      if (!error.response.data.ok) {
        setLoginError(error.response.data.error);
      }
    }

    // console.log("Signing in...");
    // Perform sign-in logic here
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
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* --- Image --- */}
        <View style={styles.Img_Parent}>
          <Image source={require("../../assets/logo.jpg")} style={styles.Img} />
        </View>
        {/* --- Image --- */}
        {/* Main Body */}
        <Text style={styles.signInText}>Sign in for Auto Finder</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.emailInputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number "
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emptyFields.includes("Email") && (
            <Text style={styles.errorText}>Please enter your email</Text>
          )}
          {/* {invalidEmail && (
            <Text style={styles.errorText}>Invalid email format</Text>
          )} */}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={styles.passwordVisibilityText}>
                {passwordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          {emptyFields.includes("Password") && (
            <Text style={styles.errorText}>Please enter your password</Text>
          )}
          {loginError && <Text style={{ color: "red" }}>{loginError}</Text>}
          {/* {invalidPassword && (
            <Text style={styles.errorText}>
              Password must be minimum 8 characters and include at least 1 digit
            </Text>
          )} */}
        </View>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText_1}>Don't have an account ?</Text>
          <Text style={styles.signUpText} onPress={handleSignUp}>
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Popup for empty fields */}
        <Modal
          visible={emptyFields.length > 0}
          animationType="fade"
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.popupTitle}>Please Enter!</Text>
              {emptyFields.map((field) => (
                <Text key={field} style={styles.popupField}>
                  {field}
                </Text>
              ))}
              <TouchableOpacity onPress={() => setEmptyFields([])}>
                <Text style={styles.popupClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  Img_Parent: {
    // borderWidth: 0.5,
    paddingVertical: 30,
    width: "100%",
  },
  Img: {
    borderWidth: 0,
    borderColor: "transparent",
    width: 130,
    height: 100,
    alignSelf: "center",
    borderRadius: 30,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupField: {
    fontSize: 16,
    marginBottom: 5,
  },
  popupClose: {
    fontSize: 18,
    color: "blue",
    marginTop: 10,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  signInText: {
    fontSize: 24,
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: "center",
    color: "#bd2a2a",
    fontFamily: "Heebo",
    letterSpacing: 1,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    fontSize: 15,
    color: "black",
    marginBottom: 5,
    fontFamily: "Heebo",
    letterSpacing: 0.5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#bc0000", // Black bottom border for input
    fontSize: 16,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  passwordInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#bc0000",
    flexDirection: "row", // To align the text label 'Hide'/'Show' to the right
    justifyContent: "space-between", // To create space between password input and text label
    alignItems: "center", // Align items vertically
  },
  passwordVisibilityText: {
    color: "grey",
    fontSize: 16,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  signUpButton: {
    marginTop: 35,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText_1: {
    color: "grey",
    fontFamily: "Kanit",
    fontSize: 16,
    marginRight: 10,
  },
  signUpText: {
    color: "#bd2a2a",
    fontFamily: "Kanit",
    fontSize: 16,
    marginRight: 10,
  },
  signInButton: {
    backgroundColor: "#bd2a2a", //(#ff7f50)
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  signInButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Kanit",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  // Popup styles
  popup: {
    backgroundColor: "white",
    padding: 20,
    margin: 50,
    borderRadius: 10,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    marginBottom: 40,
    color: "#bd2a2a",
    fontFamily: "Heebo",
    textAlign: "center",
  },
  popupField: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
  },
  popupClose: {
    color: "blue",
    alignSelf: "flex-end",
    marginTop: 10,
    fontFamily: "Heebo",
  },
  // Error text style
  errorText: {
    color: "red",
    fontSize: 14,
    fontFamily: "Kanit",
  },
});

export default EmailSignin;
