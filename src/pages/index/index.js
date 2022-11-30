import '../../layout/index'
import AppBase from "../../libs/AppBase";
import '../../assets/css/color.scss'
import  Vue from 'vue'
import App from "./App.vue";
class VimiApp extends AppBase{
    path='#/'
    onPageReady() {
        super.onPageReady();
        new Vue({
            el: '#vimi-app',
            components: {App},
            template: '<App/>'
        })
    }
}
new VimiApp()

