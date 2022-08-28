<template>
  <BaseTabsHandler class="tw-z-20" v-if="genres" :tabs="genres"/>
</template>

<script>
import BaseTabsHandler from "@/components/base/BaseTabsHandler";

export default {
  name: "Listing",
  components: {BaseTabsHandler},
  data() {
    return {
      listing : null,
    }
  },
  async created() {
    if(!this.getConfiguration) { // check if we have the api configuration and fetch it
      await this.$store.dispatch('baseData')
    }
  },

  computed: {
    getConfiguration() {
      return this.$store.state.configuration
    },
    genres() {
      return this.$store.state.genres
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
