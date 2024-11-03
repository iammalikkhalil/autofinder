import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { AntDesign } from "@expo/vector-icons";
// Fonts
import { useFonts } from "expo-font";

const New_Cars_Find = () => {
  // --- Hide & Seek ---
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const toggleExploreDropdown = () => {
    setShowExploreDropdown(!showExploreDropdown);
  };
  // --- Hide & Seek ---
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://autofinder-backend.vercel.app/api/newCar"
      );
      setData(response.data.data);
      setFilteredData(response.data.data); // Initialize filteredData with the fetched data
    } catch (error) {
      console.error("Error fetching car data: ", error);
    }
  };

  const handleCardPress = (itemId) => {
    navigation.navigate("New_Cars_Details_Single", { itemId: itemId });
  };

  // Updated function to handle both search input and brand button click
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const results = data.filter(
      (item) =>
        item.make.toLowerCase().includes(lowercasedQuery) ||
        item.model.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(results);
    setSearchQuery(query); // Update searchQuery to trigger the search result section
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find New Cars</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.SearchBar}>
          <View style={styles.Search_container}>
            <AntDesign
              name="search1"
              size={20}
              color="gray"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => handleSearch(searchQuery)}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* --- Search Portion --- */}
      {filteredData.length > 0 && searchQuery !== "" && (
        <View style={styles.Container_Sub}>
          <View style={styles.heading_Parent}>
            <Text style={styles.heading_1}>Your Search Result</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.Pop_container}
          >
            {filteredData.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  navigation.navigate("New_Cars_Details_Single", { item })
                }
                style={{ marginHorizontal: 10, marginVertical: 10 }}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item?.image }} style={styles.image} />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.name}>{item.make}</Text>
                  <Text style={styles.price}>
                    PKR {item.keySpecifications.price}
                  </Text>
                  <Text style={styles.city}>{item.model}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {/* --- Search Portion --- */}
      {/* --- Brand ---  */}
      <View style={styles.Container_Sub}>
        <View style={styles.heading_Parent}>
          <Text style={styles.heading_1}>Browse New Cars By Brand</Text>
          <Text style={styles.heading_2} onPress={toggleExploreDropdown}>
            See More
          </Text>
        </View>
        {/* Brand Row */}
        <View style={styles.Brand_Box_Parent}>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("Toyota")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/toyota.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>Toyota</Text>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("Changan")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/changan.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>Changan</Text>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("DFSK")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/dfsk.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>DFSK</Text>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("Honda")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/honda.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>Honda</Text>
          </TouchableOpacity>
        </View>
        {/* Brand Row */}
        <View style={styles.Brand_Box_Parent}>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("Hyundai")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/hyndai.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>Hyundai</Text>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("MG")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/mg.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>MG</Text>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("Proton")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/proton.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>Proton</Text>
          </TouchableOpacity>
          {/* Box */}
          <TouchableOpacity
            style={styles.Brand_Box}
            onPress={() => handleSearch("Audi")}
          >
            <View style={styles.Brand_Box_Img_Parent}>
              <Image
                source={require("../../assets/audi.png")}
                style={styles.Brand_Box_Img}
              />
            </View>
            <Text style={styles.Brand_Box_Txt}>Audi</Text>
          </TouchableOpacity>
        </View>
        {/* --- Hide & Seek --- */}
        {showExploreDropdown && (
          <>
            {/* // --- Parent Box --- */}
            <View style={styles.Brand_Box_Parent}>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("baic")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/baic.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>BAIC</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("bmw")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/BMW.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>BMW</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("haval")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/haval.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Haval</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("Isuzu")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/isuzu.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Isuzu</Text>
              </TouchableOpacity>
            </View>
            {/* // --- Parent Box --- */}
            <View style={styles.Brand_Box_Parent}>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("kia")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/kia.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>KIA</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("mercedes")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/mercedes.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Mercedes</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("mg")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/mg.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>MG</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("peugeot")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/peugeot.jpg")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Peugeot</Text>
              </TouchableOpacity>
            </View>
            {/* // --- Final Parent Box --- */}
            <View style={styles.Brand_Box_Parent}>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("porche")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/porsche.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Porche</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("faw")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/faw.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>FAW</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("suzuki")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/suzuki.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Suzuki</Text>
              </TouchableOpacity>
              {/* Box */}
              <TouchableOpacity
                style={styles.Brand_Box}
                onPress={() => handleSearch("tesla")}
              >
                <View style={styles.Brand_Box_Img_Parent}>
                  <Image
                    source={require("../../assets/tesla.png")}
                    style={styles.Brand_Box_Img}
                  />
                </View>
                <Text style={styles.Brand_Box_Txt}>Tesla</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {/* --- Hide & Seek --- */}
      </View>
      {/* --- Brand --- */}
      <View style={styles.Container_Sub}>
        <View style={styles.heading_Parent}>
          <Text style={styles.heading_1}>Popular New Cars</Text>
          <Text style={styles.heading_2}>See More</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.Pop_container}
        >
          {data.length > 0 ? (
            data.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  navigation.navigate("New_Cars_Details_Single", { item })
                }
                style={{ marginHorizontal: 10, marginVertical: 10 }}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item?.image }} style={styles.image} />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.name}>{item.make}</Text>
                  <Text style={styles.price}>
                    PKR {item.keySpecifications.price}
                  </Text>
                  <Text style={styles.city}>{item.model}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No Data</Text>
          )}
        </ScrollView>
      </View>
      {/* --- Car Comparison --- */}
      <View style={styles.Container_Sub}>
        <Text style={styles.heading}>Car Comparison</Text>
        {/* Car Comparison Image */}
        <View style={styles.Comapre_Img_Parent}>
          <TouchableOpacity onPress={() => navigation.navigate("New_Cars")}>
            <Image
              source={require("../../assets/vs.jpg")}
              style={styles.Comapre_Img}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Search_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: "#bd2a2a",
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "black",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  searchButton: {
    backgroundColor: "#bd2a2a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanit",
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
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
    letterSpacing: 1,
    fontFamily: "Kanit",
  },
  rowContainer: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 10,
  },
  SearchBar: {
    alignSelf: "center",
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    paddingHorizontal: 1,
    width: "90%",
    borderColor: "transparent",
    marginHorizontal: 20,
  },
  Container_Sub: {
    // borderWidth: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    // borderWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
    fontSize: 17,
    letterSpacing: 1.1,
    color: "#696969",
    fontFamily: "Heebo",
  },
  heading_Parent: {
    // borderWidth: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  heading_1: {
    width: "80%",
    // borderWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
    fontSize: 17,
    letterSpacing: 1.1,
    color: "#696969",
    fontFamily: "Heebo",
  },
  heading_2: {
    width: "20%",
    // borderWidth: 0.5,
    paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 5,
    fontSize: 12,
    letterSpacing: 1.1,
    color: "#bc0000",
    fontFamily: "Kanit",
  },
  Brand_Box_Parent: {
    // borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Brand_Box: {
    borderWidth: 0.5,
    borderColor: "#D5D5D5",
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "23%",
    borderRadius: 5,
    shadowColor: "black",
    elevation: 10,
    backgroundColor: "white",
  },
  Brand_Box_Img_Parent: {
    // borderWidth: 0.5,
    paddingVertical: 1,
    paddingTop: 1,
    width: "100%",
  },
  Brand_Box_Img: {
    // borderWidth: 0.5,
    // borderColor: "black",
    paddingVertical: 1,
    paddingHorizontal: 1,
    width: 35,
    height: 30,
    alignSelf: "center",
  },
  Brand_Box_Txt: {
    // borderWidth: 0.5,
    letterSpacing: 0.5,
    textAlign: "center",
    paddingTop: 3,
    fontSize: 12,
    fontFamily: "Kanit",
  },
  //   Pouplular New Cars ( Managed Ads By AF )
  Pop_container: {
    flexDirection: "row",
  },
  itemContainer: {
    width: 180,
    height: 220,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    margin: 5,
    flexDirection: "column",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // Make sure to handle image dimensions appropriately
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f4f0ec",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    color: "#bd2a2a",
    fontSize: 12,
    fontFamily: "Kanit",
  },
  price: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  city: {
    color: "grey",
    fontSize: 12,
    fontFamily: "Kanit",
    letterSpacing: 0.8,
  },
  modelKmDriven: {
    color: "#8b8c8c",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: 120,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    // borderWidth: 0.5,
    // borderColor: "black",
  },
  image: {
    // borderWidth: 0.5,
    // borderColor: "black",
    width: 120,
    height: 100,
    borderRadius: 5,
  },
  featuredIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
    color: "#bd2a2a",
    fontFamily: "Kanit",
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 15,
    color: "black",
    marginBottom: 10,
    fontFamily: "Heebo",
  },
  upperView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
  },
  Comapre_Img_Parent: {
    // borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  Comapre_Img: {
    // borderWidth: 0.5,
    // borderColor: "black",
    width: 280,
    height: 150,
    borderRadius: 15,
  },
});

export default New_Cars_Find;
