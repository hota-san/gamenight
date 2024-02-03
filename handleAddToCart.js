import axios from "axios";

const handleAddToCart = async (itemId, userId) => {
  try {
    const response = await axios.post("http://localhost:3000/api/add-to-cart", {
      itemId,
      userId,
    });

    // Check the response from the server
    if (response.data.success) {
      // Item added to the shopping bag successfully
      console.log("Item added to the shopping bag");
      return { success: true };
    } else {
      // Failed to add item to the shopping bag
      console.log("Failed to add item to the shopping bag");
      return { success: false };
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error adding item to cart:", error);
    return { success: false };
  }
};

export default handleAddToCart;
