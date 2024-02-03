// UserExist.js
import axios from "axios";

const userExists = async (username) => {
  try {
    // Make a request to check if a user with the given username exists
    const response = await axios.get(
      `http://localhost:3000/api/users?username=${username}`
    );

    // Extract the user data from the response
    const user = response.data;

    // If user data exists, the user exists
    console.log('user: ' , user);
    return !!user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false; // Return false in case of an error
  }
};

export default userExists;
