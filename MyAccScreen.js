// MyAccScreen.js
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyAccButton from "./MyAccButton";

const MyAccScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;


  const handleCartButtonPress = () => {
    // Navigate to ShopScreen with userId
    navigation.navigate("MyShop", { userId });
  };

  const handleAddMoneyButtonPress = () => {
    // Navigate to AddMoneyScreen with userId
    navigation.navigate("AddMoney", { userId });
  };

  const handleReservationButtonPress = () => {
    // Navigate to MyReservationScreen with userId
    navigation.navigate("MyReservation", { userId });
  };

  const handleMyTournamentButtonPress = () => {
    // Navigate to MyTournamentScreen with userId
    navigation.navigate("MyTournament", { userId });
  };


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MyAccButton
          buttonText="رزروهای من"
          buttonImage={require("./assets/timetable 1.png")}
          onPress={handleReservationButtonPress}
        />
        <MyAccButton
          buttonText="افزایش موجودی"
          buttonImage={require("./assets/income 1.png")}
          onPress={handleAddMoneyButtonPress}
        />
      </View>
      <View style={styles.row}>
        <MyAccButton
          buttonText="تورنومنت های من"
          buttonImage={require("./assets/tournament 1.png")}
          onPress={handleMyTournamentButtonPress}
        />
        <MyAccButton
          buttonText="سبد خرید"
          buttonImage={require("./assets/shopping-cart 1.png")}
          onPress={handleCartButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323031",
    justifyContent: "center",
    alignItems: "center",
    // margin: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default MyAccScreen;
