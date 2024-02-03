// ForgetPasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import handleSendCode from "./backend/handleSendCode";
const { width } = Dimensions.get("window");

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleSendCodePress = async () => {
    const codeResult = await handleSendCode(email);
    console.log(codeResult);
    setResult(codeResult);
  };

  const logoWidth = width * 0.8;
  const logoHeight = (logoWidth * 119) / 442;

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/login_logo.png")}
        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ایمیل"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          textAlign="right"
          keyboardType="email-address"
        />
        <Image
          source={require("./assets/email_icon.png")}
          style={styles.icon}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendCodePress}>
        <Text style={styles.buttonText}>ارسال کد</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>{result}</Text>
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
  logo: {
    marginBottom: 4,
    resizeMode: "contain",
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
    paddingRight: 24,
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
    fontSize: 14,
    fontFamily: "iransans",
    marginTop: 8,
  },
});

export default ForgetPasswordScreen;
