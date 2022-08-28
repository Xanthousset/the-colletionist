<template>
  <div v-show="showAuth" class="popupLogin" @click.self="closeAuth">
    <div class="tw-bg-white tw-text-center tw-rounded-lg tw-p-12 popup__box">
      <p class="tw-text-3xl">To register and see your favorite movies you need to login to your TMBD account</p>
      <button class="tw-text-white tw-bg-red tw-font-semibold tw-rounded-lg tw-p-6 tw-text-3xl tw-mt-12" @click="openAuth">Link Account</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AuthPopup",
  computed : {
    showAuth() {
      // show authentication popup if account is not linked yet
      if(this.getRequestToken && !this.authStatus && this.popupStatus) {
        return true
      }
      return false
    },
    popupStatus() {
      return this.$store.state.showAuth
    },
    authStatus() {
      return this.$store.state.authStatus
    },
    getRequestToken() {
      return this.$store.state.requestToken
    }
  },
  methods : {
    openAuth() {
      // redirect to TMBD confirmation page
      window.open(`https://www.themoviedb.org/authenticate/${this.getRequestToken}`,'_blank');
    },
    async closeAuth() {
      this.$store.commit('setShowAuth' , false)

      // Register Session ID
      const resp = await axios.post(`https://api.themoviedb.org/3/authentication/session/new` , {
        request_token: this.getRequestToken
      })
      if(resp.data.success) {
        this.$store.commit('setAuthStatus' , resp.data.success)
        this.$store.commit('setSessionId' , resp.data.session_id)

        const account = await axios.get(`https://api.themoviedb.org/3/account`)
        this.$store.commit('setUser' , account.data)
        this.$store.dispatch('fetchFavorites')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popupLogin {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($black , .5);
  z-index: 50;

  .popup__box {
    max-width: calc(100vw - 3rem);
  }
}
</style>
