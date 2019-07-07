import { observable, action } from 'mobx';

class WeatherStore{
    @observable isLoading = false

    changeToLoading(state){
        this.isLoading = state;
    }
}

const weatherStore = new WeatherStore();

export default weatherStore;