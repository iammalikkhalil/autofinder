/* eslint-disable prettier/prettier */
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

const GoogleSignin = ({
  userName = "Muhammad Faizan Fayyaz",
  userEmail = "ffayyaz8c@gmail.com",
}) => {
  const userProfilePic = require("../../assets/profile.png"); // Replace with the user's profile picture

  const openPrivacyPolicy = () => {
    // Replace with your Privacy Policy URL
    console.log("bntn is clicked");
  };

  const openTermsOfService = () => {
    // Replace with your Terms of Service URL
    console.log("bntn is clicked");
  };
  const handleAddAccount = () => {
    // Handle adding another account
    // Add your logic here
  };
  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Image
          source={require("../../assets/logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Choose an Account</Text>
        <Text style={styles.subText}>to continue to AutoFinder</Text>
        <View style={styles.userInfoContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={userProfilePic}
              style={styles.profilePic}
              resizeMode="cover"
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.additionalAccountContainer}>
          <Image
            source={require("../../assets/adduser.png")} // Replace with your add icon
            style={styles.addAccountIcon}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={handleAddAccount}>
            <Text style={styles.addAccountText}>Add another account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.additionalText}>
          <Text>
            To continue, Google will share your name, email address, and profile
            picture with AutoFinder. Before using this app, Review :{" "}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={openPrivacyPolicy}>
              <Text style={styles.linkText}>Privacy policy</Text>
            </TouchableOpacity>
            <Text> and </Text>
            <TouchableOpacity onPress={openTermsOfService}>
              <Text style={styles.linkText}> Terms of Service</Text>
            </TouchableOpacity>
          </View>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.70)", // semi-transparent background
  },
  popup: {
    backgroundColor: "white",
    width: 250, // Set a fixed width for the popup
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  subText: {
    fontSize: 14.5,
    color: "grey",
    marginBottom: 20,
    textTransform: "capitalize",
    letterSpacing: 1.8,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileContainer: {
    width: 30, // Fixed width for the profile container
    height: 30, // Fixed height for the profile container
    borderRadius: 25,
    overflow: "hidden", // Ensure the image doesn't exceed the container
    marginRight: 10,
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    flex: 1,
    marginLeft: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 14,
    color: "grey",
    letterSpacing: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "100%", // Adjust the width of the separator line
    marginTop: 20,
    marginBottom: 10,
  },
  additionalAccountContainer: {
    flexDirection: "row",
    marginTop: 10, // Adjust the margin to your preference
    alignSelf: "flex-start",
    alignItems: "center",
  },
  addAccountText: {
    color: "black",
    fontWeight: "bold",
    marginLeft: 15,
    fontSize: 15,
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
  addAccountIcon: {
    width: 30,
    height: 30,
  },
  additionalText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
  linkText: {
    color: "blue",
  },
});

export default GoogleSignin;
