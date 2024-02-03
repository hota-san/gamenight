import axios from "axios";

const handleJoinTournament = async (itemId, userId) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/add-to-tournament",
      {
        itemId,
        userId,
      }
    );
    console.log(itemId);
    // Check the response from the server
    if (response.data.success) {
      // Item added to the shopping bag successfully
      console.log("tournament added to the tournament list");
      return { success: true };
    } else {
      // Failed to add item to the shopping bag
      console.log("Failed to add tournament to the tournament list");
      return { success: false };
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error adding tournament to list:", error);
    return { success: false };
  }
};

export default handleJoinTournament;
