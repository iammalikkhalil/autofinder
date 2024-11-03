/* eslint-disable prettier/prettier */
// HorizontalScrollItem.js

import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const HorizontallScrollItem = ({ imageSource, title, content, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 150,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 160,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    color: "#bd2a2a",
    alignSelf: "center",
  },
  content: {
    // margin: 5,
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    color: "grey",
    fontSize: 12,
    alignSelf: "center",
  },
});

export default HorizontallScrollItem;
