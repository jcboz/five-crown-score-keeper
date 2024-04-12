import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import styles from './styles';

export default function Card(card) {
  let color = 'red';
  if (card.card.suite === 'club') {
    color = 'green';
  } else if (card.card.suite === 'heart') {
    color = 'red';
  } else if (card.card.suite === 'star') {
    color = '#FFD600';
  } else if (card.card.suite === 'diamond') {
    color = 'blue';
  }
  const backgroundColor = color;
  return (
    <View style={styles.container}>
      <Text style={[styles.value, { color }]}>{card.card.value}</Text>
      <Text style={[styles.value2, { color }]}>{card.card.value}</Text>
      <View style={[styles.shape, { backgroundColor }]} />
    </View>
  );
}
