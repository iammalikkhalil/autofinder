import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";

// const carModelsData = [
//   {
//     year: "2020",
//     brands: [
//       {
//         name: "Toyota",
//         model: [
//           {
//             name: "Corolla",
//             varient: [
//               {
//                 name: "1.5t",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

// Add more years, brands, and variants as needed
// ];

const CarModelPicker = ({
  isVisible,
  onClose,
  onSelectYear,
  onSelectBrand,
  onSelectVariant,
  onSelectModel,
}) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [yearsData, setYearsData] = useState("");
  const [brandsData, setBrandsData] = useState("");
  const [modelsData, setModelsData] = useState("");
  const [brandId, setBrandId] = useState("");
  const [varientData, setVarientData] = useState("");
  const [modelId, setModelId] = useState("");

  const getYearData = async () => {
    try {
      const response = await axios.get("https://autofinder-backend.vercel.app/api/year/");
      // console.log(response.data.data)
      setYearsData(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getBrandData = async () => {
    try {
      const response = await axios.get("https://autofinder-backend.vercel.app/brands");
      // console.log(response.data)
      setBrandsData(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getModelData = async () => {
    console.log(brandId);
    try {
      const response = await axios.get(
        `https://autofinder-backend.vercel.app/Model/${brandId}`
      );
      // console.log(response.data)
      setModelsData(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getVariantData = async () => {
    try {
      const response = await axios.get(
        `https://autofinder-backend.vercel.app/varient/${modelId}`
      );
      // console.log("THIisssssssss",response.data.products)
      setVarientData(response.data.products);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getYearData();
    getBrandData();
  }, []);

  useEffect(() => {
    setSelectedYear("");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedVariant("");
  }, [isVisible]);

  useEffect(() => {
    getModelData();
  }, [brandId]);

  useEffect(() => {
    getVariantData();
  }, [modelId]);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setSelectedBrand("");
    setSelectedVariant("");
    setSelectedBrand("");
    setSelectedVariant("");
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand.name);
    setBrandId(brand._id);
    console.log(brand._id);
  };
  const handleModelSelect = (model) => {
    setSelectedModel(model.name);
    setModelId(model._id);
    setSelectedVariant("");
  };
  const handleVariantSelect = (variant) => {
    if (variant === "Other") {
      onClose(); // Close the modal if "Other" is selected
      onSelectYear(selectedYear);
      onSelectBrand(selectedBrand);
      onSelectModel(selectedModel);
      onSelectVariant("");
      return;
    }
    setSelectedVariant(variant);
    onSelectYear(selectedYear);
    onSelectBrand(selectedBrand);
    onSelectModel(selectedModel);
    // onSelectModel(selectedModel);
    onSelectVariant(variant);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* <ScrollView> */}
          {selectedYear === "" && (
            <>
              <Text style={styles.headerText}>Select Year</Text>
              <FlatList
                data={yearsData}
                keyExtractor={(item) => item.year}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleYearSelect(item.year)}
                  >
                    <Text>{item.year}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
          {selectedYear !== "" && selectedBrand === "" && (
            <>
              <Text style={styles.headerText}>Select Brand</Text>
              <FlatList
                data={brandsData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleBrandSelect(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {selectedBrand !== "" && selectedModel === "" && (
            <>
              <Text style={styles.headerText}>Select Model</Text>
              <FlatList
                data={modelsData} // Add a check for undefined before accessing models
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleModelSelect(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {selectedModel !== "" && (
            <>
              <Text style={styles.headerText}>Select Variant</Text>
              <FlatList
                data={[...varientData, { name: "Other" }]}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleVariantSelect(item.name)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {/* {selectedModel !== "" && (
            <>
              <Text style={styles.headerText}>Select Variant</Text>
              <FlatList
                data={varientData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleVariantSelect(item.name)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )} */}

          {/* </ScrollView> */}
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
    justifyContent: "flex-end",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 350,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomColor: "#ccc",
  },
  closeButton: {
    alignItems: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default CarModelPicker;
