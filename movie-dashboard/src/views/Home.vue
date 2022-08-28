<template>
  <div class="tw-relative tw-w-full tw-z-20">
    <h1 class="tw-text-center tw-font-semibold tw-text-8xl tw-mt-24 tw-mb-12 tw-text-white"><img class="tw-relative tw-inline-block tw-w-24 tw-bottom-3" src="@/assets/images/movie-roll.svg"/>Watch</h1>
    <h2 class="tw-text-center tw-font-semibold tw-text-7xl tw-mb-24 tw-text-white">Trending movies</h2>
    <BaseListing :list="trending"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import BaseListing from "@/components/base/BaseListing";
export default {
  name: 'Home',
  components: {BaseListing},
  data() {
    return {
      trending : null,
    }
  },
  async created() {
    if(!this.getConfiguration) { // check if we have the api configuration and fetch it
      await this.$store.dispatch('baseData')
    }
    // fetch trending movie and show only the top 4
    const trendingList = await axios.get('https://api.themoviedb.org/3/trending/movie/week');
    const trending = trendingList.data.results.slice(0, 4)
    this.trending = trending
  },
  computed: {
    getConfiguration() {
      return this.$store.state.configuration
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
