import '../../layout/index'
import AppBase from "../../layout/AppBase";
class App extends AppBase{
    onPageReady() {
        super.onPageReady();
        document.write("hello web!!")
    }
}
new  App()