/* eslint-disable eqeqeq */
export default function canGoOut(round, players) {
  const wildCard = round + 2;
  const cards = round + 2;

  for (let i = 0; i < players.length; i++) {
    checkHand(players[i].hand, cards);
  }
}

function checkHand(hand, cards) {
  const subHands = initSubHands(cards);

  for (let i = 0; i < hand.length; i++) {
    if (addToSubHand(hand[i], subHands)) {
      removeCardFromHand(hand, i);
    }
  }
}

// first check the current hand for sets and only sets. If fails, then move onto isRun
function isSet() {}

function isRun() {}

function addToSubHand(card, subHands) {
  for (let i = 0; i < subHands.length; i++) {
    // There is a subhand with one card and the card number matches
    if (
      subHands[i].type === 'open' &&
      subHands[i].cards.length > 0 &&
      subHands[i].cards[0].value == card.value
    ) {
      subHands[i].cards.push(card);
      subHands[i].type = 'set';
      console.log('There is a subhand started and the card number matches: ', subHands[i]);
      return true;
    }
    // There is a subhand with multiple cards with type set
    if (
      subHands[i].type === 'set' &&
      subHands[i].cards.length > 0 &&
      subHands[i].cards[0].value == card.value
    ) {
      subHands[i].cards.push(card);
      console.log('There is a subhand set going and the card number matches: ', subHands[i]);
      return true;
    }
    // There are no cards in any of the subhands yet
    if (subHands[i].type === 'open' && subHands[i].cards.length == 0) {
      subHands[i].cards.push(card);
      console.log('There are no cards in any of the subhands yet: ', subHands[i]);
      return true;
    }
  }
}

function removeCardFromHand(hand, index) {
  hand.splice(index, 1);
  console.log('newhand: ', hand);
}

function initSubHands(cards) {
  const x = cards / 3;
  if (x < 2) {
    return [
      {
        type: 'open',
        cards: [],
      },
    ];
  }
  if (x >= 2 && x < 3) {
    return [
      {
        type: 'open',
        cards: [],
      },
      {
        type: 'open',
        cards: [],
      },
    ];
  }
  if (x >= 3 && x < 4) {
    return [
      {
        type: 'open',
        cards: [],
      },
      {
        type: 'open',
        cards: [],
      },
      {
        type: 'open',
        cards: [],
      },
    ];
  }
  if (x >= 4) {
    return [
      {
        type: 'open',
        cards: [],
      },
      {
        type: 'open',
        cards: [],
      },
      {
        type: 'open',
        cards: [],
      },
      {
        type: 'open',
        cards: [],
      },
    ];
  }
}
