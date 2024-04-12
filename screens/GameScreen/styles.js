import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 20,
    width: 80,
  },
  buttonText: {
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  outerContainer: {
    flex: 1,
    height: '100%',
  },
  playerView: {
    bottom: 0,
  },
  text: {
    color: 'white',
    fontFamily: 'Inter_300Light',
  },
  textFaceUpCard: {
    color: 'white',
    fontFamily: 'Inter_300Light',
    marginTop: 10,
  },
});

export default styles;
