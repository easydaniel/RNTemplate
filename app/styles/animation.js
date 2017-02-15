import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  animation: {
    flex: 2.5,
    alignSelf: 'stretch',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 30,
  },
  animationContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startAnim: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fadeObj: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4E629F',
  },
});
