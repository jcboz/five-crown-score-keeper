/* eslint-disable prettier/prettier */
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import PlayerView from '../../components/PlayerView/PlayerView';
import canGoOut from './canGoOut';
import deck from './deck';
import styles from './styles';

export default function GameScreen() {
  const route = useRoute();
  const names = route.params?.names;

  const [players, setPlayers] = useState(() => initPlayers());
  const [round, setRound] = useState(1);
  const [currentDeck, setCurrentDeck] = useState(deck);
  const [readyToDeal, setReadyToDeal] = useState(true);
  const [faceUpCard, setFaceUpCard] = useState();

  function initPlayers() {
    const players = [];
    for (let i = 0; i < names.length; i++) {
      players.push({ id: i, name: names[i].name, hand: [] });
    }
    return players;
  }

  function deal() {
    if (readyToDeal) {
      for (let i = 0; i < round + 2; i++) {
        for (let j = 0; j < players.length; j++) {
          const rand = Math.floor(Math.random() * currentDeck.length);
          setPlayers([...players], players[j].hand.push(currentDeck[rand]));
          currentDeck.splice(rand, 1);
          setCurrentDeck([...currentDeck]);
        }
      }
      const rand = Math.floor(Math.random() * currentDeck.length);
      console.log(currentDeck[rand]);
      setFaceUpCard(currentDeck[rand]);
      currentDeck.splice(rand, 1);
      setReadyToDeal(false);
    } else {
      Alert.alert("Round isn't over");
    }
  }

  function newRound() {
    setReadyToDeal(true);
    setRound(round + 1);
    for (let j = 0; j < players.length; j++) {
      setPlayers([...players], players[j].hand.splice(0, players[j].hand.length));
    }
  }

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <PlayerView players={players} />
      <Text style={styles.text}>
        It is round {round}. The deck is: {currentDeck}
      </Text>
      <Text style={styles.textFaceUpCard}>The face up card is {faceUpCard}</Text>
      <View style={styles.container}>
        <Pressable onPress={() => deal()} style={styles.button}>
          <Text style={styles.buttonText}>Deal Cards</Text>
        </Pressable>
        <Pressable onPress={() => newRound()} style={styles.button}>
          <Text style={styles.buttonText}>Next Round</Text>
        </Pressable>
        <Pressable onPress={() => canGoOut(round, players)} style={styles.button}>
          <Text style={styles.buttonText}>Check Hand</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
