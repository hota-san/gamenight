// MyAccScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyAccButton from './MyAccButton';

const AdminMyAccScreen = ({route}) => {
  const {userId} = route.params;
  const navigation = useNavigation();

  const handleAddItemButtonPress = () => {
    // Navigate to ShopScreen
    navigation.navigate('AddItem' , {userId});
  };
  const handleShopButtonPress = () => {
      // Navigate to ShopScreen
      navigation.navigate("Shop", { userId });
    };
  const handleTodaysReservationButtonPress = () => {
      // Navigate to ShopScreen
      navigation.navigate('TodaysReservation' , {userId});
  };
  
  const handleAddTornomentButtonPress = () => {
      // Navigate to ShopScreen
      navigation.navigate('AddTournament',{userId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MyAccButton
          buttonText="رزروهای امروز"
          buttonImage={require('./assets/timetable 1.png')}
          onPress={handleTodaysReservationButtonPress}
        />
        <MyAccButton
          buttonText="مشاهده‌فروشگاه"
          buttonImage={require('./assets/shopping-online 1.png')}
          onPress={handleShopButtonPress}
        />
      </View>
      <View style={styles.row}>
        <MyAccButton
          buttonText="ثبت تورنومنت"
          buttonImage={require('./assets/tournament 1.png')}
          onPress={handleAddTornomentButtonPress}
        />
        <MyAccButton
          buttonText="ویرایش فروشگاه"
          buttonImage={require('./assets/shopping-cart 1.png')}
          onPress={handleAddItemButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323031',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default AdminMyAccScreen;
