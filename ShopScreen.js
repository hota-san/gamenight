import React, { useEffect, useState } from "react";
import { FlatList, View, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Item from "./Item";
import axios from "axios";
import handleAddToCart from "./backend/handleAddToCart";

const ShopScreen = ({ route }) => {
  const { userId } = route.params;
  const { width } = Dimensions.get("window");
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        // Make a GET request to the server's API endpoint for fetching items
        const response = await axios.get("http://localhost:3000/api/items");

        // Set the retrieved items in the state
        setShopItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching shop items:", error);
      }
    };

    // Call the function to fetch items
    fetchShopItems();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      detail={item.detail} // Pass the detail prop
      image_url={item.image_url}
      onAddToCart={() => handleAddToCart(item.id, userId)}
      style={{
        width: wp("45%"), // 45% of the screen width
        margin: wp("2%"), // 2% margin
      }}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#323031",
      }}
    >
      <FlatList
        data={shopItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: "space-between",
          padding: wp("2%"), // 2% padding
        }}
      />
    </View>
  );
};

export default ShopScreen;
