import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, SafeAreaView} from 'react-native';
import {inject, observer} from 'mobx-react';
import Axios from 'axios';
import API from '../api/api';
import Realm from 'realm';

const realm = new Realm({
    schema: [{name: 'weather', 
    primaryKey: 'id',
    properties: {
        id: 'int',
        main: 'string',
        description: 'string',
        temp: 'int',
        humidity: 'int'
    }}]
});

@inject('weahterStore')
@observer
export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.getWeatherData();
    }

    initRealm(req){
        let weatherData = realm.objects('weather')
        if(weatherData.length === 0){
            realm.write(() => {
                realm.create('weather', {
                    id: 1,
                    main: req.data.weather[0].main, 
                    description: req.data.weather[0].description,
                    temp: req.data.main.temp,
                    humidity: req.data.main.humidity
                });
            });
        }else{
            realm.write(() => {
                realm.create('weather', {
                    id: 1,
                    main: req.data.weather[0].main, 
                    description: req.data.weather[0].description,
                    temp: req.data.main.temp,
                    humidity: req.data.main.humidity
                }, true);
            });
        }
    }

    getWeatherData = async() => {
        this.props.weahterStore.changeToLoading(true)
        await Axios.get(API)
        .then((req) => {
            this.initRealm(req);
        })
        .catch((err) => {
            console.log(err)
        })
        this.props.weahterStore.changeToLoading(false);
    }

    render(){
        let weatherData = realm.objects('weather');
        return (
            <View style={styles.container}>
                {this.props.weahterStore.isLoading? (<ActivityIndicator style={styles.loader} size="large" color="#e67e22" />):
                (<SafeAreaView style={styles.container}>
                    <Text style={styles.weatherText}>{weatherData[0].main}</Text>
                    <Text style={styles.weatherDescription}>{weatherData[0].description}</Text>
                    <Text style={styles.weatherDescription}>temp : {weatherData[0].temp}</Text>
                    <Text style={styles.weatherDescription}>humidity: {weatherData[0].humidity}</Text>
                    <View style={styles.button}>
                        <Button 
                            title="refresh"
                            color="#fff"
                            onPress={() => {
                                this.getWeatherData()
                            }}
                        />
                </View>
                </SafeAreaView>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    },
    weatherDescription: {
        fontSize: 14,
        margin: 5
    },
    button: {
        width: 100,
        borderRadius: 4,
        backgroundColor: '#e67e22',
        margin: 10
    },
    loader:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});