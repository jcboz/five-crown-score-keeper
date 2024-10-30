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

function SortableCard({
  offsets,
  index,
  children,
  players,
  setPlayers,
  containerWidth,
  playerTurnCounter,
  setFaceUpCard,
  test,
}) {
  const offset = offsets.value[index];
  console.log('offsets check 1: ', offsets.value, '************\n\n');
  // console.log('LOG: ', offset, '\n\n');
  const isGestureActive = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order === -1);
  console.log('offsets check 2: ', offsets.value, '************\n\n');
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      console.log('offsets check 3: ', offsets.value[index], '************\n\n');

      if (isInBank.value) {
        translation.x.value = offset.originalX - MARGIN_LEFT;
        translation.y.value = offset.originalY + MARGIN_TOP;
      } else {
        translation.x.value = offset.x;
        translation.y.value = offset.y;
      }
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
      console.log('offsets from inside onStart: ', offsets);
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translation.x.value = ctx.x + translationX;
      translation.y.value = ctx.y + translationY;
      // i think in one of these conditionals is where the crash is happening on first card move
      // THIS IS WHERE WE DETERMINE WHERE THE CARD AUTO-DRAGS TO...
      // for some reason the width value changes for each card ... for example for the first card in the hand it will have the correct boundaries but for the other cards they won't auto-drag to the subhand
      // ^^^OKAY THE REASON*** is because it calculates it by using the card's starting position so the cards after the first card having a greater than 0 x value because they load in further right
      if (isInBank.value && translation.y.value < SENTENCE_HEIGHT) {
        // console.log('offset check!: ', offset);
        // why is offsets reset to all 0s here...
        console.log('new super offsets check: ', offsets.value);
        offset.order = lastOrder(offsets.value);
        // console.log('offset check 2!: ', offset);
        calculateLayout(offsets.value, containerWidth);
      } else if (!isInBank.value && translation.y.value > SENTENCE_HEIGHT) {
        offset.order = -1;
        remove(offsets.value, index);
        calculateLayout(offsets.value, containerWidth);
      }
      for (let i = 0; i < offsets.value.length; i++) {
        const o = offsets.value[i];
        if (i === index && o.order !== -1) {
          continue;
        }
        // console.log('***check these out***: \no.x: ', o.x, '\no.width: ', o.width);
        if (
          between(translation.x.value, o.x, o.x + o.width) &&
          between(translation.y.value, o.y - CARD_HEIGHT, o.y + CARD_HEIGHT)
        ) {
          reorder(offsets.value, offset.order, o.order);
          calculateLayout(offsets.value, containerWidth);
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
      translation.x.value = withSpring(offset.x, { velocity: 0.2 });
      translation.y.value = withSpring(offset.y, { velocity: 0.2 });
      isGestureActive.value = false;
      // console.log('offsets: ', offset);
      // console.log('offset: ', offset.order);
      // console.log('test: ', test.props);
      // console.log(
      //   'screen size check: ',
      //   containerWidth,
      //   'and translate check: \n',
      //   translation.x.value,
      // );
      const tplayers = players;
      if (
        between(translation.x.value, offset.x, offset.x + offset.width) &&
        between(translation.y.value, offset.y - CARD_HEIGHT, offset.y)
      ) {
        console.log('does the if ever run?');
        // Here add the cards into the player's subhand. Make sure to take them out when they are moved out. In GameView, a function will need to check the values of the player's subhands
        // setPlayers([...players], players[???]); // i think we could pass the player index based on who's turn it is... is there a turn keeper yet?
        //
        // console.log('card: ', test.props.item);
        // console.log('subhand', tplayers[playerTurnCounter].subHand[playerTurnCounter]);
        // console.log('index', tplayers[playerTurnCounter].subHand.indexOf(test.props.item));
        let inDeck = false;
        for (let j = 0; j < tplayers[playerTurnCounter].subHand.length; j++) {
          for (let i = 0; i < tplayers[playerTurnCounter].subHand[j].length; i++) {
            if (
              tplayers[playerTurnCounter].subHand[j][i].suite === test.props.item.suite &&
              tplayers[playerTurnCounter].subHand[j][i].value === test.props.item.value &&
              tplayers[playerTurnCounter].subHand[j][i].cardID === test.props.item.cardID
            ) {
              inDeck = true;
            }
          }
        }

        console.log('what is inDeck?: ', inDeck);
        if (!inDeck) {
          tplayers[playerTurnCounter].subHand[2].push(test.props.item);
        }
        console.log('temp player! ', tplayers[playerTurnCounter].subHand);
        runOnJS(setPlayers)(tplayers);
        console.log('player', players[playerTurnCounter].subHand); // test.props.item is what we will want to push to a players subhand
      } else if (
        between(translation.y.value, 0, 400) // &&
        // between(translation.y, offset.y - CARD_HEIGHT, offset.y)
      ) {
        for (let j = 0; j < tplayers[playerTurnCounter].subHand.length; j++) {
          if (
            tplayers[playerTurnCounter].hand[j].card.suite === test.props.item.suite &&
            tplayers[playerTurnCounter].hand[j].card.value === test.props.item.value &&
            tplayers[playerTurnCounter].hand[j].card.cardID === test.props.item.cardID
          ) {
            tplayers[playerTurnCounter].hasDiscarded = true;
            tplayers[playerTurnCounter].discardedCard = test.props.item;
          }
          for (let i = 0; i < tplayers[playerTurnCounter].subHand[j].length; i++) {
            if (
              tplayers[playerTurnCounter].subHand[j][i].suite === test.props.item.suite &&
              tplayers[playerTurnCounter].subHand[j][i].value === test.props.item.value &&
              tplayers[playerTurnCounter].subHand[j][i].cardID === test.props.item.cardID
            ) {
              tplayers[playerTurnCounter].subHand[j].splice(test.props.item, 1);
            }
          }
        }

        console.log('ooga boo: ', tplayers[playerTurnCounter].hand);
        runOnJS(setPlayers)(tplayers);
        runOnJS(setFaceUpCard)(test.props.item);
      }
      // else if (
      //   between(translation.x, offset.x, offset.x + offset.width) &&
      //   between(translation.y, offset.y - CARD_HEIGHT, offset.y)
      // ) {
      //   let inDeck = false;
      //   for (let j = 0; j < tplayers[playerTurnCounter].subHand.length; j++) {
      //     for (let i = 0; i < tplayers[playerTurnCounter].subHand[j].length; i++) {
      //       if (
      //         tplayers[playerTurnCounter].subHand[j][i].suite === test.props.item.suite &&
      //         tplayers[playerTurnCounter].subHand[j][i].value === test.props.item.value
      //       ) {
      //         inDeck = true;
      //       }
      //     }
      //   }
      //   if (!inDeck) {
      //     tplayers[playerTurnCounter].subHand[2].push(test.props.item);
      //   }
      //   runOnJS(setPlayers)(tplayers);
      // }
      else {
        // remove from deck... GOOD NIGHT
        for (let j = 0; j < tplayers[playerTurnCounter].subHand.length; j++) {
          for (let i = 0; i < tplayers[playerTurnCounter].subHand[j].length; i++) {
            if (
              tplayers[playerTurnCounter].subHand[j][i].suite === test.props.item.suite &&
              tplayers[playerTurnCounter].subHand[j][i].value === test.props.item.value &&
              tplayers[playerTurnCounter].subHand[j][i].cardID === test.props.item.cardID
            ) {
              tplayers[playerTurnCounter].subHand[j].splice(test.props.item, 1);
            }
          }
        }
        console.log('temp player! ', tplayers[playerTurnCounter].subHand);
        runOnJS(setPlayers)(tplayers);
      }
    },
  });
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    console.log('offsets check 4: ', offsets.value);
    return withSpring(isInBank.value ? offset.originalX - MARGIN_LEFT : offset.x); // this second value here is what determines where the card should move to
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(isInBank.value ? offset.originalY + MARGIN_TOP : offset.y); // TO-DO change here too
  });
  const style = useAnimatedStyle(() => {
    // console.log('hurb: ', translateX.value);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: offset.width,
      height: CARD_HEIGHT,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });
  return (
    <>
      {/* <Placeholder key={index} offset={offset} /> */}
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>{test}</Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
}

export default SortableCard;
