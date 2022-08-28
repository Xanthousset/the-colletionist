import { defineStore } from 'pinia'
import axios from "axios";

export const usePiniaStore = defineStore('piniaStore', {
	state: () => {
		return {
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
		}
	},
	getters: {
		getBackdrop() {
			return this.backdrop
		},
		getSelectedMovieId() {
			return this.selectedMovieId
		},
		getBackdropBlur() {
			return this.backdropBlur
		},
		getGenres() {
			return this.genres
		},
		getConfiguration() {
			return this.configuration
		},
		getUser() {
			return this.user
		},
		getFavorites() {
			return this.favorites
		},
		getShowAuth() {
			return this.showAuth
		},
		getAuthStatus() {
			return this.authStatus
		},
		getRequestToken() {
			return this.requestToken
		},
		getSessionId() {
			return this.sessionId
		},
	},
	actions: {
		// setters
		setBackdrop(obj) {
			this.backdrop = obj
		},
		setSelectedMovieId(obj) {
			this.selectedMovieId = obj
		},
		setBlur(obj) {
			this.backdropBlur = obj
		},

		// API Movie/USer SETTERS
		setGenres(obj) {
			this.genres = obj
		},
		setConfiguration(obj) {
			this.configuration = obj
		},
		setUser(obj) {
			this.user = obj
		},
		setFavorites(obj) {
			this.favorites = obj
		},

		// API Authentication SETTERS
		setShowAuth(obj) {
			this.showAuth = obj
		},
		setAuthStatus(obj) {
			this.authStatus = obj
		},
		setRequestToken(obj) {
			this.requestToken = obj
		},
		setSessionId(obj) {
			this.sessionId = obj
		},

		async baseData() {
			const genresList = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en-US');
			const configuration = await axios.get('https://api.themoviedb.org/3/configuration');
			this.genres = genresList.data.genres
			this.configuration = configuration.data
			console.log(this.genres)
			console.log(this.configuration)
		},
		resetBackdrop() {
			this.selectedMovieId = null
			this.backdrop = null
			this.backdropBlur = null
		},
		async fetchFavorites() {

			const favorites = await axios.get(`https://api.themoviedb.org/3/account/${this.user.id}/favorite/movies?language=en-US&sort_by=created_at.asc`)

			this.favorites = favorites.data.results

		}
	}
})
