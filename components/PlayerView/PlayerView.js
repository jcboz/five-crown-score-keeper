/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import Card from '../Card/Card';
import CardList from '../CardList/CardList';
import Draggable from '../Draggable/Draggable';
import styles from './styles';

export default function PlayerView({ players, setPlayers, layout, round }) {
  const arr = new Array(13).fill('').map((_, i) => i);
  const positions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));
  const subPositions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));

  if (players[0].hand.length > 0) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.text}>{players[0].name}, your cards are:</Text>
        <View style={styles.cards}>
          <CardList players={players} setPlayers={setPlayers}>
            {players[0].hand.map((item) => (
              <Card key={item.id} item={item.card} count={item.id} />
            ))}
          </CardList>
        </View>
      </GestureHandlerRootView>
    );
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>{players[0].name}, your cards are:</Text>
      <View style={styles.cards} />
    </GestureHandlerRootView>
  );
}
