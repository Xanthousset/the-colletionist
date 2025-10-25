<template>
  <BaseTabsHandler class="tw-z-20" v-if="genres" :tabs="genres"/>
</template>

<script>
import BaseTabsHandler from "@/components/base/BaseTabsHandler";
import { usePiniaStore} from "@/store/piniaStore";
import { mapActions } from 'pinia'
import {mapState} from "pinia/dist/pinia";
export default {
  name: "Listing",
  components: {BaseTabsHandler},
  data() {
    return {
      listing : null,
    }
  },
  async created() {
    if(!this.configuration) { // check if we have the api configuration and fetch it
      await this.baseData()
    }
  },

  computed: {
    ...mapState(usePiniaStore, ['configuration' , 'genres']),
  },
  methods : {
    ...mapActions(usePiniaStore, ['baseData'])
  }

}
</script>

<style lang="scss" scoped>

</style>
