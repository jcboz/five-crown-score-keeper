import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
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
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowRadius: 10,
    // shadowoffset: { width: 5, height: 5 },
    width: 80,
  },
  nameCard: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default styles;
