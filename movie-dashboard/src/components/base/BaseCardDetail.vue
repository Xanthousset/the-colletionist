<template>
  <div class="card-popup" :class="{selected : !animate}" :style="[cardPosition]" @click="onCardClick">
    <img class="poster" :src="cardImage" />
    <div class="card-info">
      <Favorite @click.stop :movie-id="card.movie.id"/>
      <div class="tw-flex tw-justify-center tw-gap-6 tw-flex-wrap tw-mb-6">
        <h4 v-for="genre in movieGenres" :key="genre.id" class="tw-font-semibold genre">
          {{genre.name}}
        </h4>
      </div>
      <h3 class="tw-text-center tw-mb-12 tw-font-semibold tw-text-6xl title">{{ card.movie.title }}</h3>

      <p class="tw-text-center tw-font-light tw-text-3xl">{{ overview }}</p>

      <div class="tw-mt-12 tw-flex tw-flex-col lg:tw-flex-row tw-justify-around tw-items-center tw-text-4xl">
        <div class="tw-mb-6 lg:tw-mb-0 tw-flex tw-items-center">
          <img class="tw-w-12 tw-mr-4" src="@/assets/images/star.svg"/>
          <span> {{ card.movie.vote_average }} / 10</span>
        </div>
        <div class="tw-flex tw-items-center">
          <img class="tw-w-12 tw-mr-4" src="@/assets/images/date.svg"/>
          <span> {{ card.movie.release_date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Favorite from "@/components/base/Favorite";
import {mapState , mapActions} from "pinia/dist/pinia";
import {usePiniaStore} from "@/store/piniaStore";
export default {
  name: "BaseCardDetail",
  components: {Favorite},
  props : ['card'],
  data() {
    return {
      animate : true
    }
  },
  created() {
    setTimeout ( () => {
      this.animate = false
    } , 300)
  },
  methods: {
    ...mapActions(usePiniaStore, ['setBackdrop' , 'setBlur' , 'setSelectedMovieId']),
    onCardClick() {
      this.setBackdrop(null)
      this.setBlur(false)
      this.setSelectedMovieId(null)
      this.$emit('cardSelected' , null)
      this.$emit('cardHover', false)
    }
  },
  computed : {
    ...mapState(usePiniaStore, ['genres']),
    movieGenres() {
      //get movie genres
      const genresList = this.genres

      const cardGenres = genresList.filter(genre => this.card.movie.genre_ids.includes(genre.id))

      return cardGenres

    },
    overview() {
      // reduce overview length if it's too long and add '...'
      const overview = this.card.movie.overview
      if(overview.length >= 400) {
        return overview.substr(0, 400) + "\u2026";
      }
      return overview
    },
    cardPosition() {
      // set card position
      let left = this.card.left
      if(window.innerWidth > 768) {
       left = this.card.left + 93
      }
      return {top : this.card.top+'px' , left : left+'px'}
    },
    cardImage() {
      if(window.innerWidth > 768) {
        return this.card.moviePoster
      } else {
        return  this.card.movieBackdrop
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 30;
  overflow-y: scroll;
  transition: all .6s ease .3s , visibility 0s linear .9s , z-index 0s linear .9s;
  @media (min-width: $md) {
    flex-direction: row;
    height: 60rem;
    width: 120rem;
    max-width: calc(100% - 15.3rem);
    border-radius: .5rem;
    overflow: hidden;
  }
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 3rem;
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  overflow: hidden;
  transition: $standard;
}

.poster {
  object-fit: cover;
  object-position: center;
  transition: $standard;
}

.selected.card-popup {
  transition: $standard;
  transition-duration: .6s;
  top: 0 !important;
  left: 0 !important;
  height: calc(100vh - 6rem) !important;
  @media (min-width: $md) {
    min-height: 60rem;
    height: auto !important;
    top: 50% !important;
    left: calc(50% + 4.75rem) !important;
    transform: translate(-50% , -50%);
  }

  .card-info {
    flex-shrink: 0;
    flex-grow: 1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    @media (min-width: $md) {

      flex-shrink: 1;
      flex-grow: 0;
    }
    transition-delay: .6s;
  }
  .poster {
    width: 100vw;
    height: 30rem;
    @media (min-width: $md) {
      width: 30rem;
      height: auto;
    }
    @media (min-width: $lg) {
      width: 40rem;
      height: 60rem;
    }
  }
}

.title {
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 9rem;
    height: 1px;
    background-image: linear-gradient(to right , rgba($gold,0) , $gold 25% , $gold 75% , rgba($gold,0) 100%);
    transform: translate(-50% , 1.5rem);
  }
}

.infos {
  position: relative;
  font-size: 2.4rem;
}

.genre {
  padding: .5rem;
  border-radius: .5rem;
  background-color: $red;
  color: #fff;
  font-size: 1.8rem;
}
</style>
