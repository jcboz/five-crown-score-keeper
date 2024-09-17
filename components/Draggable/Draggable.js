/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { getOrder, getPosition, MARGIN } from './utils';

function Draggable({ children, positions, round, id, layout }) {
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  // console.log('pos.val: ', positions.value[id]);
  // console.log('pos: ', position);
  // console.log(('id: ', id));

  const isGestureActive = useSharedValue(false);
  const isInSubHand = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPostions = getPosition(newOrder);
      translateX.value = withTiming(newPostions.x);
      translateY.value = withTiming(newPostions.y);
    },
  );

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;

      isGestureActive.value = true;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);

      console.log('hand: ', oldOrder);

      if (oldOrder !== newOrder && newOrder < round) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPostions = JSON.parse(JSON.stringify(positions.value));
          newPostions[id] = newOrder;
          newPostions[idToSwap] = oldOrder;
          positions.value = newPostions;
        }
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x);
      translateY.value = withTiming(destination.y);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

export default Draggable;
