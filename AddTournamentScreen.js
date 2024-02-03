import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Picker,
} from "react-native";
import handleAddTournament from "./backend/handleAddTournament";
const { width } = Dimensions.get("window");

const AddTournamentScreen = ({ route }) => {
  const [name, setName] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTime, setSelectedTime] = useState("08:00"); // Default time
  const [selectedMonth, setSelectedMonth] = useState("01"); // Default month
  const [selectedDay, setSelectedDay] = useState("01"); // Default day
  const [remainingSpots, setRemainingSpots] = useState("4"); // Default spots
  const [detail, setDetail] = useState("");
  const [result, setResult] = useState("");
  const { userId } = route.params;
  // Generate time options (8 am to 23 pm)
  const timeOptions = Array.from({ length: 16 }, (_, index) => {
    const hour = index + 8;
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    return { label: `${formattedHour}:00`, value: `${formattedHour}:00` };
  });

  const monthOptions = [
    { label: "فروردین", value: "01" },
    { label: "اردیبهشت", value: "02" },
    { label: "خرداد", value: "03" },
    { label: "تیر", value: "04" },
    { label: "مرداد", value: "05" },
    { label: "شهریور", value: "06" },
    { label: "مهر", value: "07" },
    { label: "آبان", value: "08" },
    { label: "آذر", value: "09" },
    { label: "دی", value: "10" },
    { label: "بهمن", value: "11" },
    { label: "اسفند", value: "12" },
  ];

  // Generate day options based on the selected month
  const generateDayOptions = () => {
    const selectedMonthDays = Array.from({ length: 31 }, (_, index) => {
      const day = index + 1;
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      return { label: formattedDay, value: formattedDay };
    });

    return selectedMonthDays;
  };

  const dayOptions = generateDayOptions();

  const handleAddTournamentPress = async () => {
    const tornomentData = {
      userId,
      name,
      entryFee,
      imageUrl,
      selectedTime,
      selectedMonth,
      selectedDay,
      remainingSpots,
      detail,
    };

    const result = await handleAddTournament(tornomentData);
    setResult(result);
  };

  const logoWidth = width * 0.8;
  const logoHeight = (logoWidth * 119) / 442;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>نام تورنومنت</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="نام تورنومنت را وارد کنید"
          textAlign="right"
        />

        <Text style={styles.label}>هزینه ورود به تورنومنت</Text>
        <TextInput
          style={styles.input}
          value={entryFee}
          onChangeText={setEntryFee}
          placeholder="هزینه ورود به تورنومنت"
          keyboardType="numeric"
          textAlign="right"
        />

        <Text style={styles.label}>لینک تصویر</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="لینک تصویر"
          textAlign="right"
        />

        <Text style={styles.label}>زمان شروع</Text>
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue) => setSelectedTime(itemValue)}
          style={styles.picker}
        >
          {timeOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>

        <Text style={styles.label}>ماه</Text>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          {monthOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>

        <Text style={styles.label}>روز</Text>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
          style={styles.picker}
        >
          {generateDayOptions(selectedMonth).map((dayOption) => (
            <Picker.Item
              key={dayOption.value}
              label={dayOption.label}
              value={dayOption.value}
            />
          ))}
        </Picker>

        <Text style={styles.label}>تعداد افراد تورنومنت</Text>
        <Picker
          selectedValue={remainingSpots}
          onValueChange={(itemValue) => setRemainingSpots(itemValue)}
          style={styles.picker}
        >
          {/* Add remaining spots options as needed */}
          <Picker.Item label="4" value="4" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="16" value="16" />
          <Picker.Item label="32" value="32" />
          {/* Add more remaining spots options */}
        </Picker>

        <Text style={styles.label}>توضیحات</Text>
        <TextInput
          style={styles.largeInput}
          value={detail}
          onChangeText={setDetail}
          placeholder="توضیحات را وارد کنید"
          textAlign="right"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddTournamentPress}
        >
          <Text style={styles.buttonText}>ثبت تورنومنت</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>{result}</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#323031",
    padding: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#8DCE10",
    textAlign: "right",
  },
  input: {
    color: "#1C1C1C",
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlign: "right",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  largeInput: {
    color: "#1C1C1C",
    width: "80%",
    height: 150, // Larger height for the detail input
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlign: "right",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  picker: {
    color: "#1C1C1C",
    width: "80%",
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#1C1C1C",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "iransans",
  },
  resultText: {
    color: "white",
    fontSize: 16,
    fontFamily: "iransans",
    marginTop: 8,
    textAlign: "center",
  },
});

export default AddTournamentScreen;
