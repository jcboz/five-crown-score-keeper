/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';

import { CARD_HEIGHT, MARGIN_LEFT, MARGIN_TOP } from './Layout';

function Placeholder({ offset }) {
  return (
    <View
      style={{
        backgroundColor: '#E6E5E6',
        position: 'absolute',
        top: offset.originalY.value + MARGIN_TOP + 2,
        left: offset.originalX.value - MARGIN_LEFT + 2,
        width: offset.width.value - 4,
        height: CARD_HEIGHT - 6,
        borderRadius: 8,
      }}
    />
  );
}

export default Placeholder;
