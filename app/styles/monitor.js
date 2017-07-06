import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 64,
  },
  rowContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingLeft: 30,
    alignItems: 'flex-start'
  },
  textHeader: {
    fontSize: 18
  },
  textSubheader: {
    marginTop: 8,
    fontSize: 13,
    color: 'rgba(23, 23, 23, .5)'
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
