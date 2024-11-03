import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DocumentationRequirements = ({ onSelect }) => {
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
    console.log("Selected Documentation Requirements:", updatedOptions);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions.includes("NIC") && styles.selectedOption,
        ]}
        onPress={() => toggleOption("NIC")}
      >
        <Text>NIC</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions.includes("Guarantee Cheques") &&
            styles.selectedOption,
        ]}
        onPress={() => toggleOption("Guarantee Cheques")}
      >
        <Text>Guarantee Cheques</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions.includes("Personal Guarantee") &&
            styles.selectedOption,
        ]}
        onPress={() => toggleOption("Personal Guarantee")}
      >
        <Text>Personal Guarantee</Text>
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
    paddingHorizontal: 5,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  selectedOption: {
    backgroundColor: "lightblue",
  },
});

export default DocumentationRequirements;
