import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    width: '100%',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  developerButton: {
    right: 0,
    top: 0,
  },
  lightContainer: {
    color: '#000',
  },
  lightThemeText: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontFamily: 'Inter_300Light',
  },
});

export default styles;
