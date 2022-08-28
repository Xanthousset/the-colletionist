<template>
  <div class="tw-relative tw-z-className">
    <h1 class=" tw-text-center tw-font-semibold tw-text-7xl tw-my-24 tw-text-white">My Favorites</h1>
    <BaseListing v-if="connected" :list="favList"/>
  </div>
</template>

<script>
import axios from "axios";
import BaseListing from "@/components/base/BaseListing";
import { usePiniaStore} from "@/store/piniaStore";
import { mapActions , mapState, storeToRefs } from 'pinia'
import {watch} from "vue";

export default {
  name: "Favorites",
  components: {BaseListing},
  data() {
    return {
      connected: false,
      favList: null,
    }
  },
  async created() {
    if (!this.configuration) { // check if we have the api configuration and fetch it
      await this.baseData()
    }
    if (!this.authStatus) { // if we're not connected yet
      await axios.get('https://api.themoviedb.org/3/authentication/token/new').then( (res) => {
        this.setRequestToken(res.data.request_token)
        this.setShowAuth(true)
        this.connected = true
      })

    } else {
      // fetch user favorites if we're already connected when entering page
      this.connected = true
      await this.fetchFavorites()
      this.setFavorites()
    }

    const piniaStore = usePiniaStore()

    const {favorites} = storeToRefs(piniaStore)

    watch(favorites , () => {
      this.setFavorites()
    })

  },
  methods: {
    ...mapActions(usePiniaStore, ['baseData' , 'fetchFavorites' , 'setRequestToken' , 'setShowAuth']),
    setFavorites() {
      this.favList = this.favorites
    },
  },
  computed: {
    ...mapState(usePiniaStore, ['configuration' , 'authStatus' , 'user' , 'favorites']),
  },
}
</script>

<style lang="scss" scoped>

</style>
