import '../../layout/index'
import AppBase from "../../libs/AppBase";
import './scss/index.scss'
import  Vue from 'vue'
import App from "./App.vue";
class VimiApp extends AppBase{
    path='#/page2'
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

