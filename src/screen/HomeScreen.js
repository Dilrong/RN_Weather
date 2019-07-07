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
    }}]
});

@inject('weahterStore')
@observer
export default class HomeScreen extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(!(realm.objects('weather').length)){
            this.getWeatherData();
        }
    }

    getWeatherData = async () => {
        this.props.weahterStore.changeToLoading(true)
        await Axios.get(API)
        .then((req) => {
            realm.write(() => {
                realm.create('weather', {
                    id: 1,
                    main: req.data.weather[0].main, 
                    description: req.data.weather[0].description,
                },true);
            });
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
                    <View style={styles.button}>
                        {this.props.weahterStore.refreshTime? (                        
                        <Button 
                            title="refresh"
                            color="#fff"
                            onPress={() => {
                                this.getWeatherData()
                            }}
                        />):(                        
                        <Button 
                            title="refreshing..."
                            color="#fff"
                        />)}
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