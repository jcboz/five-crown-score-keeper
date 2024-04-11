export default function canGoOut(round, players) {
  const wildCard = round + 2;
  const cards = round + 2;

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
