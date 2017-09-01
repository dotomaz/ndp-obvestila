import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import store from './store/main_store' 

import ObvestilaScreen from './obvestila';
import SidebarScreen from './sidebar';

const AppStackNavigator = StackNavigator({
    Home: { 
      screen: ObvestilaScreen
    }
  },
  {
    headerMode: 'screen', 
    cardStyle: {backgroundColor: "#8DB916"},
    
});

const AppDrawerNavigator = DrawerNavigator({
    Home: { 
      screen: AppStackNavigator
    }
  },{
    contentComponent: props => (<SidebarScreen {...props} />)    
});


export default class MainScreen extends React.Component {

  render() {
    return (
      <AppDrawerNavigator style={styles.container}  ref={nav => {this.navigator = nav;}} screenProps={ {store} } ></AppDrawerNavigator>
    );
  }
}