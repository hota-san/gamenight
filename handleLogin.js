import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogin = async (userData) => {
  try {
    // Make an HTTP POST request to the authentication endpoint
    const response = await axios.post(
      "http://localhost:3000/api/login",
      userData
    );
    
    // Check the response from the server
    if (response.data.success) {
      // User authentication successful
      const token = response.data.token;
      const userId = response.data.userId;
      const isAdmin = response.data.isAdmin;
      // Store the token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      
      return { success: true, token:token, userId: userId , isAdmin: isAdmin};
    } else {
      // User authentication failed
      return { success: false };
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error during login request:", error);
    return { success: false }; // Assuming any error results in unsuccessful login
  }
};

export default handleLogin;
