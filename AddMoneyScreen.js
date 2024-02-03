import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import MyAccButton from "./MyAccButton";
import handleAddMoney from "./backend/handleAddMoney";
import convertToPersianText from "./backend/convertToPersianText";
import Num2persian from "num2persian";
import handleAccBallance from "./backend/handleAccBallance";

const { width } = Dimensions.get("window");

const AddMoneyScreen = ({ route }) => {
  const [money, setMoney] = useState("");
  const [result, setResult] = useState("");
  const [resultPress, setResultPress] = useState("");
  const [balance, setBalance] = useState(""); // State to store the balance

  const { userId } = route.params;

  useEffect(() => {
    // Fetch the balance when the component mounts
    const fetchBalance = async () => {
      try {
        let userBalance = await handleAccBallance(userId);
        userBalance = Num2persian(userBalance);
        setBalance(userBalance); // Assuming the response has a 'balance' property
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [userId]); // The useEffect will re-run whenever the userId changes

  const handleAddMoneyPress = async () => {
    const result = await handleAddMoney(userId, money);
    setResultPress(result);
  };

  const handleValidMoney = (text) => {
    setMoney(text);
    setResult(Num2persian(text));
  };

  const logoWidth = width * 0.8;
  const logoHeight = (logoWidth * 119) / 442;

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>موجودی حساب: {balance} تومان</Text>

      <MyAccButton
        buttonText="افزایش موجودی"
        buttonImage={require("./assets/income 1.png")}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="مقدار مورد نظر خود را وارد کنید"
          value={money}
          onChangeText={(text) => handleValidMoney(text)}
          style={styles.input}
          textAlign="right"
          keyboardType="money-amount"
        />
        <Image
          source={require("./assets/Money_icon.png")}
          style={styles.icon}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddMoneyPress}>
        <Text style={styles.buttonText}>افزایش موجودی</Text>
      </TouchableOpacity>

      {result ? <Text style={styles.resultText}>{result} تومان</Text> : null}
      {resultPress ? (
        <Text style={styles.resultText}>{resultPress}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#323031",
    padding: 8,
  },
  balanceText: {
    color: "white",
    fontSize: 16,
    fontFamily: "iransans",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 4,
  },
  input: {
    flex: 1,
    height: 40,
    paddingRight: 30,
    backgroundColor: "#f2f2f2",
    textAlign: "right",
    fontFamily: "iransans",
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: -22,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#1C1C1C",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "iransans",
  },
  resultText: {
    color: "white",
    fontSize: 16,
    fontFamily: "iransans",
    marginTop: 8,
  },
});

export default AddMoneyScreen;
