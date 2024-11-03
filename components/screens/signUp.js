import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
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
import AntDesign from "@expo/vector-icons/AntDesign";
// Fonts
import { useFonts } from "expo-font";

// Function to validate email format
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to validate password format
const validatePassword = (password) => {
  // Password must be minimum 8 characters and include at least 1 digit
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    const empty = [];

    // Check each field and add it to the empty array if it's empty
    if (!name) {
      empty.push("Your Name");
    }
    if (!phoneNumber) {
      empty.push(" Your Phone Number");
    }
    if (!email) {
      empty.push(" Your Email Address");
    }
    if (!password) {
      empty.push("Your Password");
    }
    if (!address) {
      empty.push("Your Address");
    }

    // Update the state with the empty fields
    setEmptyFields(empty);

    // If any field is empty, stop sign-up process and display error message
    if (empty.length > 0) {
      console.log("Please fill all required fields");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setInvalidEmail(true);
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setInvalidPassword(true);
      return;
    }

    // Validate phone number format
    const phoneNumberRegex = /^(?:(\+92)?(0092)?(92)?(0)?)?(3)([0-9]{9})$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      setInvalidPhoneNumber(true);
      return;
    }

    try {
      // Call the API to sign up
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/signup",
        {
          name,
          password,
          email,
          address,
          phoneNumber,
        }
      );
      console.log(response.data);

      navigation.navigate("emailSignin");

      // Handle success, navigate to the next screen, show a success message, etc.
    } catch (error) {
      // Handle error, show an error message, etc.
      console.error(error.response.data);
    }
  };
  // --- OTP Logic ---
  const [otpError, setOtpError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [modalIsOpenSignup, setIsOpenSignup] = useState(false);
  const [modalIsOpenOtp, setIsOpenOtp] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const openModalOtp = () => {
    setIsOpenOtp(true);
  };
  const closeModalOtp = () => {
    setOtpError("");
    setOtpCode("");
    setIsOpenOtp(false);
  };
  const handleGenerateOtp = async () => {
    try {
      setDisableBtn(true);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/generateotp",
        // { phone: phoneNumber }
        { phone: "+923335448744" }
      );
      if (response.data.ok) {
        setDisableBtn(false);
        setSignupError("");
        openModalOtp();
      }
    } catch (error) {
      console.log(error);
      setDisableBtn(false);
      setSignupError(error.response.data.error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/verifyotp",
        { codeOTP: otpCode }
      );
      if (response.data.ok) {
        setOtpError("OTP Code Is Correct");
        setTimeout(() => {
          closeModalOtp();
          handleSignUp();
        }, 1000);
      } else {
        setOtpError("OTP Code Is Wrong");
      }
    } catch (error) {
      setOtpError("OTP Code Is Wrong");
    }
  };
  // --- OTP Logic ---
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
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* Main Body */}
        <Text style={styles.signInText}>Sign Up for AutoFinder</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            autoCapitalize="words"
            autoCorrect={false}
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
          />
          {(emptyFields.includes("Name") || (name && name.length < 3)) && (
            <Text style={styles.errorText}>
              Name must have at least 3 characters
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#A0A0A0"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          {invalidPhoneNumber && (
            <Text style={styles.errorText}>Invalid phone number format</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
          />
          {invalidEmail && (
            <Text style={styles.errorText}>Invalid email format</Text>
          )}
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
          {invalidPassword && (
            <Text style={styles.errorText}>
              Password must be minimum 8 characters and include at least 1 digit
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            autoCapitalize="words"
            autoCorrect={false}
            placeholderTextColor="#A0A0A0"
            value={address}
            onChangeText={setAddress}
          />
          {(emptyFields.includes("Address") ||
            (address && address.length < 4)) && (
            <Text style={styles.errorText}>Incorrect format</Text>
          )}
        </View>
        {/* SignUp Btn */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleGenerateOtp}
        >
          <Text style={styles.signInButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {/* OTP Modal */}
      <Modal visible={modalIsOpenOtp} animationType="slide" transparent>
        <View style={styles.Otp}>
          <View style={styles.Otp_Sub}>
            <TouchableOpacity
              style={styles.Otp_Parent_H_0}
              onPress={closeModalOtp}
            >
              <Text style={styles.Otp_Parent_H_0_Txt}>
                <AntDesign name="close" size={15} color="white" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.Otp_H}>OTP Verififcation</Text>
            <Text style={styles.Otp_H_1}>Please Enter 6 Digit OTP Code</Text>
            <TextInput
              style={styles.Otp_Input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={otpCode}
              onChangeText={setOtpCode}
            />
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
            <TouchableOpacity
              style={styles.Otp_Button}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.Otp_ButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {signupError ? (
        <Text style={styles.signupError}>{signupError}</Text>
      ) : null}
      {/* OTP Modal */}
      {/* Popup for empty fields */}
      <Modal visible={emptyFields.length > 0} animationType="slide" transparent>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Please Enter !</Text>
          {emptyFields.map((field) => (
            <Text key={field} style={styles.popupField}>
              {field}
            </Text>
          ))}
          <TouchableOpacity onPress={() => setEmptyFields([])}>
            <Text style={styles.popupClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 22,
    backgroundColor: "white",
  },
  signInText: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: "center",
    color: "#bd2a2a",
    fontFamily: "Heebo",
    letterSpacing: 1,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    fontSize: 14,
    color: "black",
    marginBottom: 0,
    fontFamily: "Heebo",
    letterSpacing: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#bc0000", // Black bottom border for input
    fontSize: 15,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
    fontFamily: "Kanit",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  passwordInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#bc0000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordVisibilityText: {
    color: "grey",
    fontSize: 16,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  signUpButton: {
    backgroundColor: "#bd2a2a",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
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
  Otp: {
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  Otp_Sub: {
    width: "75%",
    borderWidth: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  Otp_H: {
    borderWidth: 0,
    borderColor: "transparent",
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 23,
    letterSpacing: 1,
  },
  Otp_H_1: {
    borderWidth: 0,
    borderColor: "transparent",
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.5,
    color: "grey",
  },
  Otp_Input: {
    borderWidth: 0.5,
    borderColor: "#CCCCCC",
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginTop: 20,
    letterSpacing: 2,
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: "#F3F3F3",
    marginHorizontal: 18,
  },
  Otp_Button: {
    borderWidth: 0,
    borderColor: "transparent",
    marginHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#BC0000",
    marginTop: 30,
    borderRadius: 20,
  },
  Otp_ButtonText: {
    textAlign: "center",
    paddingVertical: 1,
    color: "white",
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontSize: 15,
  },
  Otp_Parent_H_0: {
    borderWidth: 0,
    borderColor: "transparent",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Otp_Parent_H_0_Txt: {
    borderWidth: 0,
    borderColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 7,
    borderRadius: 50,
    backgroundColor: "red",
  },
});

export default SignUp;
