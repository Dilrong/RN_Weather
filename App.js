import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from "react-navigation";
import {Provider} from "mobx-react";
import HomeScreen from './src/screen/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen
}, 
{
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none'
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{
  render(){
    return(
      <Provider>
        <AppContainer/>
      </Provider>
    )
  }
};
