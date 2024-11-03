import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

// import MarqueeText from 'react-native-marquee';

const BookExpertVisitCarInspection = ({ navigation }) => {
  const [houseNo, setHouseNo] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [area, setArea] = useState("");
  const [province, setProvince] = useState("");
  const route = useRoute();
  const { data } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log("data coming form basic info car inspection : ", data);
  }, []);

  const handlecontinue = (days, priceToPay) => {
    const data = {
      houseNo,
      streetNo,
      area,
      province,
    };
    navigation.navigate("checkoutCarInspection", {
      days,
      priceToPay,
      service: "000",
      ...data,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Book Expert Visit</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.bookExpertVisit}>Book expert visit</Text>

          {/* View under "Book expert visit" text */}
          {/* <View style={styles.MarqueeContainer}>
                        <MarqueeText
                            style={styles.marqueeText}
                            speed={1}
                            marqueeOnStart={true}
                            loop={true}
                            delay={1200}
                        >
                            Standard service fee: PKR 6,800 for visitation. Extra fees determined by the car's CC.
                        </MarqueeText>
                    </View> */}

          <Text style={styles.label}>House No</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter house number"
            value={houseNo}
            onChangeText={setHouseNo}
          />

          <Text style={styles.label}>Street No</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter street number"
            value={streetNo}
            onChangeText={setStreetNo}
          />

          <Text style={styles.label}>Area</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter area"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.label}>Province</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter province"
            value={province}
            onChangeText={setProvince}
          />

          {/* Add more components or functionality as needed */}

          <TouchableOpacity style={styles.nextButton} onPress={handlecontinue}>
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    elevation: 3,
    zIndex: 2,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
    marginLeft: 5,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  bookExpertVisit: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#bd2a2a",
  },
  MarqueeContainer: {
    marginBottom: 20, // Increased margin for better spacing
  },
  marqueeText: {
    fontSize: 16,
    color: "green", // Set text color as needed
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  textField: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#bd2a2a",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookExpertVisitCarInspection;
