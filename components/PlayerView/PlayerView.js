/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import Card from '../Card/Card';
import Draggable from '../Draggable/Draggable';
import styles from './styles';

export default function PlayerView({ players, layout, round }) {
  const arr = new Array(13).fill('').map((_, i) => i);
  const positions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));
  const subPositions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>{players[0].name}, your cards are:</Text>
      <View style={styles.cards}>
        {players[0].hand.map((item) => (
          <Draggable
            key={item.id}
            positions={positions}
            subPositions={subPositions}
            round={round}
            id={item.id}
            layout={layout}>
            <Card key={item.id} item={item.card} count={item.id} />
          </Draggable>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
