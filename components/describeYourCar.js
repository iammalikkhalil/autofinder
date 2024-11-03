import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const suggestions = [
  'Alloy Rims',
  'Sunroof',
  'Leather Seats',
  'Navigation System',
  'Fog Lights',
  'Cruise Control',
  'Air Conditioning',
  'Bluetooth Connectivity',
  'Keyless Entry',
  'Power Windows',
  'Power Steering',
  'Army Officer Car',
  'Auction Sheet Available',
  'Bumper-to-Bumper Original',

];

const DescribeYourCar = ({ isVisible, onClose, onDone }) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  const handleOptionPress = (option) => {
    if (selectedSuggestions.includes(option)) {
      setSelectedSuggestions((prevOptions) => prevOptions.filter((item) => item !== option));
    } else {
      setSelectedSuggestions((prevOptions) => [...prevOptions, option]);
    }
  };

  const handleDone = () => {
    onDone(selectedSuggestions);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            {suggestions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.option, selectedSuggestions.includes(option) && styles.selectedOption]}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 350,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: 'green',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'red',
    fontSize: 18,
  },
});

export default DescribeYourCar;
