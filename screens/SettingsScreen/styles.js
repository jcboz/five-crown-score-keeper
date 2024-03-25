import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  buttons: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#E7C721',
    borderRadius: 12,
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    margin: 10,
    width: 220,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  lightContainer: {
    color: '#000',
  },
  lightThemeText: {
    color: '#fff',
  },
  menu_button: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    shadowoffset: { width: 5, height: 5 },
    width: 100,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  text: {
    color: 'white',
    fontFamily: 'Shrikhand_400Regular',
    fontSize: 96,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 1,
  },
});

export default styles;
