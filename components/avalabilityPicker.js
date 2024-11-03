import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AvailabilityPicker = ({ onSelectAvailability }) => {
  const [selectedAvailabilityType, setSelectedAvailabilityType] = useState('days');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const renderAvailabilityOptions = () => {
    switch (selectedAvailabilityType) {
      case 'days':
        return (
          <ScrollView horizontal={true}>
            <View style={styles.optionsContainer}>
              {[...Array(31).keys()].map(day => (
                <TouchableOpacity
                  key={day}
                  style={[styles.optionButton, selectedOptions.includes(`Day ${day + 1}`) && styles.selectedOption]}
                  onPress={() => toggleOption(`Day ${day + 1}`)}>
                  <Text style={styles.optionText}>Day {day + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      case 'months':
        return (
          <ScrollView horizontal={true}>
            <View style={styles.optionsContainer}>
              {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
                <TouchableOpacity
                  key={month}
                  style={[styles.optionButton, selectedOptions.includes(`Month ${month}`) && styles.selectedOption]}
                  onPress={() => toggleOption(`Month ${month}`)}>
                  <Text style={styles.optionText}>Month {month}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  const renderSelectedOptions = () => {
    return (
      <View style={styles.selectedOptionsContainer}>
        {selectedOptions.map(option => (
          <Text key={option} style={styles.selectedOptionText}>{option}</Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[styles.selectorButton, selectedAvailabilityType === 'days' && styles.selectedSelector]}
          onPress={() => setSelectedAvailabilityType('days')}>
          <Text style={styles.selectorText}>Days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectorButton, selectedAvailabilityType === 'months' && styles.selectedSelector]}
          onPress={() => setSelectedAvailabilityType('months')}>
          <Text style={styles.selectorText}>Months</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Select your car's Availability</Text>
      {renderAvailabilityOptions()}
      <Text style={styles.selectedOptionsLabel}>Selected Availability</Text>
      {renderSelectedOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#ebedf2',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  selectorButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: '#Ac3803',
    borderWidth: 1
  },
  selectedSelector: {
    backgroundColor: '#Ac3803',
  },
  selectorText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOptionText: {
    fontSize: 14,
    color: '#Ac3803',
    fontWeight: 'bold'
  },
  selectedOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedOptionsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black'
  },
});

export default AvailabilityPicker;
