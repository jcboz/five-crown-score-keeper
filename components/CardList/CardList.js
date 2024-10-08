/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { runOnJS, runOnUI, useSharedValue } from 'react-native-reanimated';

import SortableCard from '../SortableCard/SortableCard';
import SubHands from '../SubHands/SubHands';
import styles from './styles';

const containerWidth = Dimensions.get('window').width * 2;

export default function CardList({
  children,
  players,
  setPlayers,
  playerTurnCounter,
  ready,
  setReady,
  setFaceUpCard,
}) {
  const offsets = useSharedValue(
    children.map(() => ({
      order: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      originalX: 0,
      originalY: 0,
    })),
  );

  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          console.log('How many children?: ', index);
          return (
            <View
              key={child.key}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height }, // these give the original layout positions of the cards (and their sizes) when loaded in
                },
              }) => {
                offsets.value[index] = {
                  order: -1,
                  width: width / children.length + 10,
                  height,
                  x,
                  y,
                  originalX: x,
                  originalY: y,
                };

                runOnUI(() => {
                  'worklet';

                  console.log('eeba: ', offsets.value);
                  if (offsets.value.filter((o) => o.order !== -1).length >= 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {console.log('\n\nhello: !:', offsets.value, '\n\n')}
      <SubHands />
      {children.map((child, index) => (
        <SortableCard
          key={child.key}
          offsets={offsets}
          index={index}
          players={players}
          setPlayers={setPlayers}
          containerWidth={containerWidth}
          playerTurnCounter={playerTurnCounter}
          setFaceUpCard={setFaceUpCard}
          setReady={setReady}
          test={child}>
          {/* {child} */}
        </SortableCard>
      ))}
    </View>
  );
}
