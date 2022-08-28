<template>

  <BaseListing :list="movieList" :load-more="true"/>
  <transition name="fade" appear>
      <ScrollLoading v-if="loading"/>
  </transition>
</template>

<script>
import axios from "axios";
import BaseListing from "@/components/base/BaseListing";
import ScrollLoading from "@/components/loading/ScrollLoading";

export default {
  name: "BaseTab",
  components: {ScrollLoading, BaseListing},
  props : ['id' , 'name' , 'listing'],
  data () {
    return {
      isActive: false,
      movieList : null,
      page : 1,
      loading : false
    }
  },
  async created() {
    const genreList = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.id}`)
    this.movieList = genreList.data.results
    this.page++
  },
  methods : {
    async fetchNextPage() {
      // infinite scroll | load more movies
      if(!this.loading) {
        this.loading = true
        const nextPage = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.id}&page=${this.page}`)
        this.movieList = this.movieList.concat(nextPage.data.results);
        this.page++
        this.loading = false
      }
    },
    onScroll () {
      const scrollTop = window.scrollY
      const clientHeight = document.querySelector('#mainContent').clientHeight
      const windowHeight = window.innerHeight
      // check if we're at 150px from bottom of page
      if (scrollTop >= clientHeight - windowHeight - 150) {
        this.fetchNextPage()
      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  },
}
</script>

<style lang="scss" scoped>


</style>
