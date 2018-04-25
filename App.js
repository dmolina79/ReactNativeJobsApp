import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen'
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    //registerForNotifications();
    // Notifications.addListener((notification) => {
    //   const { data: { text }, origin } = notification;

    //   if (origin === 'received' && text) {
    //     Alert.alert(
    //       'New Push Notification',
    //       text,
    //       [{ text: 'Ok.'}]
    //     );
    //   }   
    // });
  }

  render() {
    const mainTabConfig = {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true,
        animationEnabled: false,
        tabBarOptions: {
          showIcon: true,
          labelStyle: { fontSize: 12},
          iconStyle: { width: 30 },
          upperCaseLabel: false
        },
        navigationOptions: {
          tabBarVisible: true
        }
    };
    
    const mainNavigatorConfig = {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true,
        animationEnabled: false,
        navigationOptions: {
          tabBarVisible: false
        }
    };

    const MainNavigator = TabNavigator({
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen } ,
        main: { 
          screen: TabNavigator({
             map: { screen: MapScreen },
             deck: { screen: DeckScreen },
             review : {
               screen: StackNavigator({
                 review: { screen: ReviewScreen },
                 settings: { screen: SettingsScreen }
               })
             }
          }, mainTabConfig)
        }
    }, mainNavigatorConfig);

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});

// Expo.registerRootComponent(App);

