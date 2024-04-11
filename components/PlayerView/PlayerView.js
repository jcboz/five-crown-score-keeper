/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function PlayerView({ id, name, score, hand }) {
  return (
    <View key={id}>
      <Text styles={styles.text}>
        Hello, {name}. You are player {id}. Your score is {score}. Your current hand is {hand}
      </Text>
      <Text />
    </View>
  );
}
