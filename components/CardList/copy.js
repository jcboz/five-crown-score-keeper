/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { runOnJS, runOnUI, useSharedValue } from 'react-native-reanimated';

import SortableCard from '../SortableCard/SortableCard';
import styles from './styles';

const containerWidth = Dimensions.get('window').width * 2;

export default function CardList({ children, players, setPlayers, playerTurnCounter }) {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));

  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <View
              key={child.key}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height }, // these give the original layout positions of the cards (and their sizes) when loaded in
                },
              }) => {
                const offset = offsets[index];
                offset.order.value = -1;
                offset.width.value = width / children.length + 10;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  'worklet';

                  console.log('check eeba here: ', offsets);
                  if (offsets.filter((o) => o.order.value !== -1).length === 0) {
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
      {children.map((child, index) => (
        <SortableCard
          key={child.key}
          offsets={offsets}
          index={index}
          players={players}
          setPlayers={setPlayers}
          containerWidth={containerWidth}
          playerTurnCounter={playerTurnCounter}>
          {child}
        </SortableCard>
      ))}
    </View>
  );
}
