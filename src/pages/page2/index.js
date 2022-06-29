import '../../layout/index'
import AppBase from "../../layout/AppBase";
import './scss/index.scss'
import  Vue from 'vue'
import App from "./App.vue";
class VimiApp extends AppBase{
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

