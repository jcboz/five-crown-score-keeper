/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
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
      // i think in one of these conditionals is where the crash is happening on first card move
      // THIS IS WHERE WE DETERMINE WHERE THE CARD AUTO-DRAGS TO...
      // for some reason the width value changes for each card ... for example for the first card in the hand it will have the correct boundaries but for the other cards they won't auto-drag to the subhand
      // ^^^OKAY THE REASON*** is because it calculates it by using the card's starting position so the cards after the first card having a greater than 0 x value because they load in further right
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
        console.log(
          '***check these out***: \no.x.value: ',
          o.x.value,
          '\no.width.value: ',
          o.width.value,
        );
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
      // all code from here to 'isGestureActive' is responsible for animating the card to the correct spot, only UI. Location calc is not here
      isAnimating.value = true;
      translation.x.value = withSpring(offset.x.value, { velocity: 0.2 });
      translation.y.value = withSpring(offset.y.value, { velocity: 0.2 });
      isGestureActive.value = false;
      console.log('offsets: ', offset);
      console.log('offset: ', offset.order.value);
      console.log('children: ', children.props);
      const tplayers = players;
      if (
        between(translation.x.value, offset.x.value / 2, offset.x.value / 2 + offset.width.value) &&
        between(translation.y.value, offset.y.value - CARD_HEIGHT, offset.y.value)
      ) {
        // Here add the cards into the player's subhand. Make sure to take them out when they are moved out. In GameView, a function will need to check the values of the player's subhands
        // setPlayers([...players], players[???]); // i think we could pass the player index based on who's turn it is... is there a turn keeper yet?
        //
        // console.log('card: ', children.props.item);
        // console.log('subhand', tplayers[0].subHand[0]);
        // console.log('index', tplayers[0].subHand.indexOf(children.props.item));
        let inDeck = false;
        for (let i = 0; i < tplayers[0].subHand.length; i++) {
          if (
            tplayers[0].subHand[i].suite === children.props.item.suite &&
            tplayers[0].subHand[i].value === children.props.item.value
          ) {
            inDeck = true;
          }
        }
        console.log('what is inDeck?: ', inDeck);
        if (!inDeck) {
          tplayers[0].subHand.push(children.props.item);
        }
        console.log('temp player! ', tplayers[0].subHand);
        runOnJS(setPlayers)(tplayers);
        console.log('player', players[0].subHand); // children.props.item is what we will want to push to a players subhand
      } else if (
        between(translation.x.value, offset.x.value, offset.x.value + offset.width.value) &&
        between(translation.y.value, offset.y.value - CARD_HEIGHT, offset.y.value)
      ) {
        console.log('gooba dooba test');
        // console.log('card: ', children.props.item);
        // console.log('subhand', tplayers[0].subHand[1]);
        // console.log('index', tplayers[0].subHand.indexOf(children.props.item));
        let inDeck = false;
        for (let i = 0; i < tplayers[0].subHand.length; i++) {
          if (
            tplayers[0].subHand[i].suite === children.props.item.suite &&
            tplayers[0].subHand[i].value === children.props.item.value
          ) {
            inDeck = true;
          }
        }
        console.log('what is inDeck?: ', inDeck);
        if (!inDeck) {
          tplayers[0].subHand.push(children.props.item);
        }
        console.log('temp player! ', tplayers[0].subHand);
        runOnJS(setPlayers)(tplayers);
        console.log('player', players[0].subHand); // children.props.item is what we will want to push to a players subhand
      } else {
        // remove from deck... GOOD NIGHT
        for (let i = 0; i < tplayers[0].subHand.length; i++) {
          if (
            tplayers[0].subHand[i].suite === children.props.item.suite &&
            tplayers[0].subHand[i].value === children.props.item.value
          ) {
            tplayers[0].subHand.splice(children.props.item, 1);
          }
        }
        console.log('temp player! ', tplayers[0].subHand);
        runOnJS(setPlayers)(tplayers);
      }
    },
  });
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withSpring(isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value); // this second value here is what determines where the card should move to
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(isInBank.value ? offset.originalY.value + MARGIN_TOP : offset.y.value); // TO-DO change here too
  });
  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: isGestureActive.value || isAnimating.value ? 100 : offset.z.value,
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
