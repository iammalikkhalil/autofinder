import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Test() {
  // Body
  return (
    <View style={styles.container}>
      {/* My Days */}
      <View style={styles.Parent_Time_Remain}>
        <View style={styles.Parent_Sub_Time_Remain}>
          <Text style={styles.Parent_Sub_Time_Remain_Txt}>10 Days Left</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Parent_Time_Remain: {
    borderWidth: 0.5,
    width: "37%",
    paddingHorizontal: 12,
    paddingVertical: 25,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    left: 0,
  },
  Parent_Sub_Time_Remain: {
    borderWidth: 0.5,
    borderColor: "#bd2a2a",
    width: "100%",
    paddingVertical: 2.5,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "#bd2a2a",
  },
  Parent_Sub_Time_Remain_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 13,
  },
});
