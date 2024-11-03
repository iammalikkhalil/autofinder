import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
// Fonts
import { useFonts } from "expo-font";

const My_profile = ({ visible, message, onClose }) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.messageText}>{message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image
                source={require("../../assets/updatedIcon.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Profile = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const [isEditable, setIsEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require("../../assets/My_Upload.png")
  );

  const handlerBack = () => {
    navigation.goBack();
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/Kanit-Black.ttf"),
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handlerBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Background */}
        <View style={styles.background}>
          {/* Profile Picture Upload */}
          <View style={styles.imageUploadContainer}>
            <Image source={profileImage} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImageUpload}
            >
              <Text style={styles.uploadButtonText}>
                Upload Profile Picture
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textFieldsContainer}>
            <View style={styles.textFieldContainer}>
              <Text style={styles.placeholder}>Your Full Name</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter full name"
                  placeholderTextColor="gray"
                  // editable={isEditable}
                  value={user.name ? user.name : "User"}
                />
              </View>
            </View>
            <View style={styles.textFieldContainer}>
              <Text style={styles.placeholder}>Your Email Address</Text>
              <TextInput
                style={styles.textField}
                // placeholder="Enter email address"
                placeholderTextColor="gray"
                // editable={isEditable}
                value={user.email ? user.email : "firstname1234@gmail.com"}
              />
            </View>
            <View style={styles.textFieldContainer}>
              <Text style={styles.placeholder}>Your Phone Number</Text>
              <TextInput
                style={styles.textField}
                // placeholder="Enter email address"
                placeholderTextColor="gray"
                // editable={isEditable}
                value={user.phoneNumber ? user.phoneNumber : "03xxxxxxxxx"}
              />
            </View>
            <View style={styles.textFieldContainer}>
              <Text style={styles.placeholder}>Your Address</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.textField}
                  // placeholder=""
                  placeholderTextColor="gray"
                  // editable={isEditable}
                  value={user.address ? user.address : "HNO # ABC, - - -"}
                />
              </View>
            </View>
            {/* --- Car Inspection --- */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bd2a2a",
    paddingTop: StatusBar.currentHeight,
    // zIndex: 1,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
    marginLeft: 15,
  },
  titleContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
    alignItems: "center",
  },
  textFieldsContainer: {
    width: "88%",
  },
  textFieldContainer: {
    marginBottom: 20,
  },
  placeholder: {
    color: "#bd2a2a",
    marginBottom: 5,
    fontFamily: "Kanit",
  },
  textField: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 12,
    paddingRight: 40,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  inputWithIcon: {
    position: "relative",
  },
  arrowIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -35,
    width: 20,
    height: 20,
    tintColor: "darkred",
  },
  editProfileButton: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "darkred",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  editProfileButtonText: {
    color: "darkred",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    // Other styles for the modal content...
  },
  messageText: {
    // Styles for the message text...
  },
  closeButton: {
    // Styles for the close button...
  },
  closeIcon: {
    height: 30,
    width: 30,
    alignSelf: "center", // Align the icon in the center horizontally
    marginTop: 20, // Adjust the top margin to create space between the text and the icon
  },
  profileImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 200,
    borderWidth: 0.5,
    borderColor: "white",
  },
  uploadButton: {
    alignSelf: "center",
    backgroundColor: "#bd2a2a",
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 20,
  },
  uploadButtonText: {
    borderWidth: 0.5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    fontSize: 12,
    letterSpacing: 1.5,
    color: "white",
    borderColor: "transparent",
    textAlign: "center",
    fontFamily: "Kanit",
  },
});

export default Profile;
