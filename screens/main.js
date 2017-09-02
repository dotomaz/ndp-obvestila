import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import store from '../store/main_store' 

import ObvestilaScreen from './obvestila';
import Sidebar from './sidebar';



const AppDrawerNavigator = DrawerNavigator({
    Vsi: { 
      screen: ObvestilaScreen,
      path: "all",
      navigationOptions: ({navigation}) => ({
        title: "Vsa obvestila",
      }),
    },
    U7: { 
      screen: ObvestilaScreen,
      path: "u7",
      navigationOptions: ({navigation}) => ({
        title: "U7",
      }),
    },
    U9: { 
      screen: ObvestilaScreen,
      path: "u9",
      navigationOptions: ({navigation}) => ({
        title: "U9",
      }),
    },
    U11: { 
      screen: ObvestilaScreen,
      path: "u11",
      navigationOptions: ({navigation}) => ({
        title: "U11",
      }),
    },
    U13: { 
      screen: ObvestilaScreen,
      path: "u13",
      navigationOptions: ({navigation}) => ({
        title: "U13",
      }),
    },
    U15: { 
      screen: ObvestilaScreen,
      path: "u15",
      navigationOptions: ({navigation}) => ({
        title: "U15",
      }),
    }

  },{
      drawerWidth: 300,
      drawerPosition: 'left',
      contentComponent: Sidebar,
      contentOptions: {
        activeTintColor: '#f33',
        style: {
          
        }
      }

});


export default class MainScreen extends React.Component {

  render() {
    return (
      <AppDrawerNavigator style={styles.container}  ref={nav => {this.navigator = nav;}} screenProps={ {store} } ></AppDrawerNavigator>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#ccc"
  },
});