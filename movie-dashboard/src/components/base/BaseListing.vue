<template>

    <div class="tw-mb-48 md:tw-mb-24 tw-mx-auto tw-w-10/12 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-justify-items-center tw-gap-12" :class="{listingOpen : backgroundStatus}">
      <transition-group name="fade-scale" appear>
        <BaseCard v-for="movie in list" :key="movie.id" :movie="movie" @cardSelected="movieSelected" @cardOpen="openState" @cardHover="listingState"/>
        <BaseCardDetail v-if="selectedMovie" :card="selectedMovie" @cardSelected="movieSelected" @cardHover="listingState" :key="selectedMovie"/>
      </transition-group>
    </div>

  <ListingLoader v-if="!list"/>

</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import BaseCardDetail from "@/components/base/BaseCardDetail";
import ListingLoader from "@/components/loading/ListingLoader";
export default {
  name: "BaseListing",
  components: {ListingLoader, BaseCardDetail, BaseCard},
  props : ['list'],
  data() {
    return {
      selectedMovie : null,
      hoverState : false,
      openStatus : false
    }
  },
  methods : {
    listingState(state) {
      this.hoverState = state
    },
    openState(state) {
      this.openStatus = state
    },
    movieSelected(movie) {
      this.selectedMovie = movie
    }
  },
  computed: {
    backgroundStatus() {
      if((!this.selectedMovie && this.hoverState) || (this.selectedMovie)) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
