import React, { Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  abs: { position: 'absolute' },
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

export default function Logo() {
  return (
    <>
      <Text style={[styles.text, styles.abs, { textShadowOffset: { width: -2, height: -2 } }]}>
        5👑
      </Text>
      <Text style={[styles.text, styles.abs, { textShadowOffset: { width: -2, height: 3 } }]}>
        5👑
      </Text>
      <Text style={[styles.text, styles.abs, { textShadowOffset: { width: 3, height: -2 } }]}>
        5👑
      </Text>
    </>
  );
}
