/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const InspectionIncludedComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Left side: Car Image */}
      <Image
        source={require("../../assets/carUpper.jpg")} // Replace with the actual path or URL of your car image
        style={styles.carImage}
      />

      {/* Right side: Titles and Content */}
      <View style={styles.contentContainer}>
        {renderTitleAndContent(
          "Engine",
          "Utilizing a scanning tool connected to the engine to detect any error codes."
        )}
        {renderTitleAndContent(
          "Car Interior",
          "We conduct assesments on various operational car accessories, which encompass air conditioning, horn, seatbelts, locks, warning indicators and additional components."
        )}
        {renderTitleAndContent(
          "Car Accident Damage Check",
          "We employ a paint depth test to identify prior repairs and scruitinize exposed components. Additionally, a visual inspection is conducted to identify any signs of car damaging resulting from accidents."
        )}
        {renderTitleAndContent(
          "Exterior",
          "We perform inspection to detect rust, assess prior body repair, evaluate the condition of panels and examine the suspension system."
        )}
        {renderTitleAndContent(
          "Road Check",
          "We conduct assessments on brake funtionality, engine sound, exaust emissions, road performance, steering and various other aspects."
        )}
        {renderTitleAndContent(
          "Tyres Evaluation",
          "We examine the tyres tread depth on your vehicle and we also compare tyre sizes as needed."
        )}
        {renderTitleAndContent(
          "In Case of Hybrid Car",
          "We check hybrid system and hybrid battery percentage."
        )}
      </View>
    </ScrollView>
  );
};

// Helper function to render title and content
const renderTitleAndContent = (title, content) => (
  <View style={styles.titleContentContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // padding: 2,
    marginRight: 10,
  },
  carImage: {
    width: 150,
    height: 750, // Adjust the height as needed
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
  },
  titleContentContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#bd2a2a",
  },
  content: {
    fontSize: 12,
    color: "grey",
  },
});

export default InspectionIncludedComponent;
