import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from "axios";
import { createPinia } from 'pinia'

// configuration api authorization sur l'ensemble du projet
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWY2MzZlYjA5M2U3NTE1ZjRkNTAyNGVhNGE1NDFkNCIsInN1YiI6IjYzMDVkNTE5ZGNiNmEzMDA4MzU3ZmFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZF9lL44CB6h5HqvqKktekdZNDU-2tMI_v27F85A_4kk'


createApp(App).use(router).use(createPinia()).mount('#app')
