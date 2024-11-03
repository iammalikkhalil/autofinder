import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ManagedByAutoFinder from "./screens/managedByAutoFinder";

const BookNowCards = ({
  carImage,
  brand,
  model,
  variant,
  price,
  year,
  fuelType,
  driverAvailabilty,
  location,
  isInspected,
  isFeatured,
  isManagedByAutoFinder,
}) => {
  useEffect(() => {
    console.log(typeof carImage);
  }, []);

  const cardStyle = {
    ...(isInspected || isManagedByAutoFinder
      ? {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      : {}), // Apply bottom border radius conditionally
  };
  const additionalCard = {
    ...(isInspected || isManagedByAutoFinder
      ? {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }
      : {}),
  };

  let additionalInfo = null;

  if (isInspected || isManagedByAutoFinder) {
    additionalInfo = (
      <View style={[styles.additionalInfoContainer, additionalCard]}>
        {isInspected && (
          <View style={styles.additionalInfoItem}>
            <Image
              source={require("../assets/inspected.png")}
              style={styles.additionalInfoIcon}
            />
            <Text style={styles.additionalInfoText}>Inspected</Text>
            <Text style={styles.additionalInfoSubtext}> 8/10</Text>
          </View>
        )}
        {isManagedByAutoFinder && (
          <View style={styles.additionalInfoItem}>
            <Image
              source={require("../assets/fuelIcon.png")}
              style={styles.additionalInfoIcon}
            />
            <Text style={styles.additionalInfoText}>Managed by AutoFinder</Text>
          </View>
        )}
      </View>
    );
  }

  const source = { uri: carImage };

  return (
    <View>
      <View style={[styles.card, cardStyle]}>
        {isFeatured && (
          <Image
            source={require("../assets/featured.png")}
            style={styles.featuredIcon}
          />
        )}
        <View style={styles.imageContainer}>
          <Image source={source} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{`${brand}, ${model}`}</Text>
          <Text style={styles.variant}>{variant}</Text>
          <Text style={styles.price}>Rs. {price}/day</Text>

          {/* Upper view */}
          <View style={styles.upperView}>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/modelYear.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{year}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/driver.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{driverAvailabilty}</Text>
            </View>
          </View>

          {/* Lower view */}
          <View style={styles.lowerView}>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/fuelIcon.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{fuelType}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Image
                source={require("../assets/locationIcon.png")}
                style={styles.infoImage}
              />
              <Text style={styles.infoText}>{location}</Text>
            </View>
          </View>

          {/* //////////////////////////////////////////// */}

          {/* //////////////////////////////////////////// */}
        </View>
      </View>
      {/* Render additional info if available */}
      {additionalInfo}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: 100,
    marginRight: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    // marginTop: 20,
  },
  featuredIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bd2a2a",
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  upperView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  additionalInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  additionalInfoIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginLeft: 5,
  },
  additionalInfoText: {
    fontSize: 12,
    color: "#2e8b57",
  },
  additionalInfoSubtext: {
    fontSize: 14,
    color: "#bd2a2a",
    fontWeight: "bold",
  },
});

export default BookNowCards;
