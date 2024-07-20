/* eslint-disable prettier/prettier */
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import Card from '../../components/Card/Card';
import PlayerView from '../../components/PlayerView/PlayerView';
import canGoOut from './canGoOut';
import deck from './deck';
import isSubhandValid from './GameLogic';
import styles from './styles';

export default function GameScreen() {
  const route = useRoute();
  const names = route.params?.names;

  const [players, setPlayers] = useState(() => initPlayers());
  const [round, setRound] = useState(1);
  const [currentDeck, setCurrentDeck] = useState(deck);
  const [discardPile, setDiscardPile] = useState([]);
  const [readyToDeal, setReadyToDeal] = useState(true);
  const [faceUpCard, setFaceUpCard] = useState(null);
  const [tlayout, setLayout] = useState([]);

  function initPlayers() {
    const players = [];
    for (let i = 0; i < names.length; i++) {
      players.push({ id: i, name: names[i].name, hand: [], subHand: [] });
    }
    return players;
  }

  function deal() {
    if (readyToDeal) {
      let tempDeck = currentDeck;
      const tempPlayers = players;
      for (let i = 0; i < round + 2; i++) {
        for (let j = 0; j < players.length; j++) {
          if (tempDeck.length === 0) {
            tempDeck = shuffle(tempDeck);
          }
          const rand = Math.floor(Math.random() * tempDeck.length);
          tempPlayers[j].hand.push({ card: tempDeck[rand], id: i });
          tempDeck.splice(rand, 1);
        }
      }
      const rand = Math.floor(Math.random() * tempDeck.length);
      setFaceUpCard(tempDeck[rand]);
      tempDeck.splice(rand, 1);
      setCurrentDeck(tempDeck);
      setPlayers([...tempPlayers]);
      setReadyToDeal(false);
    } else {
      Alert.alert("Round isn't over");
    }
  }

  function shuffle(tempDeck) {
    tempDeck = discardPile;
    setDiscardPile([]);
    return tempDeck;
  }

  function newRound() {
    setReadyToDeal(true);
    setRound(round + 1);
    const t = discardPile;
    for (let j = 0; j < players.length; j++) {
      for (let i = 0; i < round + 2; i++) {
        t.push(players[j].hand[i].card);
      }
      setPlayers([...players], players[j].hand.splice(0, players[j].hand.length));
    }
    t.push(faceUpCard);
    setDiscardPile(t);
    setFaceUpCard(null);
  }

  function checkHand() {
    if (isSubhandValid(players[0], round)) {
      console.log('From GameScreen: you can go out!');
    } else {
      console.log("From GameScreen: you can't go out");
    }
    console.log('players: ', players[0]);
  }

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <View style={styles.outerContainer}>
        <Text style={styles.text}>
          It is round {round}. Wilds are: {round + 2}'s. There are {currentDeck.length} cards left.
          {'\n'}The deck is:{'\n'}
          {currentDeck.map((card) => card.value + ' of ' + card.suite + 's, ')}
          {'\n'}
          {'\n'}The discard Pile ({discardPile.length}) is:{'\n'}
          {discardPile.map((card) => card.value + ' of ' + card.suite + 's, ')}
        </Text>
        <Text style={styles.textFaceUpCard}>
          The face up card is{' '}
          {faceUpCard !== null ? faceUpCard.value + ' of ' + faceUpCard.suite : ''}
        </Text>
        <View style={styles.container}>
          <Pressable onPress={() => deal()} style={styles.button}>
            <Text style={styles.buttonText}>Deal Cards</Text>
          </Pressable>
          <Pressable onPress={() => newRound()} style={styles.button}>
            <Text style={styles.buttonText}>Next Round</Text>
          </Pressable>
          <Pressable onPress={() => checkHand()} style={styles.button}>
            <Text style={styles.buttonText}>Check Subhand</Text>
          </Pressable>
        </View>
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = tlayout;
              t.push({ x, y, width, height, pageX, pageY });
              setLayout(t);
            });
          }}
          style={styles.subHand}
        />
        <PlayerView
          style={styles.playerView}
          players={players}
          setPlayers={setPlayers}
          round={round + 2}
          layout={tlayout}
        />
      </View>
    </LinearGradient>
  );
}
