import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styles from './styles';
import { getOrder, getPosition, MARGIN } from './utils';

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
