import React, { useEffect, useRef, useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';

import styles from './styles';

export default function Scorecard() {
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [number3, setNumber3] = useState(null);
  const [number4, setNumber4] = useState(null);
  const [number5, setNumber5] = useState(null);
  const [number6, setNumber6] = useState(null);
  const [number7, setNumber7] = useState(null);
  const [number8, setNumber8] = useState(null);
  const [number9, setNumber9] = useState(null);
  const [number10, setNumber10] = useState(null);
  const [number11, setNumber11] = useState(null);
  const [number12, setNumber12] = useState(null);
  const [number13, setNumber13] = useState(null);

  const [score, setScore] = useState(0);
  const [show, setShow] = useState(true);

  const handleShow = () => {
    if (show === true) {
      setShow(false);
      console.log('set to hide');
    } else {
      setShow(true);
      console.log('set to show');
    }
  };

  const handle1change = (number1) => {
    setNumber1(number1);
    setScore(number1);
  };

  const handle2change = (number2) => {
    setNumber2(number2);
    setScore(number2);
  };

  const handle3change = (number3) => {
    setNumber3(number3);
    setScore(number3);
  };

  const handle4change = (number4) => {
    setNumber4(number4);
    setScore(number4);
  };

  const handle5change = (number5) => {
    setNumber5(number5);
    setScore(number5);
  };

  const handle6change = (number6) => {
    setNumber6(number6);
    setScore(number6);
  };

  const handle7change = (number7) => {
    setNumber7(number7);
    setScore(number7);
  };

  const handle8change = (number8) => {
    setNumber8(number8);
    setScore(number8);
  };

  const handle9change = (number9) => {
    setNumber9(number9);
    setScore(number9);
  };

  const handle10change = (number10) => {
    setNumber10(number10);
    setScore(number10);
  };

  const handle11change = (number11) => {
    setNumber11(number11);
    setScore(number11);
  };

  const handle12change = (number12) => {
    setNumber12(number12);
    setScore(number12);
  };

  const handle13change = (number13) => {
    setNumber13(number13);
    setScore(number13);
  };

  return (
    <>
      <Pressable style={styles.button} onPress={handleShow}>
        <Text>{show ? 'Hide Score' : 'Show Score'}</Text>
      </Pressable>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(number1) => handle1change(number1)}
          value={number1}
          placeholder="score"
          keyboardType="numeric"
        />
        {number1 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number2) => handle2change(number2)}
            value={number2}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number2 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number3) => handle3change(number3)}
            value={number3}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number3 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number4) => handle4change(number4)}
            value={number4}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number4 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number5) => handle5change(number5)}
            value={number5}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number5 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number6) => handle6change(number6)}
            value={number6}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number6 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number7) => handle7change(number7)}
            value={number7}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number7 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number8) => handle8change(number8)}
            value={number8}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number8 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number9) => handle9change(number9)}
            value={number9}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number9 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number10) => handle10change(number10)}
            value={number10}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number10 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number11) => handle11change(number11)}
            value={number11}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number11 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number12) => handle12change(number12)}
            value={number12}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
        {number12 !== null ? (
          <TextInput
            style={styles.input}
            onChangeText={(number13) => handle13change(number13)}
            value={number13}
            placeholder="score"
            keyboardType="numeric"
          />
        ) : null}
      </View>
      <Text style={styles.text}>{show ? score : null}</Text>
    </>
  );
}
