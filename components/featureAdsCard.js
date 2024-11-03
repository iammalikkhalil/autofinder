import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const FeatureAdsCard = ({
  title,
  subtitle,
  buttonText,
  imageSource,
  onPressButton,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContent}>
        <Image source={imageSource} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    // margin: 10,
    height: 150, // Adjust the height as needed
    backgroundColor: "#fff",
    marginLeft: 10,
    // marginRight: 40,
    marginTop: 10,
    paddingHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContent: {
    flex: 3,
    padding: 5,
  },
  rightContent: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2884ec",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 20,
    color: "grey",
  },
  button: {
    backgroundColor: "#bd2a2a",
    paddingVertical: 5,
    // paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "50%",
    height: 100,
    borderRadius: 5,
  },
});

export default FeatureAdsCard;
