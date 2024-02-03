// Import necessary libraries and components
import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import SignupScreen from "./SignupScreen";
import ForgetPasswordScreen from "./ForgetPasswordScreen";
import handleLogin from "./backend/handleLogin";

// Get the width of the screen

const { width } = Dimensions.get("window");

// Define the LoginScreen component
const LoginScreen = ({ navigation }) => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");

  // Function to handle the login button press
  const handleLoginPress = async () => {
    const userLoginData = {
      username: username,
      password: password,
    };
    try {
      const response = await handleLogin(userLoginData);
      console.log(response.isAdmin);
  
      if (response.success) {
        console.log(response);
        navigation.navigate("HomePage", { userId: response.userId , isAdmin:response.isAdmin});
      } else {
        setLoginResult("نام کاربری یا رمز عبور اشتباه است.");
      }
    } catch (error) {
      console.error("Error handling login:", error);
      setLoginResult("خطا در ارتباط با سرور.");
    }
  };

  // Function to handle the signup button press
  const handleSignup = () => {
    // Navigate to the SignupScreen
    navigation.navigate("Signup");
  };

  // Function to handle the forget password button press
  const handleForgetPassword = () => {
    // Navigate to the ForgetPasswordScreen
    navigation.navigate("ForgetPassword");
  };

  // Calculate logo dimensions based on screen width
  const logoWidth = width * 0.8;
  const logoHeight = (logoWidth * 119) / 442;

  // Return the JSX structure for the LoginScreen
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Image
            source={require("./assets/user_icon.png")}
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
          <Image
            source={require("./assets/pass_icon.png")}
            style={styles.icon}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>ورود</Text>
        </TouchableOpacity>

        <View style={styles.additionalButtonsContainer}>
          <TouchableOpacity
            style={[styles.additionalButton, { marginRight: 8 }]}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>ثبت نام</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.additionalButton, { marginLeft: 8 }]}
            onPress={handleForgetPassword}
          >
            <Text style={styles.buttonText}>فراموشی</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.resultText}>{loginResult}</Text>
      </View>
    </ScrollView>
  );
};

// Define the styles for the LoginScreen
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
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
  additionalButtonsContainer: {
    flexDirection: "row",
    width: "80%",
    height: 40,
    marginTop: 8,
  },
  additionalButton: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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

// Export the LoginScreen component
export default LoginScreen;
