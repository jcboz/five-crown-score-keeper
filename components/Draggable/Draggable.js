/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

import Card from '../Card/Card';
import styles from './styles';

export default function Draggable({ item }) {
  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;

  console.log('item is: ', item);
  const release = (gesture) => {
    if (isDropArea(gesture)) {
      Animated.spring(translationX, {
        toValue: 50,
        useNativeDriver: false,
      }).start();
      Animated.spring(translationY, {
        toValue: -230,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(translationX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(translationY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const isDropArea = (gesture) => {
    return gesture.moveY < 530;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translationX.setValue(gestureState.dx);
        translationY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        release(gesture);
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.slider,
        { transform: [{ translateX: translationX }, { translateY: translationY }] },
      ]}
      {...panResponder.panHandlers}>
      <Card key={item.id} card={item.card} id={item.id} />
    </Animated.View>
  );
}
