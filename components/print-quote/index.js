import React, { Component } from 'react';
import { Alert, BackHandler, NetInfo, Dimensions, Image, View, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, WebView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Select, Option } from '../../utils/commons/react-native-chooser';
import BallIndicator from '../../utils/commons/ball-indicator';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import appAction from '../../actions/appActions';
import newQuoteAction from '../../actions/newQuoteActions';
import userAction from '../../actions/userActions';
import campaignAction from '../../actions/campaignActions';

import I18n from '../../utils/languageUtils';
import { FONTSIZE, COLOR, APP, US_STATE, DEFAULT_LOCATION, GLASS_TYPE, HTML_CONTENT, FORMAT_DATE } from '../../utils/constant';
import { StringHelper, AnimationHelper, NumberHelper, DateTimeHelper } from '../../utils/helper';

import styles from './styles';
import newQuoteState from '../../objects/newQuoteState';
import imageConstant from '../../utils/imageConstant';
import quote from '../../api/quote';

const { height, width } = Dimensions.get('window');

class PrintQuote extends Component {
  state = {
    isRequesting: false,
    contentWebHeight: 0,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange',this.handleConnectivityChange);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPressed);
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.setState({ isConnected });
        // console.log("ISCONNECTED: ", isConnected);
        this.props.actions.updateStatusNetwork(isConnected);
        if (isConnected) {
          console.log("QUOTE DATA: ", this.props.newQuote);

          const { campaignID } = this.props.newQuote.quoteData;
          const { token } = this.props.user;
          this.props.actions.getTemplate(campaignID, token)

        } else {
          this.showAlert(I18n.t('network_error'));
        }
      }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange',this.handleConnectivityChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressed);
  }

  componentDidUpdate(prevProps) {
    this.handlerUpdateRequestFailure(prevProps.apps, this.props.apps)
  }

  // Hanlder Update prop
  handlerUpdateRequestFailure = (prev, current) => {
    if (current.page !== APP.FINAL_QUOTE) {
      return;
    }

    if (prev.isRequesting !== current.isRequesting) {
      this.setState({ isRequesting: current.isRequesting })
    }

    // console.log("Show Message: ", prev, current);
    if (prev.isFailure !== current.isFailure && current.isFailure) {
      this.showAlert(current.errorMessage);
    }
  }

  showAlert = (message) => {
    Alert.alert(I18n.t('error'), message, [{
      text: 'OK',
      onPress: () => { }
    }])
  }

  // Handler Event Custom
  // Network event
  handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
    this.props.actions.updateStatusNetwork(isConnected);
  };

  handleBackPressed = () => {
    this.props.actions.backActionToPreviousPage(this.props.apps.page)
    return true;
  }

  /**
   * Handler Touch action
   */
  handlerTouchPrint = () => {

  }

  getDataPrintQuoteHTMLContent = () => {
    const { quotePrint } = this.props.newQuote;
    const { template } = this.props.template;
    console.log("QUOTE PRINT: ", quotePrint);

    if (quotePrint === null || template === "") {
      return "";
    }
    // console.log("PROP: ", this.props, quoteData);
    return HTML_CONTENT.replace(new RegExp("\\[license_plate\\]", "g"), quotePrint.vehicle.license_plate)
      .replace("[date_created]", DateTimeHelper.setFormatDateTimeByString(FORMAT_DATE.QUOTE_DATE, quotePrint.created_at.date))
      .replace("[price]", NumberHelper.setFormatCostNumber(quotePrint.grand_total)).replace("[header]", template.header.text)
      .replace("[make]", quotePrint.vehicle.make).replace("[model]", quotePrint.vehicle.model)
      .replace("[year]", quotePrint.vehicle.year).replace("[style]", quotePrint.vehicle.style)
      .replace("[submodel]", quotePrint.vehicle.submodel).replace("[state]", quotePrint.vehicle.state)
      .replace("[glass_part]", quotePrint.quote_details[0].part_id).replace("[footer]", template.footer.text)
  }

  updatePrintQuoteWebViewHeight = (navState) => {
    console.log("PRINT QUOTE: ", navState);

    const heightContent = parseInt(navState.title)
    if (heightContent !== null) {
      this.setState({ contentWebHeight: heightContent })
    }
  }

  render() {
    const contentWebHeight = this.props.navigation.getParam('contentWebHeight', 0)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.headerContainer}>
            <Image style={styles.logo} source={imageConstant.Logo} />
          </View>
          <Text style={styles.title}>{I18n.t('final_quote')}</Text>

          <WebView style={[styles.webviewContainer, { height: contentWebHeight }]}
            source={{ html: this.getDataPrintQuoteHTMLContent() }}
          />
        </ScrollView>
        <View style={styles.groupCollectionButton}>
          <TouchableOpacity style={[styles.printButton, { backgroundColor: COLOR.BUTTON_GREEN }]} onPress={this.handlerTouchPrint}>
            <Text style={styles.buttonLabel}>{I18n.t('print')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.printButton} onPress={this.handlerTouchPrint}>
            <Text style={styles.buttonLabel}>{I18n.t('void')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.printButton, { backgroundColor: COLOR.GREY }]} onPress={this.handlerTouchPrint}>
            <Text style={styles.buttonLabel}>{I18n.t('new')}</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.isRequesting ?
            <View style={styles.overlays}>
              <BallIndicator color={COLOR.BACKGROUND} />
            </View> : null
        }
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { apps, newQuote, user, campaign, template } = state
  return {
    apps,
    newQuote,
    campaign,
    user,
    template,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...appAction, ...newQuoteAction, ...userAction, ...campaignAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintQuote);
