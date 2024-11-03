import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Advantage = ({ advantages }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advantages of Rent Service</Text>
      {advantages.map((advantage, index) => (
        <Text key={index} style={styles.advantage}>
          {index + 1}. {advantage}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "darkgreen",
  },
  advantage: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Advantage;
