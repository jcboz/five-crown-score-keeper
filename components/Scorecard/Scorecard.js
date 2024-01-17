import React, { useEffect, useRef, useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';

import styles from './styles';

// I think that calculate function needs to be it's own function and there is a useRef for what is currently in each textput input and then they are all added up each time, not just one grand total variable that is added to.

// eslint-disable-next-line react/prop-types
export default function Scorecard({
  // eslint-disable-next-line react/prop-types
  playerName,
  // eslint-disable-next-line react/prop-types
  index,
  // eslint-disable-next-line react/prop-types
  showScore,
  // eslint-disable-next-line react/prop-types
  testFunc,
  // eslint-disable-next-line react/prop-types
  scoreFun,
  // eslint-disable-next-line react/prop-types
  scoreArr,
}) {
  const [number1, setNumber1] = useState(-1);
  const [number2, setNumber2] = useState(-1);
  const [number3, setNumber3] = useState(-1);
  const [number4, setNumber4] = useState(-1);
  const [number5, setNumber5] = useState(-1);
  const [number6, setNumber6] = useState(-1);
  const [number7, setNumber7] = useState(-1);
  const [number8, setNumber8] = useState(-1);
  const [number9, setNumber9] = useState(-1);
  const [number10, setNumber10] = useState(-1);
  const [number11, setNumber11] = useState(-1);
  const [number12, setNumber12] = useState(-1);
  const [number13, setNumber13] = useState(-1);

  const [score, setScore] = useState(0);
  // const [show, setShow] = useState(true);

  const handle1change = (number1) => {
    // if (typeof number1 !== 'number') return;
    setNumber1(number1);
  };

  const handle2change = (number2) => {
    setNumber2(number2);
  };

  const handle3change = (number3) => {
    setNumber3(number3);
  };

  const handle4change = (number4) => {
    setNumber4(number4);
  };

  const handle5change = (number5) => {
    setNumber5(number5);
  };

  const handle6change = (number6) => {
    setNumber6(number6);
  };

  const handle7change = (number7) => {
    setNumber7(number7);
  };

  const handle8change = (number8) => {
    setNumber8(number8);
  };

  const handle9change = (number9) => {
    setNumber9(number9);
  };

  const handle10change = (number10) => {
    setNumber10(number10);
  };

  const handle11change = (number11) => {
    setNumber11(number11);
  };

  const handle12change = (number12) => {
    setNumber12(number12);
  };

  const handle13change = (number13) => {
    setNumber13(number13);
    console.log('how many times does this get called');
  };

  const getScoreTotal = () => {
    let score1;
    let score2;
    let score3;
    let score4;
    let score5;
    let score6;
    let score7;
    let score8;
    let score9;
    let score10;
    let score11;
    let score12;
    let score13;

    if (parseInt(number1, 10) >= 0) {
      score1 = parseInt(number1, 10);
    } else {
      score1 = 0;
    }
    if (parseInt(number2, 10) >= 0) {
      score2 = parseInt(number2, 10);
    } else {
      score2 = 0;
    }
    if (parseInt(number3, 10) >= 0) {
      score3 = parseInt(number3, 10);
    } else {
      score3 = 0;
    }
    if (parseInt(number4, 10) >= 0) {
      score4 = parseInt(number4, 10);
    } else {
      score4 = 0;
    }
    if (parseInt(number5, 10) >= 0) {
      score5 = parseInt(number5, 10);
    } else {
      score5 = 0;
    }
    if (parseInt(number6, 10) >= 0) {
      score6 = parseInt(number6, 10);
    } else {
      score6 = 0;
    }
    if (parseInt(number7, 10) >= 0) {
      score7 = parseInt(number7, 10);
    } else {
      score7 = 0;
    }
    if (parseInt(number8, 10) >= 0) {
      score8 = parseInt(number8, 10);
    } else {
      score8 = 0;
    }
    if (parseInt(number9, 10) >= 0) {
      score9 = parseInt(number9, 10);
    } else {
      score9 = 0;
    }
    if (parseInt(number10, 10) >= 0) {
      score10 = parseInt(number10, 10);
    } else {
      score10 = 0;
    }
    if (parseInt(number11, 10) >= 0) {
      score11 = parseInt(number11, 10);
    } else {
      score11 = 0;
    }
    if (parseInt(number12, 10) >= 0) {
      score12 = parseInt(number12, 10);
    } else {
      score12 = 0;
    }
    if (parseInt(number13, 10) >= 0) {
      score13 = parseInt(number13, 10);
    } else {
      score13 = 0;
    }

    const tot =
      score1 +
      score2 +
      score3 +
      score4 +
      score5 +
      score6 +
      score7 +
      score8 +
      score9 +
      score10 +
      score11 +
      score12 +
      score13;

    scoreFun(index, tot);

    return tot;
  };

  function checkIfFinished(
    score1,
    score2,
    score3,
    score4,
    score5,
    score6,
    score7,
    score8,
    score9,
    score10,
    score11,
    score12,
    score13,
  ) {
    if (
      score1 >= 0 &&
      score2 >= 0 &&
      score3 >= 0 &&
      score4 >= 0 &&
      score5 >= 0 &&
      score6 >= 0 &&
      score7 >= 0 &&
      score8 >= 0 &&
      score9 >= 0 &&
      score10 >= 0 &&
      score11 >= 0 &&
      score12 >= 0 &&
      score13 >= 0
    ) {
      // isFinished = true;
      console.log('index from Scorecard: ', index);
      testFunc(index);
    }
  }

  function handleFinish() {
    if (number13.prev !== number13) {
      checkIfFinished(
        number1,
        number2,
        number3,
        number4,
        number5,
        number6,
        number7,
        number8,
        number9,
        number10,
        number11,
        number12,
        number13,
      );
    }
  }

  return (
    <View>
      <Text style={styles.nameCard}>{playerName}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(number1) => handle1change(number1)}
          value={number1}
          placeholder="score"
          keyboardType="numeric"
        />
        {number1 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number2) => handle2change(number2)}
            value={number2}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number2 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number3) => handle3change(number3)}
            value={number3}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number3 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number4) => handle4change(number4)}
            value={number4}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number4 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number5) => handle5change(number5)}
            value={number5}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number5 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number6) => handle6change(number6)}
            value={number6}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number6 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number7) => handle7change(number7)}
            value={number7}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number7 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number8) => handle8change(number8)}
            value={number8}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number8 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number9) => handle9change(number9)}
            value={number9}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number9 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number10) => handle10change(number10)}
            value={number10}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number10 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number11) => handle11change(number11)}
            value={number11}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number11 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number12) => handle12change(number12)}
            value={number12}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number12 >= 0 ? (
          <TextInput
            style={styles.input}
            onChangeText={(number13) => handle13change(number13)}
            onEndEditing={() => handleFinish()}
            value={number13}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
      </View>
      <Text style={styles.text}>{showScore ? getScoreTotal() : null}</Text>
    </View>
  );
}
