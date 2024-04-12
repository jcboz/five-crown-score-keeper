/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Animated, PanResponder, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Card from '../Card/Card';
import styles from './styles';

export default function PlayerView({ players }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{players[0].name}, your cards are:</Text>
      <ScrollView horizontal alwaysBounceHorizontal style={styles.cards}>
        {players[0].hand.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </ScrollView>
      {/* <Text style={styles.text}>{players[1].name}, your cards are:</Text>
      <ScrollView horizontal alwaysBounceHorizontal style={styles.cards}>
        {players[1].hand.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </ScrollView> */}
    </View>
  );
}
