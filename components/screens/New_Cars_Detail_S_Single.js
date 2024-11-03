import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

export default function New_Cars_Detail_S_Single() {
  const route = useRoute();
  const { item } = route.params;

  const [openBoxIndex, setOpenBoxIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenBoxIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  // --- API Data ---
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      const car1Make = await AsyncStorage.getItem("car1Make");
      const car2Make = await AsyncStorage.getItem("car2Make");

      if (!car1Make || !car2Make) {
        console.error("No car makes found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://autofinder-backend.vercel.app/api/newCar"
        );
        const data = await response.json();

        // Filter data based on makes
        const filteredData = data.data.filter(
          (car) => car.make === car1Make || car.make === car2Make
        );

        setCarData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car data", error);
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);
  // --- API Data ---
  // Body
  return (
    <View style={styles.container}>
      {/* ----- Box 2: Key Specifications ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(7)}>
        <Text style={styles.Question_Txt_1}>Key Specifications</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 7 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 7 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Body Type</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.bodyType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Dimensions</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.dimensions}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Ground Clearance</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.groundClearance}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Horse Power</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.horsePower}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Boot Space</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.bootSpace}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Fuel Type</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.fuelType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Battery Capacity</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.batteryCapacity || "N/A"}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Charging Time</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.chargingTime || "N/A"}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Top Speed</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.topSpeed}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Range</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.range || "N/A"}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Transmission</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.transmission}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Kerb Weight</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.kerbWeight}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Seating Capacity</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.seatingCapacity}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Tyre Size</Text>
            <Text style={styles.AnswerName}>
              {item.keySpecifications?.tyreSize}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 1: Dimensions ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(1)}>
        <Text style={styles.Question_Txt_1}>Dimensions</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 1 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 1 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Overall Length</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.overallLength}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Overall Width</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.overallWidth}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Overall Height</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.overallHeight}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Wheel Base</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.wheelBase}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Ground Clearance</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.groundClearance}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Kerb Weight</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.kerbWeight}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Boot Space</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.bootSpace}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Seating Capacity</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.seatingCapacity}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>No of Doors</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.dimensions?.noOfDoors}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 2: Engine Motor ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(2)}>
        <Text style={styles.Question_Txt_1}>Engine Motor</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 2 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 2 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Engine Type</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.engineMotor?.engineType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Battery Type</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.engineMotor?.batteryType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Battery Capacity</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.engineMotor?.batteryCapacity}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Range</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.engineMotor?.range}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Max Speed</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.engineMotor?.maxSpeed}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.engineMotor?.power}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 3: Transmission ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(3)}>
        <Text style={styles.Question_Txt_1}>Transmission</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 3 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 3 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Transmission Type</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.transmission?.transmissionType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Gearbox</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.transmission?.gearbox}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 4: Steering ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(4)}>
        <Text style={styles.Question_Txt_1}>Steering</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 4 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 4 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Steering Type</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.steering?.steeringType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Assisted</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.steering?.powerAssisted}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Turning Radius</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.steering?.minimumTurningRadius}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 5: Suspension Brakes ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(5)}>
        <Text style={styles.Question_Txt_1}>Suspension Brakes</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 5 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 5 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Suspension</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.suspensionBrakes?.frontSuspension}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Suspension</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.suspensionBrakes?.rearSuspension}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Brakes</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.suspensionBrakes?.frontBrakes}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Brakes</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.suspensionBrakes?.rearBrakes}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 6: Wheels Tyres ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(6)}>
        <Text style={styles.Question_Txt_1}>Wheels Tyres</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={
              openBoxIndex === 6 ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="white"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 6 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Wheel Type</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.wheelsTyres?.wheelType}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Wheel Size</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.wheelsTyres?.wheelSize}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Tyre Size</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.wheelsTyres?.tyreSize}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Spare Tyre</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.wheelsTyres?.spareTyre}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>PCD</Text>
            <Text style={styles.AnswerName}>
              {item.specifications?.wheelsTyres?.pcd}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
  },
  Question: {
    borderWidth: 0.5,
    borderColor: "white",
    paddingVertical: 1,
    paddingHorizontal: 10,
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 10,
    elevation: 5,
  },
  Question_Txt_1: {
    // borderWidth: 0.5,
    paddingTop: 9,
    paddingRight: 5,
    paddingLeft: 8,
    // fontWeight: "bold",
    fontSize: 14.5,
    letterSpacing: 2.1,
    width: "80%",
    color: "white",
    fontFamily: "Kanit",
  },
  Question_Txt_2: {
    // borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "20%",
    textAlign: "center",
  },
  Answer: {
    borderWidth: 0.5,
    borderColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 3,
    // backgroundColor: "#FFE7E7",
    backgroundColor: "white",
    marginTop: 2,
    marginBottom: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
  },
  AnswerRow: {
    // borderWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 1,
    flexDirection: "row",
    marginVertical: 1,
  },
  AnswerHeading: {
    // borderWidth: 0.5,
    paddingLeft: 10,
    width: "50%",
    padding: 2,
    fontSize: 13,
    fontFamily: "Kanit",
  },
  AnswerName: {
    // borderWidth: 0.5,
    width: "50%",
    padding: 2,
    textAlign: "center",
    color: "#bc0000",
    fontSize: 13,
    fontFamily: "Kanit",
  },
});
