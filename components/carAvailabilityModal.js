import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

const CarAvailabilityModel = ({ isVisible, onClose, onSave }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    onSave(selectedDays);
    setSelectedDays([]);
    onClose();
  };

  // Function to get number of days in current month
  const getDaysInMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Function to get current month name
  const getMonthName = () => {
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();
    return months[date.getMonth()];
  };

  // Array of days in current month
  const daysInCurrentMonth = Array.from({ length: getDaysInMonth() }, (_, index) => index + 1);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Select Days in {getMonthName()}</Text>
          <ScrollView
            contentContainerStyle={styles.daysScrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.daysContainer}>
              {daysInCurrentMonth.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDays.includes(day) && styles.selectedDayButton,
                  ]}
                  onPress={() => handleDaySelection(day)}
                >
                  <Text>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "83%",
    maxHeight: height * 0.75, // Adjusting the modal height
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    // borderWidth: 0.5,
    marginTop: 50,
    marginBottom: 20,
  },
  daysScrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  dayButton: {
    borderWidth: 0.5,
    borderColor: "black",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedDayButton: {
    backgroundColor: "lightblue",
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CarAvailabilityModel;
