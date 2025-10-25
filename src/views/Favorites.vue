<template>
  <div class="tw-relative tw-z-className">
    <h1 class="tw-text-center tw-font-semibold tw-text-7xl tw-my-24 tw-text-white">My Favorites</h1>
    <BaseListing v-if="authStatus" :list="favList"/>
    <div class="tw-w-10/12 tw-mx-auto tw-flex tw-flex-col tw-justify-center tw-items-center" v-else>
      <h2 class="tw-text-center tw-font-semibold tw-text-5xl tw-my-12 md:tw-my-24 tw-text-white">You need to link your account to access your favorite movies</h2>
      <BaseButton @click="linkAccount" class="tw-mt-12" text="I have a TMBD Account"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseListing from "@/components/base/BaseListing";
import { usePiniaStore} from "@/store/piniaStore";
import { mapActions , mapState, storeToRefs } from 'pinia'
import {watch} from "vue";
import BaseButton from "@/components/base/BaseButton";

export default {
  name: "Favorites",
  components: {BaseButton, BaseListing},
  data() {
    return {
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
      })

    } else {
      // fetch user favorites if we're already connected when entering page
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
    async linkAccount() {
      const auth = await axios.get('https://api.themoviedb.org/3/authentication/token/new')
      this.setRequestToken(auth.data.request_token)
      this.setShowAuth(true)
    }
  },
  computed: {
    ...mapState(usePiniaStore, ['configuration' , 'authStatus' , 'user' , 'favorites']),
  },
}
</script>

<style lang="scss" scoped>

</style>
