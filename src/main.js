import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from "axios";
import { createPinia } from 'pinia'

// configuration api authorization sur l'ensemble du projet
axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.SECRET_TOKEN


createApp(App).use(router).use(createPinia()).mount('#app')
