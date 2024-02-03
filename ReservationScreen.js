import React, { useState } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import MyAccButton from "./MyAccButton";
import ConfirmReservation from "./backend/ConfirmReservation";
const ReservationScreen = ({ route }) => {
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(8);
  const [selectedConsole, setSelectedConsole] = useState("ps4"); // Default value
  const [reservationResult, setReservationResult] = useState(null);

  const {userId} = route.params;
  // const userId = "3d0f18bc-70ee-49a6-982c-361806418451";
  const handleTimeChange = (type, newHour) => {
    if (type === "start") {
      setStartHour(newHour);
    } else {
      setEndHour(newHour);
    }
  };

  const handleConsoleChange = (console) => {
    setSelectedConsole(console);
  };

  const confirmReservationPress = async () => {
    // Send data to backend or perform any other action
    const reservationData = {
      startHour,
      endHour,
      selectedConsole,
      userId,
    };

    // Example: Sending the data to a backend function
    const result = await ConfirmReservation(reservationData);
    setReservationResult(result);
  };

  return (
    <View style={styles.container}>
      {/* MyAccButton at the top */}
      <MyAccButton
        buttonText="رزرو"
        buttonImage={require("./assets/timetable 1.png")}
      />

      {/* Console Picker */}
      <Picker
        selectedValue={selectedConsole}
        onValueChange={(itemValue) => handleConsoleChange(itemValue)}
        style={styles.consolePicker}
      >
        <Picker.Item label="PS4" value="ps4" />
        <Picker.Item label="PS5" value="ps5" />
        <Picker.Item label="Xbox" value="xbox" />
      </Picker>

      {/* Time Pickers */}
      <View style={styles.timePickerContainer}>
        {/* Start Time Picker */}
        <Picker
          selectedValue={endHour}
          onValueChange={(itemValue) => handleTimeChange("end", itemValue)}
          style={[styles.picker, styles.leftPicker]}
        >
          {Array.from({ length: 16 }, (_, index) => index + 8).map((hour) => (
            <Picker.Item key={hour} label={`${hour}:00`} value={hour} />
          ))}
        </Picker>
        <Text style={styles.label}>تا</Text>

        {/* End Time Picker */}
        <Picker
          selectedValue={startHour}
          onValueChange={(itemValue) => handleTimeChange("start", itemValue)}
          style={[styles.picker, styles.rightPicker]}
        >
          {Array.from({ length: 16 }, (_, index) => index + 8).map((hour) => (
            <Picker.Item key={hour} label={`${hour}:00`} value={hour} />
          ))}
        </Picker>
        <Text style={styles.label}>از</Text>
      </View>

      {/* Confirm Button at the bottom */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={confirmReservationPress}
      >
        <Text style={styles.confirmButtonText}>تایید رزرو</Text>
      </TouchableOpacity>
      {reservationResult && (
        <Text style={styles.resultText}>{reservationResult}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#323031",
    padding: 8,
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    alignItems: "center",
  },
  picker: {
    width: "40%", // Adjusted width for console picker
    height: 40,
    backgroundColor: "#1C1C1C",
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  leftPicker: {
    borderColor: "#FF324B", // White border color
  },
  rightPicker: {
    borderColor: "#23AA49", // Green border color
  },
  consolePicker: {
    width: "30%", // Adjusted width for console picker
    height: 40,
    backgroundColor: "#1C1C1C",
    color: "white",
    borderColor: "#F3F5F7", // White border color
    borderWidth: 2,
    borderRadius: 10,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontFamily: "iransans",
    marginLeft: 8,
    marginRight: 8,
  },
  confirmButton: {
    width: "80%",
    height: 40,
    backgroundColor: "#1C1C1C",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "iransans",
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'iransans',
    marginTop: 16,
  },
});

export default ReservationScreen;
