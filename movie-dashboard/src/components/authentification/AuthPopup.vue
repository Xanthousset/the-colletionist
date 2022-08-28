<template>
  <div v-show="showAuthCheck" class="popupLogin" @click.self="closeAuth">
    <div class="tw-bg-white tw-text-center tw-rounded-lg tw-p-12 popup__box">
      <p class="tw-text-3xl">To register and see your favorite movies you need to login to your TMBD account</p>
      <button class="tw-text-white tw-bg-red tw-font-semibold tw-rounded-lg tw-p-6 tw-text-3xl tw-mt-12" @click="openAuth">Link Account</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {usePiniaStore} from "@/store/piniaStore";
import {mapActions , mapState } from "pinia";
export default {
  name: "AuthPopup",
  computed : {
    ...mapState(usePiniaStore, ['showAuth' , 'authStatus' , 'requestToken' , 'requestToken']),
    showAuthCheck() {
      // show authentication popup if account is not linked yet
      if(this.showAuth && !this.authStatus && this.requestToken) {
        return true
      }
      return false
    },
  },
  methods : {
    ...mapActions(usePiniaStore, ['fetchFavorites' , 'setShowAuth' , 'setAuthStatus' , 'setSessionId' , 'setUser']),
    openAuth() {
      // redirect to TMBD confirmation page
      window.open(`https://www.themoviedb.org/authenticate/${this.requestToken}`,'_blank');
    },
    async closeAuth() {
      this.setShowAuth(false)

      // Register Session ID
      const resp = await axios.post(`https://api.themoviedb.org/3/authentication/session/new` , {
        request_token: this.requestToken
      })
      if(resp.data.success) {
        this.setAuthStatus(resp.data.success)
        this.setSessionId(resp.data.session_id)

        const account = await axios.get(`https://api.themoviedb.org/3/account`)
        this.setUser(account.data)
        await this.fetchFavorites()
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
