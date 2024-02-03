import React, { useState, useEffect } from "react";
import { FlatList, View, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MyTournament from "./MyTournament";
import fetchUserTournaments from "./backend/fetchUserTournaments ";

const MyTournamentScreen = ({ route }) => {
  const { width, height } = Dimensions.get("window");
  const [tournamentItems, setTournamentItems] = useState([]);
  const { userId } = route.params;
  useEffect(() => {
    const fetchTournaments = async () => {
      // Replace 'your_user_id' with the actual user ID of the logged-in user

      const tournaments = await fetchUserTournaments(userId);
      console.log("1");
      if (tournaments) {
        setTournamentItems(tournaments);
        console.log(tournaments);

      }
    };

    fetchTournaments();
  }, []);

  const handleJoinTournament = (itemId) => {
    // Implement your logic for joining the tournament
    console.log("Joined Tournament:", itemId);
  };

  const renderItem = ({ item }) => (
    <MyTournament
      id={item.id}
      name={item.name}
      entryFee={item.entryFee}
      image_url={item.image_url}
      date={item.date}
      time={item.time}
      remainingSpots={item.remainingSpots}
      detail={item.detail}
      winner={item.winner}
      placement={item.placement}
      tournamentStatus={item.tournamentStatus}
      onJoinTournament={() => handleJoinTournament(item.id)}
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
        data={tournamentItems}
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

export default MyTournamentScreen;
