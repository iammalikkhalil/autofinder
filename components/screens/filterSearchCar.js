import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import LocationPicker from "../locationPicker";
import RegisteredPicker from "../registeredPicker";
import InputRange from "../inputRange";
import BodyColorPicker from "../bodyColor";
import FuelTypePicker from "../fuelTypePicker";
import BikeBrandPicker from "../carBrandFilter";
import BikeEnginePicker from "../engineCapacityPicker";
// New
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// Fonts
import { useFonts } from "expo-font";

const FilterSearchCar = ({ route, navigation }) => {
  const { onFilterApply } = route.params;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);
  const [minKmDriven, setMinKmDriven] = useState(0);
  const [maxKmDriven, setMaxKmDriven] = useState(1000000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRegisteredLocation, setSelectedRegisteredLocation] =
    useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [registeredModalVisible, setRegisteredModalVisible] = useState(false);
  const [bodyColorModalVisible, setBodyColorModalVisible] = useState(false);
  const [fuelTypeModalVisible, setFuelTypeModalVisible] = useState(false);
  const [bikeBrandModalVisible, setBikeBrandModalVisible] = useState(false);
  const [bikeEngineModalVisible, setBikeEngineModalVisible] = useState(false);

  const handleApplyFilter = () => {
    const data = {
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minKmDriven,
      maxKmDriven,
      selectedLocation,
      selectedRegisteredLocation,
      selectedColor,
      selectedFuelType,
      selectedEngineType,
      selectedBrand,
    };
    onFilterApply(data);
    navigation.goBack();
  };

  const handlePriceRange = (minValue, maxValue) => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  };

  const handleYearRange = (minValue, maxValue) => {
    setMinYear(minValue);
    setMaxYear(maxValue);
  };

  const handleKmDrivenRange = (minValue, maxValue) => {
    setMinKmDriven(minValue);
    setMaxKmDriven(maxValue);
  };

  const handleOpenLocationPicker = () => {
    setLocationModalVisible(true);
  };
  const handleCloseLocationPicker = () => {
    setLocationModalVisible(false);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleCloseLocationPicker();
  };

  const handleOpenRegisteredPicker = () => {
    setRegisteredModalVisible(true);
  };
  const handleCloseRegisteredPicker = () => {
    setRegisteredModalVisible(false);
  };
  const handleRegisteredSelect = (location) => {
    setSelectedRegisteredLocation(location);
    handleCloseRegisteredPicker();
  };

  const handleOpenBodyColorPicker = () => {
    setBodyColorModalVisible(true);
  };
  const handleCloseBodyColorPicker = () => {
    setBodyColorModalVisible(false);
  };
  const handleBodyColorSelect = (color) => {
    setSelectedColor(color);
    handleCloseBodyColorPicker();
  };

  const handleOpenFuelTypePicker = () => {
    setFuelTypeModalVisible(true);
  };
  const handleCloseFuelTypePicker = () => {
    setFuelTypeModalVisible(false);
  };
  const handleFuelTypeSelect = (fuelType) => {
    setSelectedFuelType(fuelType);
    handleCloseFuelTypePicker();
  };

  const handleOpenBikeBrandPicker = () => {
    setBikeBrandModalVisible(true);
  };
  const handleCloseBikeBrandPicker = () => {
    setBikeBrandModalVisible(false);
  };
  const handleBikeBrandSelect = (brand) => {
    setSelectedBrand(brand);
    handleCloseBikeBrandPicker();
  };

  const handleOpenBikeEnginePicker = () => {
    setBikeEngineModalVisible(true);
  };
  const handleCloseBikeEnginePicker = () => {
    setBikeEngineModalVisible(false);
  };
  const handleBikeEngineSelect = (engine) => {
    setSelectedEngineType(engine);
    handleCloseBikeEnginePicker();
  };

  const handleBack = () => {
    navigation.goBack();
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/My_Soul/Kanit-Black.ttf"),
  });
  // It Will Load Font
  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    }
  }, [loaded]);
  // It Tells If Font Is Loaded Or If Not Loaded Then Nothing Will Show,
  if (!fontsLoaded) {
    return null;
  }
  // --- Fonts Family ---
  // Main Body
  return (
    <ScrollView style={styles.filter}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Car Filter</Text>
        </View>
      </View>

      {/* ---- Filter Body --- */}

      {/* Image */}
      <View style={styles.My_Parent_Img}>
        <Image
          source={require("../../assets/car.jpg")}
          style={styles.My_Parent_Img_Box}
        />
        <Text style={styles.My_Parent_Img_Txt}>Car Filter</Text>
      </View>

      {/* 1 - New Price */}
      <Text style={[styles.My_Btn_Opt_Parent_Grand_Txt, { paddingBottom: 10 }]}>
        1 - Price :
      </Text>
      <View style={styles.InputRangeDiv}>
        <View style={styles.InputRangeDiv_Parent}>
          <View style={styles.My_Btn_Opt_Parent_Box}>
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              {/* <Entypo name="location-pin" size={24} color="#BC0000" /> */}
              <MaterialCommunityIcons name="cash" size={24} color="#BC0000" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Use Price Below</Text>
          </View>
          <InputRange
            min={0}
            max={1000000}
            title={"Price Range"}
            steps={1}
            onValueChange={handlePriceRange}
            style={styles.Input_Range_CSS}
          />
        </View>
        <View style={styles.values}>
          <Text style={styles.values_1}>{minPrice.toLocaleString()}</Text>
          <Text style={styles.values_2}>{maxPrice.toLocaleString()}</Text>
        </View>
      </View>

      {/* 2 - New Year */}
      <Text style={[styles.My_Btn_Opt_Parent_Grand_Txt, { paddingBottom: 10 }]}>
        2 - Year :
      </Text>
      <View style={styles.InputRangeDiv}>
        <View style={styles.InputRangeDiv_Parent}>
          <View style={styles.My_Btn_Opt_Parent_Box}>
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              {/* <Entypo name="calendar" size={24} color="#BC0000" /> */}
              <MaterialCommunityIcons
                name="calendar-month"
                size={24}
                color="#BC0000"
              />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Use Year Below</Text>
          </View>
          <InputRange
            min={2000}
            max={2024}
            title={"Year Range"}
            steps={1}
            onValueChange={handleYearRange}
            style={styles.Input_Range_CSS}
          />
        </View>
        <View style={styles.values}>
          <Text style={styles.values_1}>{minYear}</Text>
          <Text style={styles.values_2}>{maxYear}</Text>
        </View>
      </View>

      {/* 3 - New Kilometer Driven */}
      <Text style={[styles.My_Btn_Opt_Parent_Grand_Txt, { paddingBottom: 10 }]}>
        3 - Kilometer Driven :
      </Text>
      <View style={styles.InputRangeDiv}>
        <View style={styles.InputRangeDiv_Parent}>
          <View style={styles.My_Btn_Opt_Parent_Box}>
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              {/* <Entypo name="calendar" size={24} color="#BC0000" /> */}
              <MaterialCommunityIcons name="car" size={24} color="#BC0000" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Use Range Below</Text>
          </View>
          <InputRange
            min={0}
            max={1000000}
            title={"Kilometers Driven"}
            steps={1}
            onValueChange={handleKmDrivenRange}
            style={styles.Input_Range_CSS}
          />
        </View>
        <View style={styles.values}>
          <Text style={styles.values_1}>{minKmDriven.toLocaleString()}</Text>
          <Text style={styles.values_2}>{maxKmDriven.toLocaleString()}</Text>
        </View>
      </View>

      {/* New Location Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>4 - Location :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box_1}
            onPress={handleOpenLocationPicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <Entypo name="location-pin" size={24} color="#BC0000" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Choose Location</Text>
          </TouchableOpacity>
        </View>
        <LocationPicker
          isVisible={locationModalVisible}
          onClose={handleCloseLocationPicker}
          onSelectLocation={handleLocationSelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedLocation}</Text>
      </View>

      {/* New Registered Location Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>
        5 - Registered Location :
      </Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box_1}
            onPress={handleOpenRegisteredPicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <MaterialCommunityIcons
                name="registered-trademark"
                size={24}
                color="#BC0000"
              />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>
              Choose Register Location
            </Text>
          </TouchableOpacity>
        </View>
        <RegisteredPicker
          isVisible={registeredModalVisible}
          onClose={handleCloseRegisteredPicker}
          onSelectCity={handleRegisteredSelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedRegisteredLocation}</Text>
      </View>

      {/* New Color Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>6 - Body Color :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box_1}
            onPress={handleOpenBodyColorPicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <MaterialCommunityIcons
                name="invert-colors"
                size={24}
                color="#BC0000"
              />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>
              Choose Body Color
            </Text>
          </TouchableOpacity>
        </View>
        <BodyColorPicker
          isVisible={bodyColorModalVisible}
          onClose={handleCloseBodyColorPicker}
          onSelectColor={handleBodyColorSelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedColor}</Text>
      </View>

      {/* New Fuel Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>7 - Fuel Type :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box_1}
            onPress={handleOpenFuelTypePicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <MaterialCommunityIcons
                name="gas-station"
                size={24}
                color="#BC0000"
              />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Choose Fuel Type</Text>
          </TouchableOpacity>
        </View>
        <FuelTypePicker
          isVisible={fuelTypeModalVisible}
          onClose={handleCloseFuelTypePicker}
          onSelectFuelType={handleFuelTypeSelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedFuelType}</Text>
      </View>

      {/* New Brand Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>8 - Brand :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box_1}
            onPress={handleOpenBikeBrandPicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <MaterialCommunityIcons name="car" size={24} color="#BC0000" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Choose Brand</Text>
          </TouchableOpacity>
        </View>
        <BikeBrandPicker
          isVisible={bikeBrandModalVisible}
          onClose={handleCloseBikeBrandPicker}
          onSelectBrand={handleBikeBrandSelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedBrand}</Text>
      </View>

      {/* New Engine Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>9 - Engine Type :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box_1}
            onPress={handleOpenBikeEnginePicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <MaterialCommunityIcons name="engine" size={24} color="#BC0000" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>
              Choose Engine Type
            </Text>
          </TouchableOpacity>
        </View>
        <BikeEnginePicker
          isVisible={bikeEngineModalVisible}
          onClose={handleCloseBikeEnginePicker}
          onSelectCapacity={handleBikeEngineSelect} // Corrected prop name
        />
        <Text style={styles.Below_Name_Txt}>{selectedEngineType}</Text>
      </View>

      {/* Buttons */}
      {/* Apply Btn */}
      <View style={styles.My_Btn_Parent}>
        <TouchableOpacity
          style={styles.My_Btn_Parent_Box}
          onPress={handleApplyFilter}
        >
          <Text style={styles.My_Btn_Parent_Box_Txt}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
      {/* Cancel Btn */}
      <View style={styles.My_Btn_Parent}>
        <TouchableOpacity
          style={styles.My_Btn_Parent_Box_2}
          onPress={() => {
            setMinPrice(0);
            setMaxPrice(1000000);
            setMinYear(2000);
            setMaxYear(2024);
            setMinKmDriven(0);
            setMaxKmDriven(1000000);
            setSelectedLocation("");
            setSelectedRegisteredLocation("");
            setSelectedColor("");
            setSelectedFuelType("");
            setSelectedEngineType("");
            setSelectedBrand("");
          }}
        >
          <Text style={styles.My_Btn_Parent_Box_Txt_1}>Remove Filter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filter: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    marginBottom: 30,
  },
  backButton: {
    marginLeft: 5,
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
    paddingVertical: 10,
  },
  InputRangeDiv: {
    marginBottom: 25,
  },
  DataDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
    marginHorizontal: 20,
  },
  ButtonDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
    marginHorizontal: 20,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  values_1: {
    paddingVertical: 1,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  values_2: {
    paddingVertical: 1,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  // New CSS
  My_Btn_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  My_Btn_Parent_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#BC0000",
  },
  My_Btn_Parent_Box_2: {
    borderWidth: 0.5,
    borderColor: "#BC0000",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "white",
    marginBottom: 30,
  },
  My_Btn_Parent_Box_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 5,
    borderRadius: 30,
    textAlign: "center",
    letterSpacing: 3,
    color: "white",
    fontSize: 18,
    fontFamily: "Kanit",
  },
  My_Btn_Parent_Box_Txt_1: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 5,
    borderRadius: 30,
    textAlign: "center",
    letterSpacing: 3,
    color: "#BC0000",
    fontSize: 18,
    fontFamily: "Kanit",
  },
  My_Btn_Opt_Parent_Grand_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 16,
    letterSpacing: 0.8,
    fontSize: 16,
    color: "grey",
    fontFamily: "Kanit",
  },
  My_Btn_Opt_Parent_Grand: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 2,
    paddingBottom: 15,
    paddingHorizontal: 0,
  },
  My_Btn_Opt_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 10,
    paddingBottom: 3,
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  My_Btn_Opt_Parent_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 1,
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  My_Btn_Opt_Parent_Box_1: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 1,
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    width: "100%",
  },
  My_Btn_Opt_Parent_Txt_1: {
    borderWidth: 0.5,
    borderColor: "#BC0000",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  My_Btn_Opt_Parent_Txt_2: {
    width: "70%",
    borderWidth: 0.5,
    borderColor: "#BC0000",
    paddingVertical: 9,
    paddingHorizontal: 20,
    letterSpacing: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    fontSize: 14,
    // backgroundColor: "#FFD1D1",
    fontFamily: "Kanit",
  },
  Below_Name_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 3,
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.8,
    fontFamily: "Kanit",
  },
  My_Parent_Img: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 30,
    paddingBottom: 40,
  },
  My_Parent_Img_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: 90,
    height: 90,
    // tintColor: "#bd2a2a",
    alignSelf: "center",
  },
  My_Parent_Img_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    fontSize: 23,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 25,
    letterSpacing: 2,
    fontFamily: "HeeboExtra",
  },
});

export default FilterSearchCar;
