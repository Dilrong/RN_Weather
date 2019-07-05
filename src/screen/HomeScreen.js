import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import Axios from 'axios';
import API from '../api/api';

@inject('weahterStore')
@observer
class HomeScreen extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.getWeatherData()
    }

    getWeatherData(){
        this.props.weahterStore.isLoading = true
        Axios.get(API)
        .then((req) => {
            this.props.weahterStore.data = req.data
            this.props.weahterStore.isLoading = false
        })
        .catch((err) => {
            console.log(err)
            this.props.weahterStore.isLoading = false
        })
    }

    render(){
        return (
            <View style={styles.container}>
                {this.props.weahterStore.isLoading? (<ActivityIndicator style={styles.loader} size="large" color="#0000ff" />):(<View/>)}
                <Text>{this.props.weahterStore.data}</Text>
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
    loader:{
        justifyContent: 'center',
        alignItems: 'center',
    }
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