import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentDetailModal from "../paymentDetailModel";
// import MarqueeText from 'react-native-marquee';
import { useRoute } from "@react-navigation/native";
import EasyPaisaModal from "../EasyPaisaModal";
import JazzCashModal from "../JassCashModal";

const CheckoutCarInspection_Bike = ({ navigation }) => {
  const route = useRoute();
  const data = route.params;
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [showEasyPaisaModal, setShowEasyPaisaModal] = useState(false); // State to manage EasyPaisa modal visibility
  const [showJazzCashModal, setShowJazzCashModal] = useState(false); // State to manage JazzCash modal visibility

  useEffect(() => {
    console.log(data);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  // const handlePaymentOptionPress = (paymentMethod) => {
  //     setSelectedPaymentMethod(paymentMethod);
  //     setShowModal(true);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEasyPaisaModal(false); // Close EasyPaisa modal
    setShowJazzCashModal(false); // Close JazzCash modal
  };
  const handleContinue = () => {
    if (selectedPaymentMethod) {
      navigation.navigate("transactionApproval_Bike", {
        ...data,
        paymentMethod: selectedPaymentMethod,
      });
    } else {
      // Handle case when no payment method is selected
      alert("Please select a payment method before continuing.");
    }
    console.log(data);
  };

  const handlePaymentOptionPress = (paymentMethod) => {
    switch (paymentMethod) {
      case "Cheque":
        // Implement logic for handling cheque payment
        console.log("Cheque payment selected");
        setSelectedPaymentMethod(paymentMethod);
        setShowModal(true);
        break;
      case "Cash Deposit":
        // Implement logic for handling cash deposit payment
        console.log("Cash deposit payment selected");
        setSelectedPaymentMethod(paymentMethod);
        setShowModal(true);
        break;
      case "Online Deposit":
        // Implement logic for handling online deposit payment
        navigation.navigate("transactionApproval_Bike", {
          ...data,
          paymentMethod: "Online-Deposit",
        });
        break;
      case "EasyPaisa":
        // Implement logic for handling EasyPaisa payment
        console.log("EasyPaisa payment selected");
        setSelectedPaymentMethod(paymentMethod);
        setShowEasyPaisaModal(true);
        break;
      case "JazzCash":
        // Implement logic for handling JazzCash payment
        console.log("JazzCash payment selected");
        setSelectedPaymentMethod(paymentMethod);
        setShowJazzCashModal(true);
        break;
      default:
        console.log(`Unknown payment method selected: ${paymentMethod}`);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bike Package Checkout</Text>
        </View>
      </View>
      <View style={styles.paymentBox}>
        <View style={styles.paymentContent}>
          <Image
            source={require("../../assets/protected.png")}
            style={styles.secureIcon}
          />
          <Text style={styles.paymentText}>
            All payment methods are encrypted and secure
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOptionPress("Cheque")}
      >
        <View style={styles.paymentOptionContent}>
          <Image
            source={require("../../assets/cheque.png")}
            style={styles.paymentOptionIcon}
          />
          <Text style={styles.paymentOptionText}>Cheque Deposit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOptionPress("Cash Deposit")}
      >
        <View style={styles.paymentOptionContent}>
          <Image
            source={require("../../assets/money.png")}
            style={styles.paymentOptionIcon}
          />
          <Text style={styles.paymentOptionText}>Cash Deposit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOptionPress("Online Deposit")}
      >
        <View style={styles.paymentOptionContent}>
          <Image
            source={require("../../assets/banktransfer.png")}
            style={styles.paymentOptionIcon}
          />
          <Text style={styles.paymentOptionText}>Online Bank Deposit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOptionPress("EasyPaisa")}
      >
        <View style={styles.paymentOptionContent}>
          <Image
            source={require("../../assets/easypaisa.png")}
            style={styles.paymentOptionIcon}
          />
          <Text style={styles.paymentOptionText}>EasyPaisa</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOptionPress("JazzCash")}
      >
        <View style={styles.paymentOptionContent}>
          <Image
            source={require("../../assets/jazzcash.png")}
            style={styles.paymentOptionIcon}
          />
          <Text style={styles.paymentOptionText}>JazzCash</Text>
        </View>
      </TouchableOpacity>

      <PaymentDetailModal
        visible={showModal}
        paymentMethod={selectedPaymentMethod}
        onClose={handleCloseModal}
      />

      {/* EasyPaisaModal */}
      <Modal
        visible={showEasyPaisaModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <EasyPaisaModal onClose={handleCloseModal} />
      </Modal>

      {/* JazzCashModal */}
      <Modal
        visible={showJazzCashModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <JazzCashModal onClose={handleCloseModal} />
      </Modal>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total ( incl.VAT ) : </Text>
        <Text style={styles.totalValue}>
          PKR {data.service === "000" ? data.priceToPay : data.price}
        </Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    elevation: 3,
    zIndex: 2,
    paddingVertical: 5,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  paymentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentBox: {
    backgroundColor: "#9aedd7",
    borderRadius: 10,
    padding: 15,
    margin: 20,
  },
  paymentText: {
    flex: 1, // Take remaining space
    fontSize: 12,
  },
  secureIcon: {
    marginRight: 5, // Add some spacing between image and text
    width: 20,
    height: 20,
  },
  paymentOption: {
    backgroundColor: "#ebedf2",
    // borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  paymentOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentOptionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2884ec",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#bd2a2a",
  },
  continueButton: {
    backgroundColor: "#bd2a2a",
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CheckoutCarInspection_Bike;

