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
import handleSignup from "./backend/handleSignup";

const { width } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [signupResult, setSignupResult] = useState("");

  const handleSignupPress = async () => {
    const userData = {
      username: username,
      email: email,
      password: password,
      rePassword: rePassword,
    };

    // Call handleSignup and update the state with the result
    const result = await handleSignup(userData);
    setSignupResult(result);
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
          placeholder="نام کاربری"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
          textAlign="right"
        />
        <Image source={require("./assets/user_icon.png")} style={styles.icon} />
      </View>

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

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="رمز"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
          textAlign="right"
        />
        <Image source={require("./assets/pass_icon.png")} style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="تکرار رمز"
          value={rePassword}
          onChangeText={(text) => setRePassword(text)}
          secureTextEntry
          style={styles.input}
          textAlign="right"
        />
        <Image source={require("./assets/pass_icon.png")} style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>ثبت نام</Text>
      </TouchableOpacity>

      <Text style={styles.resultText}>{signupResult}</Text>
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

export default SignupScreen;
