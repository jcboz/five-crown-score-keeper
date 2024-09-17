import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Appearance,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

import PlayerScores from '../../components/PlayerScores/PlayerScores';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  lightContainer: {
    color: '#000',
  },
  lightThemeText: {
    color: '#fff',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 44,
    height: '75%',
    justifyContent: 'center',
    width: '75%',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  text: {
    fontFamily: 'Inter_300Light',
  },
});

function HomeScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const route = useRoute();
  const names = route.params?.names;
  const testNum = 0;
  const [boolArr, setBoolArr] = useState(initBoolArr());
  const [scoreArr, setScoreArr] = useState(initScoreArr());

  const [showModal, setShowModal] = useState(false);

  function getWinner() {
    const winners = [];
    const winningScore = Math.min(...scoreArr);
    console.log('scoreArr: ', scoreArr);
    console.log('winningScore: ', winningScore);
    let winnerIndex = scoreArr.indexOf(winningScore);

    while (winnerIndex !== -1) {
      winners.push(winnerIndex);
      winnerIndex = scoreArr.indexOf(winningScore, winnerIndex + 1);
    }
    console.log('winnerIndexes: ', winners);
    const nameArr = [];
    for (let i = 0; i < winners.length; i++) {
      nameArr.push(names[winners[i]].name);
    }
    console.log('winners: ', nameArr);

    if (nameArr.length === 1) {
      return nameArr + 'wins!';
    }

    const messageArr = nameArr.join(', ');
    // console.log('nameArr: ', messageArr);
    return messageArr + ' tie!';
  }

  function handleBoolArr(index) {
    const copy = boolArr;
    copy[index - 1] = true;
    console.log('copy: ', copy);
    setBoolArr(copy);
    console.log('boolArr: ', boolArr);
    if (gameIsOver() === true) {
      console.log('is it getting set here?');
      setShowModal(true);
    }
  }

  function handleScoreArr(index, score) {
    console.log('index, ', index, 'score: ', score);
    const copy = scoreArr;
    copy[index - 1] = score;
    console.log('copy: ', copy);
    setScoreArr(copy);
  }

  function initBoolArr() {
    const t = [];
    for (let i = 0; i < names.length; i++) {
      t.push(false);
    }
    return t;
  }

  function initScoreArr() {
    const t = [];
    for (let i = 0; i < names.length; i++) {
      t.push(0);
    }
    return t;
  }

  function handleBackPress() {
    setShowModal(false);
    console.log('cjhecking it');
  }

  function gameIsOver() {
    for (let i = 0; i < boolArr.length; i++) {
      if (!boolArr[i] === true) {
        return false;
      }
    }
    return true;
  }

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <View>
        <Modal
          isVisible={showModal}
          onBackdropPress={() => handleBackPress()}
          animationIn={'bounceIn'}
          animationOut={'bounceOut'}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 44 }}> {getWinner()}</Text>
          </View>
        </Modal>
      </View>
      <KeyboardAwareScrollView>
        <View style={[styles.container, themeContainerStyle]}>
          <PlayerScores
            playersArr={names}
            testFunc={(index) => handleBoolArr(index)}
            testBool={boolArr}
            scoreFun={(index, score) => handleScoreArr(index, score)}
            scoreArr={scoreArr}
          />
          {/* {names.map((name) => {
            return <Text key={name.index}>{name.name}</Text>;
          })} */}
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
