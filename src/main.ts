import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { bag } from './bag';
import './assets/iconts/iconts.css'


const app = createApp(App)
app.use(router)
app.use(bag)
app.config.globalProperties.$bag = bag
app.config.globalProperties.$baseUri = 'http://127.0.0.1:8000'
if(process.env.VUE_APP_BASE_URL) {
    console.log("Using BaseURL from environment_variable")
    app.config.globalProperties.$baseUri = process.env.VUE_APP_BASE_URL
}

app.config.globalProperties.$notify = (message: string) => {
    if (Notification.permission === "granted") {
        new Notification("WebChat", {
            body: message,
        });
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("WebChat", {
                    body: message,
                });
            }
        });
    }
}

app.mount('#app')
