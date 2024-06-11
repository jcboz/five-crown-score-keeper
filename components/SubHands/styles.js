import { StyleSheet } from 'react-native';

import { CARD_HEIGHT } from '../Layout';

const styles = StyleSheet.create({
  lines: {
    backgroundColor: 'white',
    height: 2,
    top: index * CARD_HEIGHT - 2,
    width: '100%',
  },
});

export default styles;
