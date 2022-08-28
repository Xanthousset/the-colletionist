<template>
  <svg @click="onHeartClick" ref="heart" id="heart" width="32" height="28" viewBox="0 0 28 28"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>

</template>

<script>
import axios from "axios";

export default {
  name: "Favorite",
  props : ['movieId'],
  methods : {
    async onHeartClick() {
      if(!this.getAuthStatus) { // if we're not connected yet
        const auth = await axios.get('https://api.themoviedb.org/3/authentication/token/new')
        this.$store.commit('setRequestToken' , auth.data.request_token)
        this.$store.commit('setShowAuth' , true)
      } else {
        // register movie as favorite
        this.registerMovie()
      }
    },

    async registerMovie() {
      // get current favorite state
      const currentState = await axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}/account_states`)

      let favorite = currentState.data.favorite

      this.colorHeart(!favorite)

      await axios.post(`https://api.themoviedb.org/3/account/${this.getUser.id}/favorite` , {
        "media_type": "movie",
        "media_id": this.movieId,
        "favorite": !favorite
      })

      this.$store.dispatch('fetchFavorites')

    },
    colorHeart(newFavState) {
      if(newFavState) {
        this.$refs.heart.classList.add('fill')
      } else {
        this.$refs.heart.classList.remove('fill')
      }
    },
    async checkUsertatus(status) {
      if(status) {
        // get current favorite state
        const currentState = await axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}/account_states`)

        let favorite = currentState.data.favorite

        this.colorHeart(favorite)
      }
    }
  },
  created() {
    this.checkUsertatus(this.getUser)
  },
  computed : {
   getUser() {
      return this.$store.state.user
    },
    getAuthStatus() {
      return this.$store.state.authStatus
    }
  },
  watch : {
    getUser(newUser) {
      this.checkUsertatus(newUser)
    }
  }
}
</script>

<style lang="scss" scoped>
#heart {
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: $standard;
  fill: rgba(0,0,0,0);
  stroke: $red;
  stroke-width: 2px;
  stroke-linejoin: round;
  &:hover {
    fill: rgba($red , .5);
  }
  &.fill {
    fill: $red;
  }
}
</style>
