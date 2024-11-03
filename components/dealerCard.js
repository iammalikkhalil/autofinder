// DealerCard.js

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const DealerCard = ({ packageInfo, onPress, borderColor }) => {
  const {
    _id,
    heading,
    premiumBundles,
    liveAdDays,
    freeBoosterPack,
    actualPrice,
    discountedRate,
    saved,
    costPerAd,
  } = packageInfo;

  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.content}>
        <View style={[styles.infoRow, styles.lightGreyBackground]}>
          <Text style={styles.label}>Premium Bundles:</Text>
          <Text>{premiumBundles}</Text>
        </View>
        <View style={[styles.infoRow, styles.whiteBackground]}>
          <Text style={styles.label}>Live Ad Days:</Text>
          <Text>{liveAdDays}</Text>
        </View>
        <View style={[styles.infoRow, styles.lightGreyBackground]}>
          <Text style={styles.label}>Free Booster Pack:</Text>
          <Text>{freeBoosterPack}</Text>
        </View>
        <View style={[styles.infoRow, styles.whiteBackground]}>
          <Text style={styles.label}>Actual Price:</Text>
          <Text>{actualPrice}</Text>
        </View>
        <View style={[styles.infoRow, styles.lightGreyBackground]}>
          <Text style={styles.label}>Discounted Rate:</Text>
          <Text>{discountedRate}</Text>
        </View>
        <View style={[styles.infoRow, styles.whiteBackground]}>
          <Text style={styles.label}>You Saved:</Text>
          <Text>{saved}</Text>
        </View>
        <View style={[styles.infoRow, styles.lightGreyBackground]}>
          <Text style={styles.label}>Cost Per Ad:</Text>
          <Text>{costPerAd}</Text>
        </View>
      </View>
      <Button title="Select Package" onPress={()=>onPress(packageInfo)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
  },
  lightGreyBackground: {
    backgroundColor: "#f0f0f0",
  },
  whiteBackground: {
    backgroundColor: "#ffffff",
  },
});

export default DealerCard;
