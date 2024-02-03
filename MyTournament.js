import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyTournament = ({
  id,
  name,
  entryFee,
  image_url,
  date,
  time,
  remainingSpots,
  detail,
  winner,
  placement,
  tournamentStatus,
}) => {
  const navigation = useNavigation();
  const imageSource = require(`./assets/${image_url}`);
  console.log(image_url);
  const handleImagePress = () => {
    // Navigate to MyTournamentSelectScreen with respective tournament details
    navigation.navigate("MyTournamentSelect", {
      id,
      name,
      image_url,
      date,
      time,
      remainingSpots,
      detail,
      winner,
      placement,
      tournamentStatus,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={imageSource} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.date}>{`تاریخ: ${date}`}</Text>
      <Text style={styles.time}>{`زمان: ${time}`}</Text>
      <Text
        style={styles.remainingSpots}
      >{`ظرفیت باقی‌مانده: ${remainingSpots} نفر`}</Text>
      <Text style={styles.detail}>{detail}</Text>

      {/* Display winner or placement based on tournament status */}
      {tournamentStatus === "notStarted" && (
        <Text style={styles.status}>تورنمنت هنوز شروع نشده است</Text>
      )}
      {tournamentStatus === "started" && winner && (
        <Text style={styles.status}>{`برنده: ${winner}`}</Text>
      )}
      {tournamentStatus === "started" && placement && (
        <Text style={styles.status}>{`جایگاه شما: ${placement}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 8,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#8DCE10",
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "#8DCE10",
    marginBottom: 8,
  },
  remainingSpots: {
    fontSize: 14,
    color: "#8DCE10",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: "#8DCE10",
    marginBottom: 8,
    textAlign: "center",
  },
  status: {
    fontSize: 14,
    color: "#FF324B",
    marginTop: 8,
  },
});

export default MyTournament;
