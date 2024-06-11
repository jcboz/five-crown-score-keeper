/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { between, useVector } from 'react-native-redash';

import {
  calculateLayout,
  CARD_HEIGHT,
  lastOrder,
  MARGIN_LEFT,
  MARGIN_TOP,
  remove,
  reorder,
  SENTENCE_HEIGHT,
} from '../Layout';

function SortableCard({ offsets, index, children, players, setPlayers, containerWidth }) {
  const offset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translation.x.value = ctx.x + translationX;
      translation.y.value = ctx.y + translationY;
      if (isInBank.value && translation.y.value < SENTENCE_HEIGHT) {
        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
      } else if (!isInBank.value && translation.y.value > SENTENCE_HEIGHT) {
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
      }
      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (i === index && o.order.value !== -1) {
          continue;
        }
        if (
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          between(translation.y.value, o.y.value - CARD_HEIGHT, o.y.value + CARD_HEIGHT)
        ) {
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          // Here add the cards into the player's subhand. Make sure to take them out when they are moved out. In GameView, a function will need to check the values of the player's subhands
          // setPlayers([...players], players[index]); //  I don't know if players[index] will work right but there definitely is a right way to do it
          break;
        }
        // could be wrong but I think this is where we will want to remove cards from a player's subhand.
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      isAnimating.value = true;
      translation.x.value = withSpring(
        offset.x.value,
        { velocity: velocityX },
        () => (isAnimating.value = false),
      );
      translation.y.value = withSpring(offset.y.value, { velocity: velocityY });
      isGestureActive.value = false;
      console.log('offsets: ', offset);
      console.log('offset: ', offset.order.value);
      console.log('children: ', children.props);
    },
  });
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withSpring(isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value);
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(isInBank.value ? offset.originalY.value + MARGIN_TOP : offset.y.value);
  });
  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: isGestureActive.value || isAnimating.value ? 100 : 0,
      width: offset.width.value,
      height: CARD_HEIGHT,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });
  return (
    <>
      {/* <Placeholder key={index} offset={offset} /> */}
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
}

export default SortableCard;
