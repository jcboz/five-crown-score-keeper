export default function canGoOut(round, players) {
  const wildCard = round + 2;
  const cards = round + 2;

  const subHands = initSubHands(cards);

  console.log('check this jUlian: ', subHands);

  for (let i = 0; i < players.length; i++) {
    // players[i].hand;
  }
}

// first check the current hand for sets and only sets. If fails, then move onto isRun
function isSet() {}

function isRun() {}

function removeCard(hand, index) {
  hand.splice(index, 1);
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
