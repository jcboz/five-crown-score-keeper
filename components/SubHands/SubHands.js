/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CARD_HEIGHT, CARD_WIDTH, NUMBER_OF_SUBHANDS } from '../Layout';

function SubHands() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {new Array(NUMBER_OF_SUBHANDS).fill(0).map((_, index) => (
        <View
          key={index * CARD_HEIGHT}
          style={{
            top: index * CARD_HEIGHT - 2,
            width: '100%',
            height: 124,
            backgroundColor: 'yellow',
            opacity: 0.5,
            borderRadius: 10,
          }}
        />
      ))}
    </View>
  );
}

export default SubHands;
