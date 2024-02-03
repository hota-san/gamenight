import React, { useState , useEffect} from 'react';
import { FlatList, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'

const MyShopScreen = ({route}) => {
  const { width, height } = Dimensions.get('window');
  const [shopItems, setShopItems] = useState([]);
  const {userId} = route.params;
  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        // Replace 'your_user_id' with the actual user ID of the logged-in user
  
        // Make a GET request to the server's API endpoint for fetching items in the shopping bag for the user
        const response = await axios.get(`http://localhost:3000/api/items-in-shopping-bag/${userId}`);
  
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
    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 16, margin: 8, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#FFE600' }}>{item.name}</Text>
      <Text style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>{`Price: ${item.price}`}</Text>
      <Text style={{ fontSize: 14, color: '#8DCE10', marginBottom: 8, textAlign: 'center' }}>{item.detail}</Text>
    </View>
  );

  const handleCompletePurchase = () => {
    // Implement your logic for completing the purchase
    console.log('Purchase completed!');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#323031' }}>
      <TouchableOpacity onPress={handleCompletePurchase} style={{ padding: 16, backgroundColor: '#23AA49' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>تکمیل خرید</Text>
      </TouchableOpacity>
      {shopItems.length > 0 ? (
        <FlatList
          data={shopItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            padding: 16,
          }}
        />
      ) : (
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 16 }}>No items available for purchase.</Text>
      )}
    </View>
  );
};

export default MyShopScreen;
