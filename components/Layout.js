import { move } from 'react-native-redash';

// import { SharedValues } from './Utils';

export const MARGIN_TOP = 0;
export const MARGIN_LEFT = 0;
export const NUMBER_OF_SUBHANDS = 1;
export const CARD_HEIGHT = 120;
export const CARD_WIDTH = 85;
export const SENTENCE_HEIGHT = (NUMBER_OF_SUBHANDS - 1) * CARD_HEIGHT;
export const SIDE_OF_SCREEN_TO_SUBHAND_MARGIN = 10;
export const SIDE_OF_SUBHAND_TO_CARD = 5;

const isNotInBank = (offset) => {
  'worklet';

  // console.log('cheese heeh: ', offset.order);
  return offset.order !== -1;
};

const byOrder = (a, b) => {
  'worklet';

  return a.order > b.order ? 1 : -1;
};

export const lastOrder = (input) => {
  'worklet';

  console.log('\n\nFoo foo foo: ', input);
  console.log('\n\nFoo foo foo 2: ', input.filter(isNotInBank).length);
  return input.filter(isNotInBank).length;
};

export const remove = (input, index) => {
  'worklet';

  const offsets = input
    .filter((_, i) => i !== index)
    .filter(isNotInBank)
    .sort(byOrder);
  offsets.map((offset, i) => (offset.order = i));
};

export const reorder = (input, from, to) => {
  'worklet';

  const offsets = input.filter(isNotInBank).sort(byOrder);
  const newOffset = move(offsets, from, to);
  newOffset.map((offset, index) => (offset.order = index));
  // newOffset.reverse().map((offset, index) => (offset.z = index + 100));
};

export const calculateLayout = (input, containerWidth) => {
  'worklet';

  const offsets = input.filter(isNotInBank).sort(byOrder);
  if (offsets.length === 0) {
    return;
  }
  let lineNumber = 0;
  let lineBreak = 0;
  console.log('input: ', input);
  // console.log('containerWidth: ', containerWidth);
  offsets.forEach((offset, index) => {
    const total = offsets.slice(lineBreak, index).reduce((acc, o) => acc + o.width, 0);
    if (total + offset.width > containerWidth) {
      lineNumber += 1;
      lineBreak = index;
      offset.x = 0;
    } else {
      offset.x = total + SIDE_OF_SCREEN_TO_SUBHAND_MARGIN + SIDE_OF_SUBHAND_TO_CARD;
    }
    offset.y = CARD_HEIGHT * lineNumber - 160;
  });
};
