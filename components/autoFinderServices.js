import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AutoFinderServices = ({
  onPremiumAdsPress,
  onFreeAdsPress,
  onManagedAdsPress,
  // onCarInspectionPress,
}) => {
  const navigation = useNavigation()

  const handle001Navigation = ()=>{
    navigation.navigate("homeListItForYou" , {service:"001"})
  }
  const handle002Navigation = ()=>{
    navigation.navigate('homeCarInspection',{service: '002'})
  }
  const handle003Navigation = ()=>{
    navigation.navigate('homeBuyCarForMe',{service:"003"})
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handle001Navigation}>
        <Text style={styles.buttonText}>Car Listing Assist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handle003Navigation}>
        <Text style={styles.buttonText}>Car Buying Helper</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handle002Navigation}>
        <Text style={styles.buttonText}>Vehicle Inspection Pro </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={onCarInspectionPress}>
        <Text style={styles.buttonText}>Auto Rental Solutions</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    // backgroundColor: 'darkred',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 300,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "#bd2a2a",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AutoFinderServices;
