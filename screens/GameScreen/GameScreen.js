import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

import deck from './deck';
import styles from './styles';

export default function GameScreen() {
  const [players, setPlayers] = useState([{ id: 0, name: 'Julian', score: 0, hand: [] }]);
  const [round, setRound] = useState(1);
  const [currentDeck, setCurrentDeck] = useState(deck);

  function deal() {
    const updatePlayers = players;
    for (let i = 0; i < round + 2; i++) {
      for (let j = 0; j < players.length; j++) {
        const rand = Math.floor(Math.random() * currentDeck.length);
        updatePlayers[j].hand.push(currentDeck[rand]);
        console.log(updatePlayers[j].hand);
        currentDeck.splice(rand, 1);
        console.log('currentDeck: ', currentDeck);
        setCurrentDeck(currentDeck);
      }
    }
    setPlayers(updatePlayers);
    console.log('players: ', players);
  }

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <Text>
        Hello, {players.map((player) => player.name)}. It is round {round}, your cards are:
        {players.map((player) => player.hand)} and the deck is now {currentDeck}
      </Text>
      <Pressable onPress={() => deal()} style={styles.button}>
        <Text>Deal Cards</Text>
      </Pressable>
      <Pressable onPress={() => setRound(round + 1)} style={styles.button}>
        <Text>Next Round</Text>
      </Pressable>
    </LinearGradient>
  );
}
