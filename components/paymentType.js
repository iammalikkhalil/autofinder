import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PaymentType = ({ onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    console.log("Selected Payment Options:", updatedOptions);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions.includes("Advance") && styles.selectedOption,
        ]}
        onPress={() => toggleOption("Advance")}
      >
        <Text>Advance</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions.includes("Security") && styles.selectedOption,
        ]}
        onPress={() => toggleOption("Security")}
      >
        <Text>Security</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    paddingHorizontal: 50,
    marginBottom: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  selectedOption: {
    backgroundColor: "lightblue",
  },
});

export default PaymentType;
