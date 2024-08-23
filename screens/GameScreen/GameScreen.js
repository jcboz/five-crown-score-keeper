/* eslint-disable prettier/prettier */
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

import Card from '../../components/Card/Card';
import HelpButton from '../../components/HelpButton/HelpButton';
import { MARGIN_LEFT } from '../../components/Layout';
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
  const [tlayoutTwo, setLayoutTwo] = useState([]);
  const [tlayoutThree, setLayoutThree] = useState([]);
  const [tlayoutFour, setLayoutFour] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [playerTurnCounter, setPlayerTurnCounter] = useState(0);

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
    setPlayerTurnCounter(0);
  }

  function showNextPlayer() {
    console.log('hello: ', playerTurnCounter);
    const t = playerTurnCounter + 1;
    setPlayerTurnCounter(t);
    console.log('goodbye: ', t);
  }

  function checkHand() {
    if (isSubhandValid(players[playerTurnCounter], round)) {
      console.log('From GameScreen: you can go out!');
    } else {
      console.log("From GameScreen: you can't go out");
    }
    console.log('players from checkHand: ', players[playerTurnCounter]);
  }

  function getFaceUpCard() {
    const upcard = { item: { suite: faceUpCard.suite, value: faceUpCard.value } };
    console.log('Deck is (check if face up card is in here): ', currentDeck);
    return <Card {...upcard} />;
  }

  function handleModalBackdropPress() {
    setShowModal(false);
  }

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <View style={styles.outerContainer}>
        <HelpButton showModal={showModal} setShowModal={setShowModal} />
        {showModal ? (
          <Modal
            isVisible={showModal}
            onBackdropPress={() => handleModalBackdropPress()}
            animationIn={'bounceIn'}
            animationOut={'bounceOut'}
            style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.modalContainer}>
              <Text style={{ fontSize: 44, textAlign: 'center' }}> Help is on the way!</Text>
            </View>
          </Modal>
        ) : (
          ''
        )}
        <View style={styles.deckAndFaceUpCardContainer}>
          {currentDeck.length > 20
            ? currentDeck.slice(0, currentDeck.length / 3).map((card, index) => (
                <View
                  // eslint-disable-next-line react/no-array-index-key
                  key={card.suite + card.value + index}
                  onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                  }}
                  style={[styles.deckContainer, { marginTop: -index * 2 }]}>
                  <LinearGradient
                    colors={['#905FC3', '#452D5D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1, borderColor: '#E7C721', borderRadius: 10 }}
                  />
                </View>
              ))
            : currentDeck.map((card, index) => (
                <View style={[styles.deckContainer, { marginTop: -index * 2, marginLeft: -83.33 }]}>
                  <View
                    // eslint-disable-next-line react/no-array-index-key
                    key={card.suite + card.value + index}
                    style={styles.deck}>
                    <LinearGradient
                      colors={['#905FC3', '#452D5D']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{ flex: 1, borderColor: 'red', borderRadius: 10 }}
                    />
                  </View>
                </View>
              ))}
          {<View style={styles.faceUpCard}>{faceUpCard !== null ? getFaceUpCard() : ''}</View>}
        </View>
        <View style={styles.container}>
          <Pressable onPress={() => deal()} style={styles.button}>
            <Text style={styles.buttonText}>Deal Cards</Text>
          </Pressable>
          {players[players.length - 1].id === playerTurnCounter ? (
            <Pressable onPress={() => newRound()} style={styles.button}>
              <Text style={styles.buttonText}>Next Round</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => showNextPlayer()} style={styles.button}>
              <Text style={styles.buttonText}>Next Player</Text>
            </Pressable>
          )}
          <Pressable onPress={() => checkHand()} style={styles.button}>
            <Text style={styles.buttonText}>Check Subhand</Text>
          </Pressable>
        </View>
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = tlayout;
              t.push({ x, y, width, height, pageX, pageY });
              console.log('subhand one: ', t);
              setLayout(t);
            });
          }}
          style={styles.subHandOne}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = tlayoutTwo;
              t.push({ x, y, width, height, pageX, pageY });
              console.log('subhand two: ', t);
              setLayoutTwo(t);
            });
          }}
          style={styles.subHandTwo}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = tlayoutThree;
              t.push({ x, y, width, height, pageX, pageY });
              console.log('subhand Three: ', t);
              setLayoutThree(t);
            });
          }}
          style={styles.subHandThree}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = tlayoutFour;
              t.push({ x, y, width, height, pageX, pageY });
              console.log('subhand Four: ', t);
              setLayoutFour(t);
            });
          }}
          style={styles.subHandFour}
        />
        <PlayerView
          style={styles.playerView}
          players={players}
          setPlayers={setPlayers}
          round={round + 2}
          playerTurnCounter={playerTurnCounter}
          layout={tlayout}
          layoutTwo={tlayoutTwo}
          layoutThree={tlayoutThree}
          layoutFour={tlayoutFour}
        />
      </View>
    </LinearGradient>
  );
}
