import { observable } from 'mobx';

class WeatherStore{
    @observable isLoading = false
}

const weatherStore = new WeatherStore();

export default weatherStore;