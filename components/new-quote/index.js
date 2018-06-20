import React, { Component } from 'react';
import { Alert, Animated, AppRegistry, Keyboard, Image, NetInfo, Dimensions, Easing, View, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StatusBar, SafeAreaView } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
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
import { FONTSIZE, COLOR, APP, US_STATE, DEFAULT_LOCATION, GLASS_TYPE } from '../../utils/constant';
import { StringHelper, AnimationHelper, NumberHelper } from '../../utils/helper';

import styles from './styles';
import newQuoteState from '../../objects/newQuoteState';
import imageConstant from '../../utils/imageConstant';

const { height, width } = Dimensions.get('window');
const valueHeightHeader = height * 0.075;
const findVehicleFormHeight = height * 0.5;
const findPricingFormHeight = height * 0.675;
const finalizeFormHeight = height * 0.675;
const collapseDegree = -90
const openDegree = 0

class NewQuote extends Component {
  state = {
    license: '',
    markupOrderAmount: '',
    stateSelected: 'STATE',
    glassTypeSelected: GLASS_TYPE[0],
    isOpenFindVehicleForm: true,
    isOpenFindPricingForm: false,
    isOpenFinalizeForm: false,
    findVehicleFormHeight: new Animated.Value(findVehicleFormHeight),
    findVehicleFormDegree: new Animated.Value(openDegree),
    findPricingFormHeight: new Animated.Value(valueHeightHeader),
    findPricingFormDegree: new Animated.Value(collapseDegree),
    finalizeFormHeight: new Animated.Value(valueHeightHeader),
    finalizeFormDegree: new Animated.Value(collapseDegree),
    isRequesting: false,
    markupPriceIndexSelected: 0,
    cost: 154.40,
    costTotal: 0,
  };

  canTouchFindVehicle = true;
  canTouchFindPricing = true;
  canTouchFinalize = true;

  componentDidMount() {

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.setState({ isConnected });
        // console.log("ISCONNECTED: ", isConnected);
        this.props.actions.updateStatusNetwork(isConnected);
        if (isConnected) {
          this.props.actions.setGPSLocationDefault(DEFAULT_LOCATION);
          this.props.actions.requestToken()
        } else {
          this.showAlert(I18n.t('network_error'));
        }
      }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentDidUpdate(prevProps) {
    this.handlerUpdateState(prevProps.newQuote.state, this.props.newQuote.state)
    this.handlerUpdateTokenUser(prevProps.user.token, this.props.user.token)
    this.handlerUpdateStep(prevProps.newQuote.step, this.props.newQuote.step)
    this.handlerUpdateRequestFailure(prevProps.apps, this.props.apps)
  }

  // Hanlder Update prop
  handlerUpdateState = (prevState, currentState) => {
    if (prevState !== currentState) {
      const item = US_STATE.find(item => {
        return item.name === currentState
      });

      this.setState({ stateSelected: item })
    }
  }

  handlerUpdateTokenUser = (prevToken, currentToken) => {
    if (prevToken !== currentToken) {
      if (this.props.apps.isConnected) {
        this.props.actions.requestCampaignName(this.props.user)
      } else {
        this.showAlert(I18n.t('network_error'))
      }
    }
  }

  handlerUpdateStep = (prevStep, currentStep) => {
    if (prevStep !== currentStep) {
      switch (currentStep) {
        case newQuoteState.STEP_DEFINED.FIND_VEHICLE:

          if (this.state.isOpenFindPricingForm) {
            this.toggleFindPricingForm()
          }

          if (this.state.isOpenFinalizeForm) {
            this.toggleFinalizeForm()
          }

          this.setState({ glassTypeSelected: GLASS_TYPE[0], })
          break;

        case newQuoteState.STEP_DEFINED.FIND_PRICING:
          console.log("STATUS VEHICLE FORM WHEN GET VEHICLE: ", this.state.isOpenFindPricingForm);

          if (this.state.isOpenFindVehicleForm) {
            this.toggleFindVehicleForm()
          }

          if (this.state.isOpenFinalizeForm) {
            this.toggleFinalizeForm()
          }

          if (!this.state.isOpenFindPricingForm) {
            this.toggleFindPricingForm()
          }
          this.setState({
            isOpenFinalizeForm: false,
            markupPriceIndexSelected: 0,
            markupOrderAmount: '',
          })
          break;

        case newQuoteState.STEP_DEFINED.FINALIZE:
          if (this.state.isOpenFindVehicleForm) {
            this.toggleFindVehicleForm()
          }
          if (this.state.isOpenFindPricingForm) {
            this.toggleFindPricingForm()
          }
          if (!this.state.isOpenFinalizeForm) {
            this.toggleFinalizeForm()
          }
          break;
        default:
          break;
      }
    }
  }

  handlerUpdateRequestFailure = (prev, current) => {
    if (current.page !== APP.NEW_QUOTE) {
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

  onSelect = (value, label) => {
    this.setState({ stateSelected: value });
  }

  onGlassTypeSelect = (value, label) => {
    this.setState({ glassTypeSelected: value });
  }

  getData = (data) => {
    return data.map( element => {
      return <Option styleText={{ color: element === this.state.stateSelected ? COLOR.BUTTON_COLOR:COLOR.BLACK }} key={element.code} value={element}>{element.name}</Option>;
    })
  }

  getGlassTypeData = (data) => {
    return data.map(element => {
      return <Option styleText={{ fontSize: 16, color: element === this.state.glassTypeSelected ? COLOR.BUTTON_COLOR : COLOR.BLACK }} key={element} value={element}>{element}</Option>;
    })
  }

  handlerTextChanged = (text) => {
    console.log("String: ", text);
    if (StringHelper.isNumericAndLetterCharacter(text)) {
      this.setState({ license: text });
    } else {
      this.refs.licenseTI.setNativeProps({ text: this.state.license })
      this.setState({ license: this.state.license })
    }
  }

  handlerAmountTextChanged = (e) => {
    const dotCount = e.split('.').length - 1
    if (dotCount > 1) {
      return
    }

    this.setState({ markupOrderAmount: e.replace('-', '') });
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
    this.props.actions.updateStatusNetwork(isConnected);
  };

  toggleFindVehicleForm = () => {
    if (this.canTouchFindVehicle === false) {
      return;
    }
    this.canTouchFindVehicle = false;
    Animated.parallel([
      AnimationHelper.initializeAnimation(this.state.findVehicleFormHeight, this.state.isOpenFindVehicleForm ? valueHeightHeader : findVehicleFormHeight, 500, Easing.linear, 0),
      AnimationHelper.initializeAnimation(this.state.findVehicleFormDegree, this.state.isOpenFindVehicleForm ? collapseDegree : openDegree, 500, Easing.linear, 0),
    ]).start(() => {
      // complete animation
      this.canTouchFindVehicle = true;
      this.setState({ isOpenFindVehicleForm: this.state.isOpenFindVehicleForm ? false : true});
    });
  }

  toggleFindPricingForm = () => {
    console.log("STATUS FIND PRICING: ", this.state.isOpenFindPricingForm);

    if (this.canTouchFindPricing === false || this.props.newQuote.step === newQuoteState.STEP_DEFINED.FIND_VEHICLE) {
      return;
    }
    this.canTouchFindPricing = false;
    Animated.parallel([
      AnimationHelper.initializeAnimation(this.state.findPricingFormHeight, this.state.isOpenFindPricingForm ? valueHeightHeader : findPricingFormHeight, 500, Easing.linear, 0),
      AnimationHelper.initializeAnimation(this.state.findPricingFormDegree, this.state.isOpenFindPricingForm ? collapseDegree : openDegree, 500, Easing.linear, 0),
    ]).start(() => {
      // complete animation
      this.canTouchFindPricing = true;
      this.setState({ isOpenFindPricingForm: this.state.isOpenFindPricingForm ? false : true });
    });
  }

  toggleFinalizeForm = () => {

    if (this.canTouchFinalize === false || this.props.newQuote.step !== newQuoteState.STEP_DEFINED.FINALIZE) {
      return;
    }
    this.canTouchFindVehicle = false;
    Animated.parallel([
      AnimationHelper.initializeAnimation(this.state.finalizeFormHeight, this.state.isOpenFinalizeForm ? valueHeightHeader : finalizeFormHeight, 500, Easing.linear, 0),
      AnimationHelper.initializeAnimation(this.state.finalizeFormDegree, this.state.isOpenFinalizeForm ? collapseDegree : openDegree, 500, Easing.linear, 0),
    ]).start(() => {
      // complete animation
      this.canTouchFindVehicle = true;
      this.setState({ isOpenFinalizeForm: this.state.isOpenFinalizeForm ? false:true });
    });
  }

  handlerTouchFindVehicle = async () => {
    const { license, stateSelected } = this.state;
    const { campaignID } = this.props.campaign;
    const { token } = this.props.user;

    if (license === '') {
      this.showAlert(I18n.t('error_license_cannot_empty'))
      return;
    }

    if (stateSelected === 'State') {
      this.showAlert(I18n.t('error_state_cannot_empty'))
      return;
    }

    if (this.props.apps.isConnected) {
      console.log("TOUCH FIND VEHICLE ACTION");

      Keyboard.dismiss()

      // Make sure collapse FindPricingForm
      if (this.state.isOpenFindPricingForm) {
        this.toggleFindPricingForm()
      }

      // Make sure collapse FinalizedForm
      if (this.state.isOpenFinalizeForm) {
        this.toggleFinalizeForm()
      }

      // this.props.actions.getPriceMarkup(campaignID, token)
      this.props.actions.findVehicleByInfo(campaignID, license, stateSelected, token);
    } else {
      this.showAlert(I18n.t('network_error'))
    }
  }

  /**
   * Call actions to get prices and show finalize step
   */
  handlerTouchFindPricing = () => {
    const { campaignID } = this.props.campaign;
    const { token } = this.props.user;

    if (this.props.apps.isConnected) {
      this.setState({
        markupPriceIndexSelected: 0,
        markupOrderAmount: '',
      })
      this.props.actions.getPriceMarkup(campaignID, token)
    } else {
      this.showAlert(I18n.t('network_error'))
    }
  }

  /**
   * Call actions to create new quote
   */
  handlerTouchFinalizeQuote = () => {
    const { user } = this.props
    const { campaignID } = this.props.campaign;
    const { vehicleInfo, priceMarkup } = this.props.newQuote;
    const { glassTypeSelected, license, stateSelected, markupPriceIndexSelected, markupOrderAmount } = this.state;
    const glassPartId = "DW02030GTYN"
    const makrupSelected = markupPriceIndexSelected < priceMarkup.length ? priceMarkup[markupPriceIndexSelected] : { priceID: null, amount: markupOrderAmount.replace("$", "")}
    const quoteData = {
      campaignID,
      vehicleInfo,
      glassPartId,
      license,
      glassTypeSelected,
      stateSelected,
      makrupSelected,
      costTotal: this.getQuotePriceTotal(),
    }

    if (this.props.apps.isConnected) {
      this.props.actions.moveToPrintCode(quoteData)
    } else {
      this.showAlert(I18n.t('network_error'))
    }
  }

  showAlert = (message) => {
    Alert.alert(I18n.t('error'), message, [{
      text: 'OK',
      onPress: () => { }
    }])
  }

  updateTextValue = () => {
    this.setState({ license: this.state.license.toUpperCase()})
  }

  updateAmountValue = () => {
    const amountValue = NumberHelper.getPriceNumberFromString(this.state.markupOrderAmount)

    this.setState({ markupOrderAmount: amountValue !== null ? `$${amountValue}` : ''})
  }

  detectAmountOnBlur = () => {
    // When focus on amount Text input is lost
    const amountValue = NumberHelper.getPriceNumberFromString(this.state.markupOrderAmount)

    console.log("detectAmountBlur: ", this.state.markupPriceIndexSelected);
    if (this.state.markupPriceIndexSelected >= this.props.newQuote.priceMarkup.length) {
      if (amountValue <= 0 || amountValue === null) {
        this.refs.priceOtherAmoutTI.focus()
        this.showAlert(I18n.t('amount_value_error'))
      }
    }
  }

  handlerSelectMarkup = (index) => {
    console.log("Select: ", index);
    if (index < this.props.newQuote.priceMarkup.length) {
      this.setState({markupOrderAmount: ''})
      this.refs.priceOtherAmoutTI.blur()
    }
    this.setState({ markupPriceIndexSelected: index })
  }

  getQuotePriceTotal = () => {
    const { priceMarkup } = this.props.newQuote;
    const { cost, markupPriceIndexSelected, markupOrderAmount } = this.state;
    if (priceMarkup === null || priceMarkup.length <= 0 || (this.state.markupOrderAmount === '' && markupPriceIndexSelected >= priceMarkup.length)) {
      console.log("Total: ", cost);
      return NumberHelper.setFormatCostNumber(cost)
    }
    if (markupPriceIndexSelected < priceMarkup.length) {
      const { amount, percent, priceID } = priceMarkup[markupPriceIndexSelected];
      const amountValue = NumberHelper.getPriceNumberFromString(amount)
      if (percent !== null) {
        return NumberHelper.setFormatCostNumber(parseFloat(cost) * parseFloat(percent));
      } else {
        return NumberHelper.setFormatCostNumber(parseFloat(cost) + parseFloat(amountValue));
      }
    } else {
      const amountValue = NumberHelper.getPriceNumberFromString(this.state.markupOrderAmount)
      return NumberHelper.setFormatCostNumber(parseFloat(cost) + parseFloat(amountValue));
    }
  }

  loadPriceMarkup = () => {

    const { priceMarkup } = this.props.newQuote;

    if (priceMarkup === null || priceMarkup.length <= 0) {
      return;
    }

    return priceMarkup.map( (element, index) => {
      const { markupPriceIndexSelected } = this.state;
      const { amount, percent, priceID } = element;
      const enable = index === markupPriceIndexSelected;
      const backgroundColor = { backgroundColor: enable ? COLOR.BUTTON_COLOR : COLOR.BUTTON_COLOR_DISABLE}
      const margin = { marginBottom: (index / 2) < (priceMarkup.length / 2) ? height * 0.025 : 0}
      return (
        <TouchableOpacity key={priceID}
          style={[styles.priceMarkupButton, backgroundColor, margin]}
          onPress={(e) => {this.handlerSelectMarkup(index)}}>
          <Text style={styles.priceMarkupLabelButton}>${percent !== null ? percent : amount}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {

    const { vehicleInfo } = this.props.newQuote;

    const rotateFindVehicleArrow = this.state.findVehicleFormDegree.interpolate({
      inputRange: [-90, 0],
      outputRange: ['-90deg', '0deg'],
    })
    const rotateFindPricingArrow = this.state.findPricingFormDegree.interpolate({
      inputRange: [-90, 0],
      outputRange: ['-90deg', '0deg'],
    })
    const rotateFinalizeArrow = this.state.finalizeFormDegree.interpolate({
      inputRange: [-90, 0],
      outputRange: ['-90deg', '0deg'],
    })

    // console.log("PROP: ", this.props.newQuote);

    return (
      <KeyboardAwareScrollView
        behavior="padding"
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableOnAndroid
        // extraScrollHeight={0}
        extraHeight={10}
        scrollEnabled={false}
        keyboardShouldPersistTaps='handled'
      >
        <SafeAreaView style={styles.container}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.headerContainer}>
              <Image style={styles.logo} source={imageConstant.Logo} />
            </View>
            <Text style={styles.title}>{I18n.t('new_quote')}</Text>

            <Animated.View style={[styles.findVerhicleForm, { height: this.state.findVehicleFormHeight }]}>
              <TouchableWithoutFeedback onPress={this.toggleFindVehicleForm}>
                <View style={styles.headerform}>
                  <Text style={styles.titleForm}>{I18n.t('find_vehicle')}</Text>
                  <View style={styles.iconHeader}>
                    <Animated.View style={[styles.toggle_arrow, { transform: [{ rotate: rotateFindVehicleArrow }] }]}>
                      <FontAwesome
                        name="angle-down"
                        size={FONTSIZE.toggle_size}
                        color={COLOR.BACKGROUND}
                      />
                    </Animated.View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.contentForm}>
                <Text style={[styles.inputField, { backgroundColor: COLOR.WHITE_DISABLED, textAlignVertical: 'center' }]}>{this.props.campaign.name}</Text>
                <TextInput style={styles.inputField}
                  ref='licenseTI'
                  returnKeyType={'next'}
                  value={this.state.license}
                  placeholder={I18n.t('license_plate')}
                  placeholderTextColor='rgba(0,0,0,0.5)'
                  autoCapitalize="characters"
                  autoCorrect={false}
                  keyboardType="email-address"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  editable={true}
                  maxLength={20}
                  onChangeText={this.handlerTextChanged}
                  onEndEditing={this.updateTextValue}
                />
                <View style={styles.selectViewGroup}>
                  <Select containerStyle={{ width: '100%' }}
                    style={[styles.selectField, { borderColor: "transparent"}]}
                    ref="selectField"
                    onSelect={this.onSelect}
                    onPressSelectedField={this.handlerPressModal}
                    onClose={this.handlerCloseModal}
                    defaultText={this.state.stateSelected.name}
                    textStyle={{flex: 1, width: '100%', marginTop: '5%'}}
                    transparent
                    indicatorIcon={<FontAwesome
                      style={{height: '100%', paddingTop: '5%'}}
                      name="caret-down"
                      size={FONTSIZE.toggle_medium_size}
                      color={COLOR.GREY}
                    />}
                    optionListStyle={{ backgroundColor: "#fff" }}
                  >
                    { this.getData(US_STATE) }
                  </Select>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handlerTouchFindVehicle}>
                  <Text style={styles.buttonLabel}>{I18n.t('find_vehicle')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Animated.View style={[styles.findPricingForm, { height: this.state.findPricingFormHeight }]}>
              <TouchableWithoutFeedback onPress={this.toggleFindPricingForm}>
                <View style={styles.headerform}>
                  <Text style={styles.titleForm}>{I18n.t('find_pricing')}</Text>
                  <View style={styles.iconHeader}>
                    <Animated.View style={[styles.toggle_arrow, { transform: [{ rotate: rotateFindPricingArrow }] }]}>
                    <FontAwesome
                      name="angle-down"
                      size={FONTSIZE.toggle_size}
                      color={COLOR.BACKGROUND}
                    />
                    </Animated.View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.contentForm}>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('make')}</Text>
                  <Text style={styles.valueFindPricing}>{vehicleInfo.makeID != null ? vehicleInfo.makeID : ''}</Text>
                </View>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('model')}</Text>
                  <Text style={styles.valueFindPricing}>{vehicleInfo.modelID != null ? vehicleInfo.modelID : ''}</Text>
                </View>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('year')}</Text>
                  <Text style={styles.valueFindPricing}>{vehicleInfo.year != null ? vehicleInfo.year : ''}</Text>
                </View>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('style')}</Text>
                  <Text style={styles.valueFindPricing}>{vehicleInfo.style != null ? vehicleInfo.style : ''}</Text>
                </View>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('submodel')}</Text>
                  <Text style={styles.valueFindPricing}>{vehicleInfo.submodelID != null ? vehicleInfo.submodelID : ''}</Text>
                </View>
                <View style={styles.selectGlassTypeGroup}>
                  <Text style={styles.labelFindPricing}>{I18n.t('glass_type')}</Text>
                  <Select containerStyle={{ width: '60%'}}
                    style={[styles.selectGlassTypeField, { borderColor: "transparent" }]}
                    onSelect={this.onGlassTypeSelect}
                    defaultText={this.state.glassTypeSelected}
                    textStyle={{ flex: 1, width: '100%', marginTop: '8%', fontSize: 16, }}
                    transparent
                    indicatorIcon={<FontAwesome
                      style={{ height: '100%', paddingTop: '10%' }}
                      name="caret-down"
                      size={FONTSIZE.toggle_small_size}
                      color={COLOR.GREY}
                    />}
                    optionListStyle={{ backgroundColor: "#fff" }}
                  >
                    {this.getGlassTypeData(GLASS_TYPE)}
                  </Select>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handlerTouchFindPricing}>
                  <Text style={styles.buttonLabel}>{I18n.t('next')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            <Animated.View style={[styles.finalizeForm, { height: this.state.finalizeFormHeight }]}>
              <TouchableWithoutFeedback onPress={this.toggleFinalizeForm}>
                <View style={styles.headerform}>
                  <Text style={styles.titleForm}>{I18n.t('finalize')}</Text>
                  <View style={styles.iconHeader}>
                    <Animated.View style={[styles.toggle_arrow, { transform: [{ rotate: rotateFinalizeArrow }] }]}>
                      <FontAwesome
                        name="angle-down"
                        size={FONTSIZE.toggle_size}
                        color={COLOR.BACKGROUND}
                      />
                    </Animated.View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.contentForm}>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('glass_part')}:</Text>
                  <Text style={styles.valueFindPricing}>DW02030GTYN</Text>
                </View>
                <View style={styles.findPricingField}>
                  <Text style={styles.labelFindPricing}>{I18n.t('cost')}:</Text>
                  <Text style={styles.valueFindPricing}>${NumberHelper.setFormatCostNumber(this.state.cost)}</Text>
                </View>
                <View style={styles.groupMarkedPrice}>
                  {
                    (this.props.newQuote.priceMarkup.length > 0) ? this.loadPriceMarkup():null
                  }
                  <TextInput style={[styles.priceOtherAmount, { backgroundColor: this.state.markupPriceIndexSelected === this.props.newQuote.priceMarkup.length ? COLOR.BACKGROUND: COLOR.WHITE_DISABLED}]}
                    ref='priceOtherAmoutTI'
                    returnKeyType={'next'}
                    value={this.state.markupOrderAmount}
                    placeholder={I18n.t('custom')}
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    keyboardType="numeric"
                    autoCorrect={false}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    editable={true}
                    maxLength={15}
                    onChangeText={this.handlerAmountTextChanged}
                    onEndEditing={this.updateAmountValue}
                    onFocus={ (e) => {this.handlerSelectMarkup(this.props.newQuote.priceMarkup.length)} }
                    onBlur={this.detectAmountOnBlur}
                  />
                </View>
                <View style={styles.findPricingField}>
                  <Text style={[styles.labelFindPricing, { fontWeight: 'bold', width: '50%', fontSize: 19}]}>{I18n.t('quote_price')}:</Text>
                  <Text style={[styles.valueFindPricing, { fontWeight: 'bold', width: '50%', fontSize: 19}]}>${this.getQuotePriceTotal()}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handlerTouchFinalizeQuote}>
                  <Text style={styles.buttonLabel}>{I18n.t('next')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
          {
            this.state.isRequesting ?
            <View style={styles.overlays}>
              <BallIndicator color={COLOR.BACKGROUND} />
            </View>: null
          }
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { apps, newQuote, user, campaign } = state
  return {
    apps,
    newQuote,
    campaign,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...appAction, ...newQuoteAction, ...userAction, ...campaignAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuote);
