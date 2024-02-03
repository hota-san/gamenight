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
import handleAddItem from "./backend/handleAddItem";
const { width } = Dimensions.get("window");

const AddItemScreen = ({ route }) => {
  const [itemName, setItemName] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(""); // State to store the result
  const { userId } = route.params;
  const handleAddItemPress = async () => {
    // Call handleAddItem function and update the result state
    const resultMessage = await handleAddItem(
      itemName,
      imageUpload,
      description,
      quantity,
      price
    );
    setResult(resultMessage);
  };

  const logoWidth = width * 0.8;
  const logoHeight = (logoWidth * 119) / 442;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>نام کالا</Text>
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder="نام کالا را وارد کنید"
          textAlign="right"
        />

        <Text style={styles.label}>آپلود تصویر</Text>
        <TextInput
          style={styles.input}
          value={imageUpload}
          onChangeText={setImageUpload}
          placeholder="آپلود تصویر"
          textAlign="right"
        />

        <Text style={styles.label}>تعداد</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="تعداد"
          keyboardType="numeric"
          textAlign="right"
        />

        <Text style={styles.label}>قیمت</Text>
        <TextInput
          style={styles.input} // Make this larger as well
          value={price}
          onChangeText={setPrice}
          placeholder="قیمت"
          keyboardType="numeric"
          textAlign="right"
        />

        <Text style={styles.largeLabel}>توضیحات</Text>
        <TextInput
          style={styles.largeInput}
          value={description}
          onChangeText={setDescription}
          placeholder="توضیحات را وارد کنید"
          textAlign="right"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddItemPress}>
          <Text style={styles.buttonText}>ثبت کالا</Text>
        </TouchableOpacity>
        {/* Display the result below the button */}
        {result ? <Text style={styles.resultText}>{result}</Text> : null}
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
  largeLabel: {
    fontSize: 22, // Larger font size for the detail label
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

export default AddItemScreen;
