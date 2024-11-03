import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const FilterApply = ({ onApplyFilter, onResetFilter }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onApplyFilter}
        style={[styles.button, styles.callButton]}
      >
        <Text style={styles.callButton}>Apply Filter</Text>
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={onResetFilter}
          style={[styles.buttonReset, styles.callBttnReset]}
        >
          <Text style={styles.callBttnReset}>Reset Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    // height: 50,
  },
  buttonReset: {
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    // height: 50,
  },
  buttonText: {
    color: "#2884ec",
    fontSize: 12,
    fontWeight: "bold",
  },
  callButton: {
    backgroundColor: "#2e8b57",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  callBttnReset: {
    backgroundColor: "red",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default FilterApply;
