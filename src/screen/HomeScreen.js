import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import Axios from 'axios';
import API from '../api/api';
import Realm from 'realm';
import { isForInStatement } from '@babel/types';

const realm = new Realm({
    schema: [{name: 'weather', 
    primaryKey: 'id',
    properties: {
        id: 'int',
        main: 'string',
        description: 'string',
    }}]
});

@inject('weahterStore')
@observer
class HomeScreen extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        getWeatherData();
    }

    getWeatherData(){
        this.props.weahterStore.isLoading = true
        Axios.get(API)
        .then((req) => {
            realm.write(() => {
                realm.create('weather', {
                    id: 1,
                    main: req.data.weather[0].main, 
                    description: req.data.weather[0].description,
                },true);
            });
            this.props.weahterStore.isLoading = false
        })
        .catch((err) => {
            console.log(err)
            this.props.weahterStore.isLoading = false
        })
    }

    render(){
        let weatherData = realm.objects('weather');
        return (
            <View style={styles.container}>
                {this.props.weahterStore.isLoading? (<ActivityIndicator style={styles.loader} size="large" color="#0000ff" />):(<View/>)}
                <Text>Today is {weatherData[0].main}</Text>
                <Text>{weatherData[0].description}</Text>
                <Button 
                    title="새로고침"
                    onPress={this.getWeatherData()}
                ></Button>
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