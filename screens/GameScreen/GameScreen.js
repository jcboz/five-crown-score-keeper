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
import runTestDeck from './runTestDeck';
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
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showYouWentOutModal, setShowYouWentOutModal] = useState(false);
  const [playerTurnCounter, setPlayerTurnCounter] = useState(0); // used to keep track of whose turn it is
  const [playerWentOut, setPlayerWentOut] = useState(false); // boolean to check if someone went out and start turnsLeftInRound countdown
  const [turnsLeftInRound, setTurnsLeftInRound] = useState(1); // counter used to give everyone one more turn after someone goes out. i.e. 5 players, player 3 goes out so there are 4 more turns because 4 people get to go once more. When counter is 0 && someone went out, we move to next round
  const [countDownStarted, setCountDownStarted] = useState(false);
  const [deckSelected, setDeckSelected] = useState(false);
  // const [playerMustDiscard, setPlayerMustDiscard] = useState(false);

  const [ready, setReady] = useState(false);

  function initPlayers() {
    const players = [];
    for (let i = 0; i < names.length; i++) {
      players.push({
        id: i,
        name: names[i].name,
        points: 0,
        hand: [],
        subHand: [[], [], [], []],
        hasDiscarded: false,
        discardedCard: {},
      });
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
    // console.log('check this out: ', players[0].subHand.length);
  }

  function shuffle(tempDeck) {
    tempDeck = discardPile;
    setDiscardPile([]);
    return tempDeck;
  }

  const updatePlayerForNewRound = (points) => {
    setPlayers(
      players.map((player, index) => ({
        ...player,
        points: points[index],
        hand: [],
        subHand: [[], [], [], []],
        hasDiscarded: false,
        discardedCard: {},
      })),
    );
  };

  function newRound() {
    // const arrayOfPointsForRound = 5;
    const arrayOfPointsForRound = scorePlayersHands(); // this flow needs to call updatePlayerPoints after it is implemented the same way that updatePlayer was implemented. We're close!
    // console.log('arrayOfPointsForRound: ', arrayOfPointsForRound);
    setReadyToDeal(true);
    setRound(round + 1);
    const t = discardPile;
    const tplayers = players;
    for (let j = 0; j < tplayers.length; j++) {
      for (let i = 0; i < round + 2; i++) {
        t.push(tplayers[j].hand[i].card);
      }
    }
    updatePlayerForNewRound(arrayOfPointsForRound);

    t.push(faceUpCard);
    setCountDownStarted(false);
    setDiscardPile(t);
    setFaceUpCard(null);
    setPlayerTurnCounter(0);
    setPlayerWentOut(false);
    // console.log('Did score players work?: ', players);
  }

  function scorePlayersHands() {
    // TO DO
    // here we want to add up all cards in a player's hands that ARE NOT part of a valid subhand
    const pointArr = []; // the array should be the length of players
    for (let i = 0; i < players.length; i++) {
      // loops through players
      let playerPoints = 0;
      for (let j = 0; j < players[i].subHand.length; j++) {
        // loops through each subhand (four of them)
        if (!isSubhandValid(players[i].subHand[j], round)) {
          playerPoints += addUpPoints(players[i].subHand[j]);
        }
      }
      playerPoints += addUpHand(players[i].hand, players[i].subHand);
      pointArr.push(playerPoints);
    }
    return pointArr;
  }

  function addUpPoints(subhand) {
    let points = 0;
    for (let i = 0; i < subhand.length; i++) {
      // console.log('is isInteger() not real or is subhand undefined?: ', subhand[i].value);
      if (Number.isInteger(subhand[i].value) && subhand[i].value !== round + 2) {
        points += subhand[i].value;
      } else if (subhand[i].value === 'J') {
        points += 11;
      } else if (subhand[i].value === 'Q') {
        points += 12;
      } else if (subhand[i].value === 'K') {
        points += 13;
      } else if (subhand[i].value === 'joker') {
        points += 50;
      } else {
        points += 20;
      }
    }
    // console.log('are points working at all?: ', points);
    return points;
  }

  function addUpHand(hand, subhand) {
    let points = 0;
    // 1. Combine all 4 subhands into one array
    // 2. Loop through hand and compare each card against subhand array
    // 3. if card is not found, add its value to point total and return
    const subArr = subhand[0].concat(subhand[1], subhand[2], subhand[3]);
    const notInSubHand = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const card of hand) {
      if (
        !isCardInSubhand(card.card, subArr) &&
        card !== players[playerTurnCounter].discardedCard
      ) {
        notInSubHand.push(card.card);
      }
    }
    points = addUpPoints(notInSubHand);
    return points;
  }

  // card is always returning false so 20 points are always added which is why minimum is 60. eeek!
  function isCardInSubhand(card, subArr) {
    for (let i = 0; i < subArr.length; i++) {
      if (
        card.value === subArr[i].value &&
        card.suite === subArr[i].suite &&
        card.cardID === subArr[i].cardID
      ) {
        return true;
      }
    }
    return false;
  }

  function showNextPlayer() {
    if (!players[playerTurnCounter].hasDiscarded) {
      Alert.alert('You must discard!');
    } else {
      let t = playerTurnCounter;
      if (t < players.length - 1) {
        t = playerTurnCounter + 1;
      } else {
        t = 0;
      }
      setPlayerTurnCounter(t);
      if (playerWentOut) {
        const count = turnsLeftInRound - 1;
        setTurnsLeftInRound(count);
      }
    }
  }

  function checkHand() {
    let playerCanGoOut = true;
    for (let i = 0; i < players[playerTurnCounter].subHand.length; i++) {
      if (!isSubhandValid(players[playerTurnCounter].subHand[i], round)) {
        playerCanGoOut = false;
        break;
      }
    }

    const subhand = players[playerTurnCounter].subHand;

    if (
      subhand[0].length + subhand[1].length + subhand[2].length + subhand[3].length <
      players[playerTurnCounter].hand.length
    ) {
      console.log('not all cards used!');
      playerCanGoOut = false;
    }

    setCountDownStarted(true);
    if (playerCanGoOut) {
      setPlayerWentOut(true);
      if (!countDownStarted) {
        setTurnsLeftInRound(players.length - 1);
      }
      setShowYouWentOutModal(true);
      console.log('From GameScreen: you can go out!');
    } else {
      console.log("From GameScreen: you can't go out");
    }
    // console.log('players from checkHand: ', players[playerTurnCounter]);
  }

  function getFaceUpCard() {
    const upcard = { item: { suite: faceUpCard.suite, value: faceUpCard.value } };
    // console.log('Deck is (check if face up card is in here): ', currentDeck);
    return <Card {...upcard} />;
  }

  function handleModalBackdropPress() {
    setShowHelpModal(false);
    setShowYouWentOutModal(false);
  }

  function handleDeckPress() {
    if (deckSelected) {
      // add rando deck card to player's hand
      const rand = Math.floor(Math.random() * currentDeck.length);
      const card = currentDeck[rand];
      currentDeck.splice(rand, 1);
      setCurrentDeck(currentDeck);
      console.log('deck check if the card is removed after selecting from deck: ', deck);
      addDeckCardToPlayerHand(card);
      setDeckSelected(false);
      setReady(false);
    } else if (!deckSelected) {
      setDeckSelected(true);
    }
  }

  const addDeckCardToPlayerHand = (card) => {
    const test = players[playerTurnCounter].hand;
    const newArray = [...test, { card, id: 3 }];

    setPlayers(
      players.map((player) => {
        if (player.id === playerTurnCounter) {
          return { ...player, hand: newArray };
        }
        return player;
      }),
    );
  };

  function handleOutDeckPress() {
    setDeckSelected(false);
  }

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <Pressable onPress={() => handleOutDeckPress()}>
        <View style={styles.outerContainer}>
          <HelpButton showModal={showHelpModal} setShowModal={setShowHelpModal} />
          {showHelpModal ? (
            <Modal
              isVisible={showHelpModal}
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
          {showYouWentOutModal ? (
            <Modal
              isVisible={showYouWentOutModal}
              onBackdropPress={() => handleModalBackdropPress()}
              animationIn={'bounceIn'}
              animationOut={'bounceOut'}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.modalContainer}>
                <Text style={{ fontSize: 44, textAlign: 'center' }}> You went out!</Text>
              </View>
            </Modal>
          ) : (
            ''
          )}
          <View style={styles.deckAndFaceUpCardContainer}>
            <Pressable onPress={() => handleDeckPress()} hitSlop={{ bottom: 10 }}>
              {currentDeck.length > 20
                ? currentDeck.slice(0, currentDeck.length / 3).map((card, index) => (
                    <View
                      // eslint-disable-next-line react/no-array-index-key
                      key={card.suite + card.value + index}
                      onLayout={(event) => {
                        const { x, y, width, height } = event.nativeEvent.layout;
                      }}
                      style={
                        deckSelected
                          ? [
                              styles.deckContainer,
                              styles.deckContainerHighlight,
                              { marginTop: -index * 2 },
                            ]
                          : [styles.deckContainer, { marginTop: -index * 2 }]
                      }>
                      <LinearGradient
                        colors={['#905FC3', '#452D5D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ flex: 1, borderColor: '#E7C721', borderRadius: 10 }}
                      />
                    </View>
                  ))
                : currentDeck.map((card, index) => (
                    <View
                      style={
                        deckSelected
                          ? [
                              styles.deckContainer,
                              styles.deckContainerHighlight,
                              { marginTop: -index * 2 },
                            ]
                          : [styles.deckContainer, { marginTop: -index * 2 }]
                      }>
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
            </Pressable>
            {<View style={styles.faceUpCard}>{faceUpCard !== null ? getFaceUpCard() : ''}</View>}
          </View>
          <View style={styles.container}>
            <Pressable onPress={() => deal()} style={styles.button}>
              <Text style={styles.buttonText}>Deal Cards</Text>
            </Pressable>
            {playerWentOut && turnsLeftInRound <= 0 ? (
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
                // console.log('subhand one: ', t);
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
                // console.log('subhand two: ', t);
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
                // console.log('subhand three: ', t);
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
                // console.log('subhand four: ', t);
                setLayoutFour(t);
              });
            }}
            style={styles.subHandFour}
          />
          {console.log('did faceup card change to dragged card?: ', faceUpCard)}
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
            ready={ready}
            setReady={setReady}
            setFaceUpCard={setFaceUpCard}
          />
        </View>
      </Pressable>
    </LinearGradient>
  );
}
