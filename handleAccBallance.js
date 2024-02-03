import axios from "axios";

const handleAccBallance = async (userId) => {
  try {
    // Make an HTTP request to your server to get the account balance for the user
    const response = await axios.get(
      `http://localhost:3000/api/get-account-balance/${userId}`
    );

    // Check the response from the server
    if (response.data.success) {
      // Return the account balance
      return response.data.balance;
    } else {
      // Failed to get account balance
      console.error("Error fetching account balance:", response.data.message);
      return "خطا در دریافت موجودی";
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error fetching account balance:", error);
    return "خطا در ارتباط با سرور";
  }
};

export default handleAccBallance;
