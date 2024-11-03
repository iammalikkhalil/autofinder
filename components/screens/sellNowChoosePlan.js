import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SellNowChoosePlan = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    // Handle the back button press or navigate back
    navigation.goBack();
  };
  const handleSellItForMe = () => {
    navigation.navigate("basicInfoCarInspection");
  };
  const handleSellItMyself = () => {
    navigation.navigate("freeAdsPostService");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Choose a plan</Text>
      </View>

      {/* Subtitle */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>How do you want to sell your car?</Text>
      </View>
      <View style={styles.roundedViewsContainer}>
        <View style={styles.roundedView}>
          <Text style={styles.roundedViewText}>Sell it for me!</Text>
          <Text style={styles.subtext}>
            Need to sell your car without negotiating for the best offers
          </Text>
          <TouchableOpacity>
            <Text style={styles.textButton} onPress={handleSellItForMe}>
              I want experts to sell my car
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.roundedView}>
          <Text style={styles.roundedViewText}>Sell it myself!</Text>
          <Text style={styles.subtext}>
            Place your ad to uncover the best offer from our potential buyers
          </Text>
          <TouchableOpacity>
            <Text style={styles.textButton} onPress={handleSellItMyself}>
              I can find the best offer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bd2a2a",
    padding: 10,
    height: 50,
  },
  backButton: {
    padding: 5,
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "white",
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
    marginTop: 35,
    marginRight: 5,
    marginLeft: 15,
  },
  subtitle: {
    color: "#bd2a2a",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 40,
  },
  roundedViewsContainer: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
  },
  roundedView: {
    backgroundColor: "ghostwhite",
    borderRadius: 10,
    padding: 10,
    width: 350,
    height: 120,
    margin: 20,
  },
  roundedViewText: {
    fontSize: 16,
    color: "black",
  },
  roundedViewText: {
    fontSize: 16,
    color: "darkgreen",
    fontWeight: "bold",
    marginTop: 1,
  },
  subtext: {
    fontSize: 14,
    color: "grey",
    marginTop: 10,
  },
  textButton: {
    marginTop: 20,
    color: "royalblue",
  },
});

export default SellNowChoosePlan;

