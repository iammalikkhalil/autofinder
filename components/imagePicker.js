import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
// Fonts
import { useFonts } from "expo-font";

const ImagePickerComponent = ({ onSelectedImagesBase64Change }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImagesBase64, setSelectedImagesBase64] = useState([]);

  const handleChooseImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access photo library was denied");
        return;
      }
      ////////////////////////////////////////////////////////////////////////
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        multiple: true,
      });

      console.log("Image picker result:", result);

      if (!result.cancelled && result.assets.length > 0) {
        const imageUris = [];
        const base64Images = [];
        for (const asset of result.assets) {
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          // console.log("Base64 representation of image:", base64);
          const base64Image = `data:image/jpg;base64,${base64}`;
          imageUris.push(asset.uri);
          base64Images.push(base64Image);
        }
        // const imageUris = result.assets.map((asset) => asset.uri);
        setSelectedImages([...selectedImages, ...imageUris]);
        setSelectedImagesBase64([...selectedImagesBase64, ...base64Images]);
        onSelectedImagesBase64Change([
          ...selectedImagesBase64,
          ...base64Images,
        ]);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handlePreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentIndex < selectedImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../assets/fonts/My_Soul/Kanit-Black.ttf"),
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
    <View style={styles.container}>
      <Text style={styles.imageText}>Upload your car image</Text>
      <ScrollView horizontal={true} style={styles.imageScrollContainer}>
        <View style={{ flexDirection: "row" }}>
          {selectedImages.map((imageUri, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
            >
              <Image
                source={{ uri: imageUri }}
                style={[
                  styles.image,
                  { display: index === currentIndex ? "flex" : "none" },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal={true} style={styles.thumbnailScrollContainer}>
        {selectedImages.map((imageUri, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentIndex(index)}>
            <Image source={{ uri: imageUri }} style={styles.thumbnailImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePreviousImage}
          style={[styles.navigationButton, { marginRight: 10 }]}
        >
          <Image
            source={require("../assets/previous.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChooseImage}
          style={styles.addImageButton}
        >
          <View style={styles.addImageButtonInner}>
            <Image
              source={require("../assets/cameraIcon.png")}
              style={styles.cameraIcon}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.currentIndexText}>
          {currentIndex + 1}/{selectedImages.length}
        </Text>
        <TouchableOpacity
          onPress={handleNextImage}
          style={[styles.navigationButton, { marginLeft: 10 }]}
        >
          <Image
            source={require("../assets/next.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    height: 420, // Set a fixed height for the container
  },
  imageText: {
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addImageButton: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  addImageButtonInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: "blue",
  },
  imageScrollContainer: {
    marginTop: 1,
    // backgroundColor: "black",
    borddisplay: "flex",
    borderStyle: "dashed",
    borderWidth: 2,
  },
  thumbnailScrollContainer: {
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 100,
  },
  image: {
    width: windowWidth, // Set width to window width
    aspectRatio: 1 / 1, // Maintain aspect ratio of 4:3
    borderRadius: 5,
    marginHorizontal: 10,
    height: 250,
  },
  thumbnailImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  navigationButton: {
    backgroundColor: "#bd2a2a",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 35,
  },
  arrowIcon: {
    width: 15,
    height: 20,
    tintColor: "white",
  },
  currentIndexText: {
    fontSize: 16,
    color: "#bd2a2a",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
});

export default ImagePickerComponent;
