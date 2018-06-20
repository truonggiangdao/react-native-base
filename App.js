import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font } from 'expo';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import store from './stores';

import NewQuote from './components/new-quote';
import FinalQuote from './components/final-quote';
import PrintQuote from './components/print-quote';

import I18n from './utils/languageUtils';
import imageConstant from './utils/imageConstant';
import AppNavigatorService from './utils/navigators/AppNavigatorService';

// Init navigation slack for app
const MainNavigator = StackNavigator({
  // Main: {
  //   screen: Login
  // },
  NewQuote: {
    screen: NewQuote
  },
  FinalQuote: {
    screen: FinalQuote
  },
  PrintQuote: {
    screen: PrintQuote
  }
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

// Cache Image
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

// Cache Font
function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    I18n.initAsync();
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...Asset.loadAsync([
        imageConstant.Logo,
      ]),
      ...cacheFonts([
        FontAwesome.font,
        MaterialCommunityIcons.font,
        ]),
    ]);
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
          onError={this._handleLoadingError}
        />
      );
    }
    return (
      <Provider store={store}>
        <MainNavigator
          ref={navigatorRef => {
            AppNavigatorService.setContainer(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
