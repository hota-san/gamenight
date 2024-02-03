import React, { useState, useEffect } from "react";
import { FlatList, View, Dimensions, Text } from "react-native";
import axios from "axios";

const MyReservationScreen = ({ route }) => {
  const { width, height } = Dimensions.get("window");

  const [reservationItems, setReservationItems] = useState([]);
  const { userId } = route.params;
  const isAdmin = true;
  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        // Replace 'your_user_id' with the actual user ID of the logged-in user

        // Make a GET request to the server's API endpoint for fetching items in the shopping bag for the user
        if (isAdmin) {
          const response = await axios.get(
            `http://localhost:3000/api/Reservation`
          );
          setReservationItems(response.data);
          console.log(response.data);
        } else {
          const response = await axios.get(
            `http://localhost:3000/api/Reservation/${userId}`
          );
          setReservationItems(response.data);
          console.log(response.data);
          
        }
        // Set the retrieved items in the state

      } catch (error) {
        console.error("Error fetching shop items:", error);
      }
    };

    // Call the function to fetch items
    fetchShopItems();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 16,
        margin: 8,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 8,
          color: "#FFE600",
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{ fontSize: 14, color: "#888", marginBottom: 8 }}
      >{`شروع: ساعت ${item.start_hour}`}</Text>
      <Text
        style={{ fontSize: 14, color: "#888", marginBottom: 8 }}
      >{`پایان: ساعت ${item.end_hour}`}</Text>
      <Text
        style={{ fontSize: 14, color: "#888", marginBottom: 8 }}
      >{`کنسول: ${item.console_type}`}</Text>
      <Text
        style={{
          fontSize: 14,
          color: "#8DCE10",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {item.detail}
      </Text>
    </View>
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
      {reservationItems.length > 0 ? (
        <FlatList
          data={reservationItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            justifyContent: "space-between",
            padding: 16,
          }}
        />
      ) : (
        <Text style={{ color: "white" }}>No reservations available.</Text>
      )}
    </View>
  );
};

export default MyReservationScreen;
