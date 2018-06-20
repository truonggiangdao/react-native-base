import { StyleSheet, Dimensions } from 'react-native';
import { COLOR, FONTSIZE, NUMBER, CONSTANT } from '../../utils/constant';

const { height, width } = Dimensions.get('window');
const headerLogoRatio = 287 / 150;
const headerLogoWidth = width * 0.25;
const headerLogoHeight = headerLogoWidth / headerLogoRatio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height: height * 0.12,
    backgroundColor: COLOR.BACKGROUND,
  },
  logo: {
    alignSelf: 'center',
    marginTop: height * 0.025,
    width: headerLogoWidth,
    height: headerLogoHeight,
  },
  title: {
    marginTop: CONSTANT.title_margin_top,
    marginLeft: '5%',
    width: '90%',
    height: CONSTANT.text_height,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FONTSIZE.title_size,
  },
  webviewContainer: {
    marginTop: height * 0.01,
    height: height*0.8,
    width: width,
  },
  groupCollectionButton: {
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    height: height * 0.075,
  },
  printButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 8,
    width: width * 0.25,
    height: height * 0.075,
    backgroundColor: COLOR.BUTTON_COLOR,
  },
  buttonLabel: {
    alignSelf: 'center',
    paddingTop: height * 0.01875,
    color: COLOR.BACKGROUND,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: FONTSIZE.button_label_size,
  },
  overlays: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: COLOR.GREY_SUBTRAST,
  },
});

export default styles;
