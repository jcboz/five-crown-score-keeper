import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Scorecard from '../Scorecard/Scorecard';
import styles from './styles';

PlayerScores.prototype = {
  playersArr: Array,
};
// eslint-disable-next-line react/prop-types
export default function PlayerScores({ playersArr, testFunc, testBool, scoreFun, scoreArr }) {
  const [players, setPlayers] = useState([]);
  const [show, setShow] = useState(true);
  const [playersLoaded, setPlayersLoaded] = useState(false);
  // playerscores needs to get list of names from PlayerSelector
  const navigation = useNavigation();

  const handleShow = () => {
    if (show === true) {
      setShow(false);
      console.log('set to hide');
    } else {
      setShow(true);
      console.log('set to show');
    }
  };

  const handleQuit = () => {
    playersArr = [];
    setShow(true);
    navigation.navigate('Hang', { names: [] });
  };

  return (
    <View style={styles.fullContainer}>
      {/* {!playersLoaded ? getNumPlayers() : null} */}
      <View style={styles.gameButtons}>
        <Pressable style={styles.hideScoreButton} onPress={handleShow}>
          <Text style={styles.buttonText}>{show ? 'Hide Score' : 'Show Score'}</Text>
        </Pressable>
        <Pressable style={styles.newGameButton} onPress={handleQuit}>
          <Text style={styles.buttonText}>{'New Game'}</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        centerContent
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {
          // eslint-disable-next-line react/prop-types
          playersArr.map((player) => {
            return (
              <Scorecard
                key={player.name}
                playerName={player.name}
                index={player.index}
                isFinished={player.isFinished}
                showScore={show}
                testFunc={(index) => testFunc(index)}
                testBool={testBool}
                scoreFun={(index, score) => scoreFun(index, score)}
                scoreArr={scoreArr}
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}
