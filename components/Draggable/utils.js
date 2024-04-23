import { Dimensions } from 'react-native';

const COL = 5;
export const MARGIN = 4;
export const SIZE = Dimensions.get('window').width / COL - MARGIN;

export const getPosition = (index) => {
  'worklet';

  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE,
  };
};

export const getSubHandPosition = (index) => {
  'worklet';

  return {
    x: (index % COL) * SIZE + 50,
    y: Math.floor(index / COL) * SIZE - 320,
  };
};

export const getOrder = (x, y) => {
  'worklet';

  // console.log('x and y: ', x, y);
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};

export const getSubHandOrder = (x, y) => {
  'worklet';

  // console.log('x and y: ', x, y);
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};
