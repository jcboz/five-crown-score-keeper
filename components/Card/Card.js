import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function Card(card) {
  console.log('arkkkkk: ', card);
  console.log('card from Card: ', card.item.value);
  let color = 'pink';
  if (card.item.suite === 'club') {
    color = 'green';
  } else if (card.item.suite === 'heart') {
    color = 'red';
  } else if (card.item.suite === 'star') {
    color = '#FFD600';
  } else if (card.item.suite === 'diamond') {
    color = 'blue';
  } else if (card.item.suite === 'joker') {
    color = 'pink';
  } else if (card.item.suite === 'spade') {
    color = 'black';
  }
  const backgroundColor = color;
  return (
    <View style={styles.container}>
      <Text style={[styles.value, { color }]}>{card.item.value}</Text>
      <Text style={[styles.value2, { color }]}>{card.item.value}</Text>
      <View style={[styles.shape, { backgroundColor }]} />
    </View>
  );
}
