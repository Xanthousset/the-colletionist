<template>
  <div v-show="showAuthCheck" class="tw-cursor-pointer popupLogin" @click.self="closeAuth">
    <div class="tw-cursor-auto tw-bg-white tw-text-center tw-rounded-lg tw-p-12 popup__box">
      <p class="tw-text-3xl"> {{ message }}</p>
      <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-mt-12">
        <BaseButton  @click="openAuth" text="Link Account"/>
        <BaseButton v-if="failed" @click="resetAuth" class="md:tw-ml-12 tw-mt-6 md:tw-mt-0" text="Continue as guest"/>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {usePiniaStore} from "@/store/piniaStore";
import {mapActions , mapState } from "pinia";
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "AuthPopup",
  components: {BaseButton},
  data() {
    return {
      message : 'To register and see your favorite movies you need to link your TMBD account',
      failed: false
    }
  },
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
      }).catch(() => {
          this.setShowAuth(true)
          this.message = 'Something went wrong while attempting to link your TMBD account, please try again or continue as guest'
          this.failed = true
      })
      if(resp.data.success) {
        this.setAuthStatus(resp.data.success)
        this.setSessionId(resp.data.session_id)

        const account = await axios.get(`https://api.themoviedb.org/3/account`)
        this.setUser(account.data)
        await this.fetchFavorites()
      }
      else {
        this.setShowAuth(true)
        this.message = 'Something went wrong on your previous linking attempt please try again'
      }
    },
    resetAuth() {
      this.failed = false
      this.setShowAuth(false)
      this.message = 'To register and see your favorite movies you need to link your TMBD account'
    }
  }
}
</script>

<style lang="scss" scoped>
.popupLogin {
  position: fixed;
  width: inherit;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($black , .5);
  z-index: 50;

  .popup__box {
    max-width: calc(100% - 3rem);
  }
}
</style>
