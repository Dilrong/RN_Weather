import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import Axios from 'axios';

class HomeScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>hi</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    }
},
{
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);