import Animated from 'react-native-reanimated';

function SharedValues(T) {
  const sharedValues = {};
  Object.keys(T).forEach((key) => {
    sharedValues[key] = new Animated.Value(T[key]);
  });
  return sharedValues;
}
export default SharedValues;
