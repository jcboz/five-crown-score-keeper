import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 116.66,
    justifyContent: 'center',
    width: 83.33,
  },
  shape: {
    backgroundColor: 'black',
    borderRadius: 20,
    height: 24,
    position: 'absolute',
    width: 24,
  },
  value: {
    color: 'black',
    left: 7,
    position: 'absolute',
    top: 7,
  },
  value2: {
    bottom: 7,
    color: 'black',
    position: 'absolute',
    right: 7,
  },
});

export default styles;
