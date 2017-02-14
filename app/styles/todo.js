import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    flex: 1,
    backgroundColor: '#00BD9D',
    height: 20,
  },
  rowContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItem: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'none',
  },
  rowCompleted: {
    marginLeft: 12,
    fontSize: 16,
    color: '#8E8E8E',
    textDecorationLine: 'line-through',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  inputContainer: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#00BD9D',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButton: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  footerText: {
    color: '#8E8E8E',
  },
});
