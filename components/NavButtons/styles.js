import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#E7C721',
    borderRadius: 12,
    borderWidth: 2,
    height: 41,
    justifyContent: 'center',
    margin: 15,
    width: 110,
  },
  buttonLeft: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  buttonRight: {
    position: 'absolute',
    right: 0,
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  text: {
    color: 'black',
    fontFamily: 'Shrikhand_400Regular',
    fontSize: 16,
    textShadowRadius: 1,
  },
});

export default styles;
