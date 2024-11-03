import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext, userContext } from "../../context/userContext";

const SellerProfile = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Seller Profile</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Seller Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.name || "username"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Contact Info:</Text>
          <Text style={styles.value}>{user.phoneNumber || "03XX XXXXXXX"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email || "abc123@gmail.com"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{user.address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#bd2a2a", // Tomato color
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    // paddingRight: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bd2a2a",
  },
  value: {
    fontSize: 14,
  },
});

export default SellerProfile;

