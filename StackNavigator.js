// StackNavigator.js
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ForgetPasswordScreen from "./ForgetPasswordScreen";
import HomePageScreen from "./HomePageScreen";
import ShopScreen from "./ShopScreen";
import ItemSelectScreen from "./ItemSelectScreen";
import MyAccScreen from "./MyAccScreen";
import AddMoneyScreen from "./AddMoneyScreen";
import ReservationScreen from "./ReservationScreen";
import TournamentScreen from "./TournamentScreen";
import TournamentSelectScreen from "./TournamentSelectScreen";
import MyTournamentScreen from "./MyTournamentsScreen";
import MyTournamentSelectScreen from "./MytournamentSelectScreen";
import MyReservationScreen from "./MyReservationScreen";
import MyShopScreen from "./MyShopScreen";
import AdminMyAccScreen from "./AdminMyAccScreen";
import AddTournamentScreen from "./AddTournamentScreen";
import AddItemScreen from "./AddItemScreen";
import TodaysReservationScreen from "./TodaysReservationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState("AdminMyAcc");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setInitialRoute("HomePage");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };
    checkToken();
  }, []);

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="HomePage" component={HomePageScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="MyShop" component={MyShopScreen} />
      <Stack.Screen name="ItemSelect" component={ItemSelectScreen} />
      <Stack.Screen name="MyAcc" component={MyAccScreen} />
      <Stack.Screen name="AdminMyAcc" component={AdminMyAccScreen} />
      <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="AddTournament" component={AddTournamentScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="MyReservation" component={MyReservationScreen} />
      <Stack.Screen name="Tournament" component={TournamentScreen} />
      <Stack.Screen
        name="TournamentSelect"
        component={TournamentSelectScreen}
      />
      <Stack.Screen name="MyTournament" component={MyTournamentScreen} />
      <Stack.Screen
        name="MyTournamentSelect"
        component={MyTournamentSelectScreen}
      />
      <Stack.Screen
        name="TodaysReservation"
        component={TodaysReservationScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
