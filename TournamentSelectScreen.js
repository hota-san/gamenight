import React from 'react';
import { ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TournamentSelectScreen = ({ route }) => {
  const { id, name, entryFee, image_url, date, time, remainingSpots, detail } = route.params;
  const imageSource = require(`./assets/${image_url}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Center Top */}
      <Image source={imageSource} style={styles.image} />

      {/* Name Tag */}
      <Text style={[styles.nameTag, { color: '#FFE600' }]}>{name}</Text>

      {/* Entry Fee */}
      <Text style={[styles.entryFee, { color: '#FF324B' }]}>{`هزینه ورود: ${entryFee} تومان`}</Text>

      {/* Join Tournament Button */}
      <TouchableOpacity style={styles.joinTournamentButton}>
        <Text style={styles.joinTournamentButtonText}>ورود به تورنمنت</Text>
      </TouchableOpacity>

      {/* Date */}
      <Text style={styles.date}>{`تاریخ: ${date}`}</Text>

      {/* Time */}
      <Text style={styles.time}>{`زمان: ${time}`}</Text>

      {/* Remaining Spots */}
      <Text style={styles.remainingSpots}>{`ظرفیت باقی‌مانده: ${remainingSpots} نفر`}</Text>

      {/* Details */}
      <Text style={styles.detail}>{detail}</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323031',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('5%'),
  },
  image: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('30%') / 2,
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },
  nameTag: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
    textAlign: 'q', // Align the text in the center
  },
  entryFee: {
    fontSize: wp('4%'), // Adjusted font size
    fontWeight: 'bold',
    marginTop: hp('1%'),
    textAlign: 'center', // Align the text in the center
  },
  amount: {
    fontSize: wp('3%'), // Adjusted font size
    color: '#888',
    marginTop: hp('1%'),
    textAlign: 'center', // Align the text in the center
  },
  date: {
    fontSize: wp('3%'), // Adjusted font size
    color: '#888',
    marginTop: hp('1%'),
    textAlign: 'center', // Align the text in the center
  },
  time: {
    fontSize: wp('3%'), // Adjusted font size
    color: '#888',
    marginTop: hp('1%'),
    textAlign: 'center', // Align the text in the center
  },
  remainingSpots: {
    fontSize: wp('3%'), // Adjusted font size
    color: '#888',
    marginTop: hp('1%'),
    textAlign: 'center', // Align the text in the center
  },
  detail: {
    fontSize: wp('3%'), // Adjusted font size
    color: '#8DCE10',
    marginTop: hp('2%'),
    textAlign: 'center', // Align the text in the center
  },
  joinTournamentButton: {
    backgroundColor: '#23AA49',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    borderRadius: 8,
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  joinTournamentButtonText: {
    color: 'white',
    fontSize: wp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TournamentSelectScreen;
