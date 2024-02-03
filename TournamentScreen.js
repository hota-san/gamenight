import React, { useEffect, useState } from "react";
import { FlatList, View, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tournament from './Tournament';
import axios from "axios";
import handleJoinTournament from "./backend/handleJoinTournament";
const TournamentScreen = ({route}) => {
  const { width, height } = Dimensions.get('window');
  const {userId} = route.params;

  
  // Dummy data for demonstration
  const [tournaments, settournaments] = useState([]);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        // Make a GET request to the server's API endpoint for fetching items
        const response = await axios.get("http://localhost:3000/api/tournaments");

        // Set the retrieved items in the state
        settournaments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching shop items:", error);
      }
    };

    // Call the function to fetch items
    fetchShopItems();
  }, []);


 

  const renderItem = ({ item }) => (
    <Tournament
      id={item.id}
      name={item.name}
      entryFee={item.entryFee}
      // amount={item.amount}
      image_url={item.image_url}
      date={item.date}
      time={item.time}
      remainingSpots={item.remainingSpots}
      detail={item.detail}
      onJoinTournament={() => handleJoinTournament(item.id, userId)}
      style={{
        width: wp('45%'), // 45% of the screen width
        margin: wp('2%'), // 2% margin
      }}
    />
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#323031' }}>
      <FlatList
        data={tournaments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'space-between',
          padding: wp('2%'), // 2% padding
        }}
      />
    </View>
  );
};

export default TournamentScreen;
