/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import Card from '../Card/Card';
import CardList from '../CardList/CardList';
import Draggable from '../Draggable/Draggable';
import styles from './styles';

export default function PlayerView({ players, setPlayers, layout, round, playerTurnCounter }) {
  const arr = new Array(13).fill('').map((_, i) => i);
  const positions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));
  const subPositions = useSharedValue(Object.assign({}, ...arr.map((item) => ({ [item]: item }))));

  const player = initPlayer();

  function initPlayer() {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === playerTurnCounter) {
        console.log('peepee: ', players[i]);
        return players[i];
      }
    }
    return players[0];
  }

  console.log(
    '\nPlayer 1 hand: ',
    JSON.stringify(players[0]),
    '\nPlayer 2 hand: ',
    JSON.stringify(players[1]),
  );

  if (player.hand.length > 0) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.cards}>
          {console.log('does it update?: ', player)}
          <CardList players={players} setPlayers={setPlayers}>
            {player.hand.map((item) => (
              <Card key={item.id} item={item.card} count={item.id} />
            ))}
          </CardList>
        </View>
      </GestureHandlerRootView>
    );
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cards} />
    </GestureHandlerRootView>
  );
}
