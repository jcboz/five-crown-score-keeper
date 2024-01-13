import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import Scorecard from '../Scorecard/Scorecard';
import styles from './styles';

PlayerScores.prototype = {
  playersArr: Array,
};
// eslint-disable-next-line react/prop-types
export default function PlayerScores({ playersArr }) {
  const [players, setPlayers] = useState([]);
  const [show, setShow] = useState(true);
  const [playersLoaded, setPlayersLoaded] = useState(false);
  // playerscores needs to get list of names from PlayerSelector
  const navigation = useNavigation();

  const getNumPlayers = () => {
    // eslint-disable-next-line array-callback-return, react/prop-types
    playersArr.map((player) => {
      setPlayers([...players, <Scorecard playerName={player.name} />]);
    });
    console.log('players: ', players);
    setPlayersLoaded(true);
  };

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
      <View style={styles.container}>
        {
          // eslint-disable-next-line react/prop-types
          playersArr.map((player) => {
            return <Scorecard key={player.name} playerName={player.name} showScore={show} />;
          })
        }
      </View>
    </View>
  );
}
