<template>
  <div class="tw-relative tw-z-className">
    <h1 class=" tw-text-center tw-font-semibold tw-text-7xl tw-my-24 tw-text-white">My Favorites</h1>
    <BaseListing v-if="connected" :list="favorites"/>
  </div>
</template>

<script>
import axios from "axios";
import BaseListing from "@/components/base/BaseListing";

export default {
  name: "Favorites",
  components: {BaseListing},
  data() {
    return {
      connected: false,
      favorites: null,
    }
  },
  async created() {
    if (!this.getConfiguration) { // check if we have the api configuration and fetch it
      await this.$store.dispatch('baseData')
    }
    if (!this.getAuthStatus) { // if we're not connected yet
      await axios.get('https://api.themoviedb.org/3/authentication/token/new').then( (res) => {
        this.$store.commit('setRequestToken', res.data.request_token)
        this.$store.commit('setShowAuth', true)
        this.connected = true
      })

    } else {
      // fetch user favorites if we're already connected when entering page
      this.connected = true
      this.$store.dispatch('fetchFavorites')
      this.setFavorites()
    }
  },
  methods: {
    setFavorites() {
      this.favorites = this.$store.state.favorites
    }
  },
  computed: {
    getConfiguration() {
      return this.$store.state.configuration
    },
    getAuthStatus() {
      return this.$store.state.authStatus
    },
    getUser() {
      return this.$store.state.user
    },
    getFavorites() {
      return this.$store.state.favorites
    }
  },
  watch: {
    getUser() {
      this.setFavorites()
    },
    getFavorites() {
      this.setFavorites()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
