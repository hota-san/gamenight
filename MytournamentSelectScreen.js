import React from 'react';
import { ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyTournamentSelectScreen = ({ route }) => {
  const { id, name, image_url, date, time, remainingSpots, detail, winner, placement, tournamentStatus } = route.params;
  const imageSource = require(`./assets/${image_url}`)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Center Top */}
      <Image source={imageSource} style={styles.image} />

      {/* Name Tag */}
      <Text style={[styles.nameTag, { color: '#FFE600' }]}>{name}</Text>

      {/* Entry Fee */}
      {/* <Text style={[styles.entryFee, { color: '#FF324B' }]}>{`هزینه ورود: ${entryFee} تومان`}</Text> */}

      {/* Date */}
      <Text style={styles.date}>{`تاریخ: ${date}`}</Text>

      {/* Time */}
      <Text style={styles.time}>{`زمان: ${time}`}</Text>
        {/* Render Remaining Spots only if the tournament hasn't started */}
        {tournamentStatus !== 'started' && (
                <Text style={styles.remainingSpots}>{`ظرفیت باقی‌مانده: ${remainingSpots} نفر`}</Text>
      )}
      {/* Details */}
      <Text style={styles.detail}>{detail}</Text>

      {/* Winner and Placement */}
      {tournamentStatus === 'started' && winner ? (
        <Text style={styles.winner}>{`برنده: ${winner}, موقعیت شما: ${placement}`}</Text>
      ) : null}

      {/* Join Tournament Button */}
      {/* <TouchableOpacity style={styles.joinTournamentButton}>
        <Text style={styles.joinTournamentButtonText}>ورود به تورنمنت</Text>
      </TouchableOpacity> */}
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
  },
  entryFee: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  date: {
    fontSize: wp('4%'),
    color: '#888',
    marginTop: hp('1%'),
  },
  time: {
    fontSize: wp('4%'),
    color: '#888',
    marginTop: hp('1%'),
  },
  remainingSpots: {
    fontSize: wp('4%'),
    color: '#888',
    marginTop: hp('1%'),
  },
  detail: {
    fontSize: wp('4%'),
    color: '#8DCE10',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  winner: {
    fontSize: wp('4%'),
    color: '#8DCE10',
    marginTop: hp('2%'),
    textAlign: 'center',
    fontWeight: 'bold',
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

export default MyTournamentSelectScreen;
