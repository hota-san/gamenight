import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tournament = ({ id, name, entryFee, image_url, date, time, remainingSpots, detail, onJoinTournament }) => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    // Navigate to TournamentSelectScreen with respective tournament details
    navigation.navigate('TournamentSelect', { id, name, entryFee, image_url, date, time, remainingSpots, detail });
  };
  // Assume image_url is just the filename without extension
  let imageSource;
  console.log(image_url);
  try {
    imageSource = require(`./assets/${image_url}`);
  } catch (error) {
    // If the image file does not exist, use a default image
    imageSource = require("./assets/no-photo.png");
  }  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={imageSource} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.entryFee}>{`هزینه ورود: ${entryFee} تومان`}</Text>
      {/* <Text style={styles.amount}>{`ظرفیت باقی‌مانده: ${amount} نفر`}</Text> */}
      <Text style={styles.date}>{`تاریخ: ${date}`}</Text>
      {/* <Text style={styles.time}>{`زمان: ${time}`}</Text> */}
      <Text style={styles.remainingSpots}>{`ظرفیت باقی‌مانده: ${remainingSpots} نفر`}</Text>
      {/* <Text style={styles.detail}>{detail}</Text> */}
      <TouchableOpacity onPress={onJoinTournament} style={styles.joinTournamentButton}>
        <Text style={styles.joinTournamentButtonText}>ورود به تورنمنت</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  entryFee: {
    fontSize: 14,
    color: '#FF324B',
    marginBottom: 8,
  },
  amount: {
    fontSize: 14,
    color: '#8DCE10',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#8DCE10',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#8DCE10',
    marginBottom: 8,
  },
  remainingSpots: {
    fontSize: 14,
    color: '#8DCE10',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#8DCE10',
    marginBottom: 8,
    textAlign: 'center',
  },
  joinTournamentButton: {
    backgroundColor: '#23AA49',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  joinTournamentButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Tournament;
