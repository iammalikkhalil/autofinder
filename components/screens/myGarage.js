/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import navigation hook from react-navigation

const MyGarage = () => {
  const navigation = useNavigation(); // Use the navigation hook

  const handleBack = () => {
    navigation.goBack(); // Go back when the back button is pressed
  };
  const handleParkMyRide = () => {
    // Add your logic or navigation code for handling the "Park My Ride" button press here
    console.log('Park My Ride button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require('../../assets/back-arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Garage</Text>
        </View>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My garage!..</Text>
      </View>

      <View style={styles.backgroundView}>
        <Image
          source={require('../../assets/cargaragee.png')}
          style={styles.centeredImage}
        />
        <Text style={styles.parkYourRideText}>Park your ride here</Text>
        <Text style={styles.additionalText}>
          You can log history of maintenance, buy auto parts, and do much more.
        </Text>
        <TouchableOpacity
          style={styles.parkMyRideButton}
          onPress={handleParkMyRide}>
          <Text style={styles.parkMyRideButtonText}>Park My Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'darkred',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    paddingRight: 20,
    tintColor: 'white',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingContainer: {
    backgroundColor: 'white',
    padding: 30,
  },
  heading: {
    color: 'firebrick',
    fontSize: 36,
    fontWeight: 'bold',
  },
  backgroundView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  centeredImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 60,
  },
  parkYourRideText: {
    color: 'firebrick',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 80, // More margin from the top
    marginLeft: -130, // Margin from the left of the screen
  },
  additionalText: {
    color: 'firebrick',
    fontSize: 16,
    // fontWeight: 'bold',
    // textAlign: 'center',
    marginTop: 2,
    marginLeft: 20,
    marginRight: 100,
  },
  parkMyRideButton: {
    backgroundColor: 'white',
    padding: 15,
    paddingLeft: 130,
    paddingRight: 130,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkred',
    marginLeft: 10,
    marginRight: 10,
  },
  parkMyRideButtonText: {
    color: 'firebrick',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyGarage;

