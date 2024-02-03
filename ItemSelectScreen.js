import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ItemSelectScreen = ({ route, navigation }) => {
  const { id, name, price, amount, image_url, detail } = route.params;
  const imageSource = require(`./assets/${image_url}`);

  const handleAddToCart = () => {
    // Implement your logic for adding the item to the cart
    console.log('Added to cart:', id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Center Top */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      {/* Name Tag */}
      <Text style={[styles.nameTag, { color: '#FFE600' }]}>{name}</Text>

      {/* Price */}
      <Text style={[styles.price, { color: '#FF324B' }]}>{price}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>اضافه به سبد خرید</Text>
      </TouchableOpacity>

      {/* Details */}
      <Text style={styles.details}>{detail}</Text>
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
  imageContainer: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('30%') / 2,
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameTag: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  price: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  details: {
    marginTop: hp('2%'),
    color: '#8DCE10',
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#23AA49',
    paddingVertical: hp('2%'), // Adjusted padding for both vertical sides
    paddingHorizontal: wp('2%'), // Adjusted padding for both horizontal sides
    borderRadius: 8,
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: wp('2%'),
    fontWeight: 'bold',
    textAlign: 'center', // Center the text within the button
  },
});

export default ItemSelectScreen;
