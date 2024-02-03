import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = ({ id, name, price, amount, image_url, detail, onAddToCart }) => {
  const navigation = useNavigation();
  const handleImagePress = () => {
    // Navigate to ItemSelectScreen with respective product details
    navigation.navigate("ItemSelect", {
      id,
      name,
      price,
      amount,
      image_url,
      detail,
    });
  };

  let imageSource;
  console.log(image_url);
  try {
    imageSource = require(`./assets/${image_url}`);
  } catch (error) {
    // If the image file does not exist, use a default image
    imageSource = require("./assets/no-photo.png");
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={imageSource} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{`قیمت: ${price}`}</Text>
      <Text style={styles.amount}>{`موجودی: ${amount}`}</Text>
      {/* <Text style={styles.detail}>{`جزئیات: ${detail}`}</Text> */}
      <TouchableOpacity onPress={onAddToCart} style={styles.addToCartButton}>
        <Image
          source={require("./assets/Add_icon.png")}
          style={styles.addToCartButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 8,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: "#FF324B",
    marginBottom: 8,
  },
  amount: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  addToCartButton: {
    // backgroundColor: '#096C7C',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center", // Center the image within the TouchableOpacity
  },
  addToCartButtonImage: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    // tintColor: 'white', // Adjust the color of the image if needed
  },
});

export default Item;
