import Realm from 'realm';

let WeatherSchema = {
    name: 'Wheater',
    properties: {
        coord: {
            lon: {type: 'int', default: 0},
            lat: {type: 'int', default: 0},
        },
        weather: [
            {
                id: {type: 'int', default: 0},
                main: 'string',
                description: 'string',
                icon: 'string'
            }
        ],
        base: 'string',
        main: {
            temp: {type: 'int', default: 0},
            pressure: {type: 'int', default: 0},
            humidity: {type: 'int', default: 0},
            temp_min: {type: 'int', default: 0},
            temp_max: {type: 'int', default: 0}
        },
        visibility: {type: 'int', default: 0},
        wind: {
            speed: {type: 'int', default: 0},
            deg: {type: 'int', default: 0}
        },
        clouds: {
            all: {type: 'int', default: 0}
        },
        dt: {type: 'int', default: 0},
        sys: {
            type: {type: 'int', default: 0},
            id: {type: 'int', default: 0},
            message: {type: 'int', default: 0},
            country: 'string',
            sunrise: {type: 'int', default: 0},
            sunset: {type: 'int', default: 0}
        },
        timezone: {type: 'int', default: 0},
        id: {type: 'int', default: 0},
        name: 'string',
        cod: 'string',
    }
};

const realm = new Realm({schema: [WeatherSchema]});
export default realm;