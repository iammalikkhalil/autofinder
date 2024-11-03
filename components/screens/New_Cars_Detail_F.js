import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function New_Cars_Detail_F() {
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
  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <Text style={styles.AnswerName}>
          <AntDesign name="checkcircle" size={19} color="green" />
        </Text>
      ) : (
        <Text style={styles.AnswerName}>
          <AntDesign name="closecircle" size={19} color="red" />
        </Text>
      );
    }
    return <Text style={styles.AnswerName}>{value}</Text>;
  };
  // Body
  return (
    <View style={styles.container}>
      {/* ----- Box 1: Safety ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(1)}>
        <Text style={styles.Question_Txt_1}>Safety</Text>
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
            <Text style={styles.AnswerHeading}>Number of Airbags</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.noOfAirbags)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.noOfAirbags)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Number of Seatbelts</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.noOfSeatbelts)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.noOfSeatbelts)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Driver Seat Belt Warning</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.driverSeatBeltWarning)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.driverSeatBeltWarning)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>
              Passenger Seat Belt Warning
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.safety?.passengerSeatBeltWarning
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.safety?.passengerSeatBeltWarning
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Door Ajar Warning</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.doorAjarWarning)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.doorAjarWarning)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Adjustable Seats</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.adjustableSeats)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.adjustableSeats)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Vehicle Stability Control</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.safety?.vehicleStabilityControl
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.safety?.vehicleStabilityControl
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Traction Control</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.tractionControl)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.tractionControl)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Hill Start Assist Control</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.safety?.hillStartAssistControl
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.safety?.hillStartAssistControl
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Hill Descent Control</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.hillDescentControl)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.hillDescentControl)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Child Safety Lock</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.childSafetyLock)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.childSafetyLock)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>
              Speed Sensing Auto Door Lock
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.safety?.speedSensingAutoDoorLock
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.safety?.speedSensingAutoDoorLock
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Anti Lock Braking System</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.antiLockBrakingSystem)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.antiLockBrakingSystem)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Brake Assist</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.brakeAssist)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.brakeAssist)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>
              Electronic Brake Force Distribution
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.safety?.electronicBrakeForceDistribution
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.safety?.electronicBrakeForceDistribution
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Brake Override System</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.safety?.brakeOverrideSystem)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.safety?.brakeOverrideSystem)}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 2: Exterior ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(2)}>
        <Text style={styles.Question_Txt_1}>Exterior</Text>
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
            <Text style={styles.AnswerHeading}>Alloy Wheels</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.alloyWheels)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.alloyWheels)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>
              Colored Outside Door Handles
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.exterior?.coloredOutsideDoorHandles
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.exterior?.coloredOutsideDoorHandles
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Body Colored Bumpers</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.bodyColoredBumpers)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.bodyColoredBumpers)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Sun Roof</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.sunRoof)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.sunRoof)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Moon Roof</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.moonRoof)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.moonRoof)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Fog Lamps</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.fogLamps)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.fogLamps)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Roof Rail</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.roofRail)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.roofRail)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Side Steps</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.sideSteps)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.sideSteps)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Adjustable Headlights</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.exterior?.adjustableHeadlights
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.exterior?.adjustableHeadlights
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Daytime Running Lights</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.exterior?.daytimeRunningLights
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.exterior?.daytimeRunningLights
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Headlight Washer</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.headlightWasher)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.headlightWasher)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Xenon Headlamps</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.xenonHeadlamps)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.xenonHeadlamps)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Spoiler</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.rearSpoiler)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.rearSpoiler)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Wiper</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.exterior?.rearWiper)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.exterior?.rearWiper)}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 3: Instrumentation ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(3)}>
        <Text style={styles.Question_Txt_1}>Instrumentation</Text>
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
            <Text style={styles.AnswerHeading}>Tachometer</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.instrumentation?.tachometer)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.instrumentation?.tachometer)}
            </Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Information Cluster</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.instrumentation?.informationCluster
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.instrumentation?.informationCluster
              )}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 4: Infotainment ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(4)}>
        <Text style={styles.Question_Txt_1}>Infotainment</Text>
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
            <Text style={styles.AnswerHeading}>CD Player</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.cdPlayer)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.cdPlayer)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>DVD Player</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.dvdPlayer)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.dvdPlayer)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Number of Speakers</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.infotainment?.numberOfSpeakers
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.infotainment?.numberOfSpeakers
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Speakers</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.frontSpeakers)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.frontSpeakers)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Speakers</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.rearSpeakers)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.rearSpeakers)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Bluetooth Connectivity</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.infotainment?.bluetoothConnectivity
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.infotainment?.bluetoothConnectivity
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>USB and Auxiliary Cable</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.infotainment?.usbAndAuxiliaryCable
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.infotainment?.usbAndAuxiliaryCable
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Seat Entertainment</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.infotainment?.rearSeatEntertainment
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.infotainment?.rearSeatEntertainment
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Android Auto</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.androidAuto)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.androidAuto)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Apple CarPlay</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.appleCarPlay)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.appleCarPlay)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Touchscreen</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.infotainment?.touchscreen)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.infotainment?.touchscreen)}
            </Text>
          </View>
        </View>
      )}

      {/* ----- Box 5: Comfort and Convenience ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(5)}>
        <Text style={styles.Question_Txt_1}>Comfort & Convenience</Text>
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
            <Text style={styles.AnswerHeading}>Air Conditioner</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.airConditioner
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.airConditioner
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Climate Control</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.climateControl
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.climateControl
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Air Purifier</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.airPurifier
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.airPurifier
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear AC Vents</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.rearAcVents
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.rearAcVents
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Heater</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.rearHeater
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.rearHeater
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Heated Seats</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.heatedSeats
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.heatedSeats
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Seat Ventilation</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.frontSeatVentilation
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.frontSeatVentilation
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Seat Ventilation</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.rearSeatVentilation
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.rearSeatVentilation
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Remote Controlled Boot</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.remoteControlledBoot
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.remoteControlledBoot
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Navigation System</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.navigationSystem
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.navigationSystem
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Keyless Entry</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.keylessEntry
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.keylessEntry
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Push Button Start</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.pushButtonStart
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.pushButtonStart
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Central Locking</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.centralLocking
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.centralLocking
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Cruise Control</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.cruiseControl
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.cruiseControl
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Parking Sensors</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.parkingSensors
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.parkingSensors
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Parking Camera</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.parkingCamera
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.parkingCamera
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Auto Rain Sensing Wipers</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.autoRainSensingWipers
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.autoRainSensingWipers
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Auto Headlamps</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.autoHeadlamps
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.autoHeadlamps
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Windows</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.powerWindows
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.powerWindows
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Steering</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.powerSteering
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.powerSteering
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Door Locks</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.powerDoorLocks
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.powerDoorLocks
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Folding Mirrors</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.powerFoldingMirrors
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.powerFoldingMirrors
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Wiper</Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[0]?.features?.comfortConvenience?.rearWiper)}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(carData[1]?.features?.comfortConvenience?.rearWiper)}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Defogger</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.rearDefogger
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.rearDefogger
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Follow Me Home Headlamps</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.followMeHomeHeadlamps
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.followMeHomeHeadlamps
              )}
            </Text>
          </View>

          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Headlamp Beam Adjuster</Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[0]?.features?.comfortConvenience?.headlampBeamAdjuster
              )}
            </Text>
            <Text style={styles.AnswerName}>
              {renderValue(
                carData[1]?.features?.comfortConvenience?.headlampBeamAdjuster
              )}
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
    letterSpacing: 2,
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
    width: "38%",
    padding: 2,
    fontSize: 12,
    fontFamily: "Kanit",
  },
  AnswerName: {
    // borderWidth: 0.5,
    width: "31%",
    padding: 2,
    textAlign: "center",
    color: "grey",
    fontSize: 12,
    fontFamily: "Kanit",
  },
});
