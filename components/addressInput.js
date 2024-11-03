import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AddressInput = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === "City" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect("City")}
      >
        <Text>City</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === "Sub Location" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect("Sub Location")}
      >
        <Text>Sub Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === "Other Options" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect("Other Options")}
      >
        <Text>Other Options</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    paddingHorizontal: 25,
    marginBottom: 5,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "lightblue",
  },
});

export default AddressInput;
