// MyAccButton.js
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

const MyAccButton = ({ buttonText, buttonImage, onPress }) => {
  return (
    <TouchableOpacity style={styles.outerContainer} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Image source={buttonImage} style={styles.image} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
      <View style={styles.secondRectangle}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    margin: 40, // Adjust the margin as needed
  },
  buttonContainer: {
    backgroundColor: 'rgba(9, 108, 124, 0.28)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: -50,
    zIndex: 2,
  },
  secondRectangle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 108, 124, 1)',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default MyAccButton;
