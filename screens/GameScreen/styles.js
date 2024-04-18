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
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  playerView: {
    bottom: 0,
  },
  subHand: {
    backgroundColor: 'black',
    borderRadius: 15,
    height: 130,
    opacity: 0.5,
    top: 40,
    width: '80%',
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
