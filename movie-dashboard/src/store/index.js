import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    // controls the background
    backdrop : null,
    selectedMovieId : null,
    backdropBlur : false,

    // api movie/user related data
    genres : null,
    configuration : null,
    user : null,
    favorites : null,

    // Authentication related data
    showAuth : false,
    authStatus : false,
    requestToken : null,
    sessionId : null,
  },
  mutations: {
    // Background SETTERS
    setBackdrop(state, obj) {
      state.backdrop = obj
    },
    setSelectedMovieId(state, obj) {
      state.selectedMovieId = obj
    },
    setBlur(state , obj) {
      state.backdropBlur = obj
    },

    // API Movie/USer SETTERS
    setGenres(state, obj) {
      state.genres = obj
    },
    setConfiguration(state, obj) {
      state.configuration = obj
    },
    setUser(state, obj) {
      state.user = obj
    },
    setFavorites(state, obj) {
      state.favorites = obj
    },

    // API Authentication SETTERS
    setShowAuth(state, obj) {
      state.showAuth = obj
    },
    setAuthStatus(state, obj) {
      state.authStatus = obj
    },
    setRequestToken(state, obj) {
      state.requestToken = obj
    },
    setSessionId(state, obj) {
      state.sessionId = obj
    },

  },
  actions: {
    async baseData(context) {
      const genresList = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en-US');
      const configuration = await axios.get('https://api.themoviedb.org/3/configuration');

      context.commit('setGenres' , genresList.data.genres)
      context.commit('setConfiguration' , configuration.data)
    },
    resetBackdrop(context) {
      context.commit('setSelectedMovieId' , null)
      context.commit('setBackdrop' , null)
      context.commit('setBlur' , false)
    },
    async fetchFavorites(context) {

      const favorites = await axios.get(`https://api.themoviedb.org/3/account/${context.state.user.id}/favorite/movies?language=en-US&sort_by=created_at.asc`)
      context.commit('setFavorites' , favorites.data.results)

    }
  },
  modules: {
  }
})
