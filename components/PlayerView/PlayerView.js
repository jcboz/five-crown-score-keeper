// /* eslint-disable react/prop-types */
// import React from 'react';
// import { Text, View } from 'react-native';

// import styles from './styles';

// export default function PlayerView({ id, name, score, hand }) {
//   return (
//     <View key={id}>
//       <Text key={id} style={styles.text}>
//         Hello, {name}. You are player {id}. Your score is {score}. Your current hand is {hand}
//       </Text>
//       <Text />
//     </View>
//   );
// }

// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';

// import styles from './styles';

// export default function PlayerView({ player }) {
//   console.log('player hand from player view: ', player.hand);
//   const [val, setVal] = useState(player);
//   useEffect(() => {
//     setVal(player);
//     console.log('Change in player detected, rendering new data: ', val.hand);
//   }, [{ player }]);
//   return (
//     <View>
//       <Text>
//         Hello, {val.name}. Your hand is {val.hand}
//       </Text>
//     </View>
//   );
// }

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function PlayerView({ players }) {
  return (
    <View style={styles.container}>
      {players.map((player) => (
        <View key={player.id} style={styles.player}>
          <Text key={player.id} style={styles.text}>
            {player.name +
              ', your cards are: ' +
              player.hand.map((card) => card.value + ' of ' + card.suite + 's')}
          </Text>
        </View>
      ))}
    </View>
  );
}
