import { observable } from 'mobx';

class WeatherStore{
    @observable data = []
    @observable isLoading = false
}

const weatherStore = new WeatherStore();

export default weatherStore;