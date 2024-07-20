export default function isSubhandValid(player, round) {
  // 1. Check that there are >= 3 cards in each of the subhands
  for (let i = 0; i < player.subHand.length; i++) {
    if (player.subHand.length < 3) {
      console.log('Pilez must be at least 3 cards!');
      return false;
    }
  }

  // 2. Check that all card in player's hand are in subhands (Check that length of each subHand array combined is equal to length of cards in player's hand)
  if (player.subHand.length < player.hand.length) {
    console.log('not all cards used!');
    return false;
  }

  // 3. Check that the subhand is a book or a run and return true (isBook || isRun) where is isBook and isRun are helper functions
  if (isBook(player.subHand, round) || isRun(player.subHand, round)) {
    return true;
  }

  // If we made it here, the subhand is not valid
  return false;
}

function isBook(subhand, round) {
  // check for book
  const wild = round + 2;
  let match = -1;
  for (let i = 0; i < subhand.length; i++) {
    if (subhand[i].value !== wild && subhand[i].value !== 'joker') {
      match = subhand[i].value;
      break;
    }
  }

  for (let i = 0; i < subhand.length; i++) {
    if (subhand[i].value !== match && subhand[i].value !== wild && subhand[i].value !== 'joker') {
      console.log('not a book! sorry');
      return false;
    }
  }
  console.log('It is a book! yahoo');
  return true;
}

function isRun(subhand, round) {
  // check for run
  // hmmm.. this might be tricky
  // try converting jack, queen, king to 11, 12, 13 and then sorting the array. Then loop through and check if theyre in order
  // ^^ problem with this is that it doesn't account for wilds and jokers... idk how to do this..
  const hand = subhand.map((obj) => {
    if (obj.value === 'J') {
      return { ...obj, value: 11 };
    }
    if (obj.value === 'Q') {
      return { ...obj, value: 12 };
    }
    if (obj.value === 'K') {
      return { ...obj, value: 13 };
    }
    return obj;
  });
  const compare = (a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  };

  hand.sort(compare);
  const wild = round + 2;
  // UPDATE.... I think what we need to do is loop through first and take out the wild cards and jokers and create a count of available wild cards.
  // Then sort the array.
  // Then loop through the array as normal with check for a run, but if it fails (i.e. 4, 5, 7) check if we have a wild card,
  // if we do, subtract one from the wild card count and continue through the loop
  // this will not work if two wild cards are used in a row but I think more checks can be added to account for that

  // need a function that will seperate wilds from the hand
  const wildCards = [];
  const handCopy = hand;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === 'joker' || hand[i].value === wild) {
      wildCards.push(hand[i]);
    }
  }

  for (let i = 0; i < wildCards.length; i++) {
    hand.splice(wildCards[i], 1);
  }

  for (let i = 0; i < hand.length - 1; i++) {
    if (hand[i].suite !== hand[i + 1].suite) {
      console.log('it is not a run :( not even in the same suite!');
      return false;
    }
  }

  let count = 0;
  for (let i = hand.length - 1; i > 0; i--) {
    count += hand[i].value - hand[i - 1].value - 1;
  }
  if (count > wildCards.length) {
    console.log('it is not a run :( not enough wild cards');
    return false;
  }

  console.log('it is a run');
  return true;
}

// test function to check if the card is an even card
function isTest(subhand) {
  console.log('subhand is: ', subhand);

  if (subhand[0].value % 2 === 0) {
    return true;
  }
}
