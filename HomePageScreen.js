// MyAccScreen.js
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyAccButton from "./MyAccButton";

const HomePageScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userId, isAdmin } = route.params;
  console.log("is ", isAdmin);
  const handleShopButtonPress = () => {
    // Navigate to ShopScreen
    navigation.navigate("Shop", { userId });
  };

  const handleMyAccButtonPress = () => {
    // Navigate to MyAcc
    if (!isAdmin) {
      navigation.navigate("MyAcc", { userId });
    }
    else{
      navigation.navigate("AdminMyAcc", { userId });

    }
  };
  const handleReservationButtonPress = () => {
    // Navigate to ShopScreen
    navigation.navigate("Reservation", { userId });
  };
  const handleTournamentButtonPress = () => {
    // Navigate to ShopScreen
    navigation.navigate("Tournament", { userId });
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MyAccButton
          buttonText="رزرو"
          buttonImage={require("./assets/choose 1.png")}
          onPress={handleReservationButtonPress}
        />
        <MyAccButton
          buttonText="حساب من"
          buttonImage={require("./assets/verified-account 1.png")}
          onPress={handleMyAccButtonPress}
        />
      </View>
      <View style={styles.row}>
        <MyAccButton
          buttonText="تورنومنت ها"
          buttonImage={require("./assets/championship 1.png")}
          onPress={handleTournamentButtonPress}
        />
        <MyAccButton
          buttonText="فروشگاه"
          buttonImage={require("./assets/shopping-online 1.png")}
          onPress={handleShopButtonPress}
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

export default HomePageScreen;
