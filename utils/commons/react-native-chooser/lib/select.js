import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  ViewPropTypes
} from "react-native";

import OptionList from "./optionlist";
import Indicator from "./indicator";

const window = Dimensions.get("window");
const { height, width } = Dimensions.get('window');

export default class Select extends Component {
  static defaultProps = {
    defaultText: "Click To Select",
    onSelect: () => {},
    transparent: false,
    animationType: "none",
    indicator: "none",
    indicatorColor: "black",
    indicatorSize: 10,
    indicatorIcon: null,
    modalVisible: false,
  };
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    modalVisible: PropTypes.bool,
    defaultText: PropTypes.string,
    onSelect: PropTypes.func,
    textStyle: Text.propTypes.style,
    backdropStyle: ViewPropTypes.style,
    optionListStyle: ViewPropTypes.style,
    indicator: PropTypes.string,
    indicatorColor: PropTypes.string,
    indicatorSize: PropTypes.number,
    indicatorStyle: ViewPropTypes.style,
    indicatorIcon: PropTypes.element,
  };

  constructor(props) {
    super(props);
    this.selected = this.props.selected;
    this.state = {
      modalVisible: this.props.modalVisible,
      defaultText: this.props.defaultText,
      selected: this.props.selected,
      modalStyle: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected == null)
      this.setState({
        defaultText: nextProps.defaultText
      });
  }

  onSelect(label, value) {
    this.props.onSelect(value, label);
    this.setState({
      modalVisible: false,
      defaultText: label
    });
  }

  onClose() {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    let {
      containerStyle,
      style,
      defaultText,
      textStyle,
      backdropStyle,
      optionListStyle,
      transparent,
      animationType,
      indicator,
      indicatorColor,
      indicatorSize,
      indicatorStyle,
      indicatorIcon,
      selectedStyle,
      selected
    } = this.props;

    return (
      <View style={[containerStyle]}
      ref={(ref) => {
        this.slectedListView = ref
      }}
      onLayout={ (e) => {
        // console.log("Event ", e.nativeEvent.layout)
      }}
      >
        <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
          <View style={[styles.selectBox, style]}>
            <View style={styles.selectBoxContent}>
              <Text style={textStyle}>{this.state.defaultText}</Text>
              {indicatorIcon ?
              indicatorIcon
              :
                <Indicator
                  direction={indicator}
                  color={indicatorColor}
                  size={indicatorSize}
                  style={indicatorStyle}
                />
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          transparent={transparent}
          animationType={animationType}
          visible={this.state.modalVisible}
          onRequestClose={this.onClose.bind(this)}
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
          <TouchableWithoutFeedback onPress={this.onModalPress.bind(this)}>
            <View style={[styles.modalOverlay, backdropStyle]}>
              <OptionList
                onSelect={this.onSelect.bind(this)}
                selectedStyle={selectedStyle}
                selected={selected}
                style={[optionListStyle, this.state.modalStyle]}
              >
                {this.props.children}
              </OptionList>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
      </View>
    );
  }
  /*
		Fired when user clicks the button
	 */
  onPress() {
    Keyboard.dismiss();

    this.slectedListView.measureInWindow((fx, fy, width, height) => {
      // console.log('Component width is: ' + width)
      // console.log('Component height is: ' + height)
      // console.log('X offset to frame: ' + fx)
      // console.log('Y offset to frame: ' + fy)
      this.setState({
        modalVisible: !this.state.modalVisible,
        modalStyle: {
          marginTop: fy + height - 8,
          marginLeft: fx + 1,
          width: width - 2,
        }
      });
    })
  }

  /*
	 Fires when user clicks on modal. primarily used to close
	 the select box
	 */

  onModalPress() {
    this.setState({
      modalVisible: false
    });
  }

  setSelectedText(text) {
    this.setState({
      defaultText: text
    });
  }
}

var styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    width: '100%',
    borderColor: "black"
  },
  selectBoxContent: {
    flex: 1,
    width: '100%',
    flexDirection: "row",
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  modalOverlay: {
    flex: 1,
  }
});
