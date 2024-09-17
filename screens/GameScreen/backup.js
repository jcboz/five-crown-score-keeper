// Okay something with points is way off here... getting huge totals and repeating numbers
for (let i = 0; i < players.length; i++) {
  let roundTotalPoints = 0;
  for (let j = 0; j < players[i].subHand.length; j++) {
    console.log('It does get to here though right?');
    for (let k = 0; k < players[i].subHand[j].length; k++) {
      console.log(
        'checky out: ',
        players[i].subHand[j].length,
        ' ',
        isSubhandValid(players[i].subHand[j], round),
      );
      if (players[i].subHand[j].length > 0 && !isSubhandValid(players[i].subHand[j], round)) {
        console.log('does this never get called?');
        roundTotalPoints += addUpPoints(players[i].subHand[j]);
      }
    }
  }
  // roundTotalPoints = 5;
  // console.log('is roundtotalpoints working?: ', roundTotalPoints);
  // add points to players total
  console.log('###### : ', roundTotalPoints);
  const tplayers = players.map((player) => {
    if (player.id === i) {
      return {
        ...player,
        points: 5,
      };
    }
    return player;
  });
  console.log('Check *** it *** outa ***: \n', tplayers[i]);
  setPlayers(tplayers);
}
console.log("I don't think this will work: ", players);
