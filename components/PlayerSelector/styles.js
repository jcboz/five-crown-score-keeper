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
  delete_button: {
    color: '#007AFF',
    paddingLeft: 5,
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 80,
  },
  nameList: {
    color: '#e6352b',
    textAlign: 'center',
  },
  name_entry: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#007AFF',
    padding: 5,
    textAlign: 'center',
  },
});

export default styles;
