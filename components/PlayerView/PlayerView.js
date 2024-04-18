/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import Card from '../Card/Card';
import Draggable from '../Draggable/Draggable';
import styles from './styles';

export default function PlayerView({ players }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{players[0].name}, your cards are:</Text>
      <View style={styles.cards}>
        {players[0].hand.map((item) => (
          <Draggable key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
