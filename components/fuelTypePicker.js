import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const fuelTypes = [
  'Petrol',
  'Diesel',
  'Hybrid',
  'CNG',
  'LPG',
  'Electric',
  // Add more fuel types as needed
];

const FuelTypePicker = ({ isVisible, onClose, onSelectFuelType }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            {fuelTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={styles.fuelTypeItem}
                onPress={() => onSelectFuelType(type)}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
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
  fuelTypeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default FuelTypePicker;
