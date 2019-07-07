import { observable, action } from 'mobx';

class WeatherStore{
    @observable isLoading = false
    @observable refreshTime = true

    changeToLoading(state){
        this.isLoading = state;
    }
    changeToRefreshTime(state){
        this.refreshTime = state;
    }
}

const weatherStore = new WeatherStore();

export default weatherStore;