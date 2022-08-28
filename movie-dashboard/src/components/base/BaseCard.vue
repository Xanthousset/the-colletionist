<template>
  <div class="tw-relative" :class="{'selectedMovieId === movie.id' : selected}" @mouseenter="onCardEnter" @mouseleave="onCardLeave" ref="card">
    <div class="tw-cursor card" @click="onCardClick">
      <img :src="moviePoster" />
    </div>
  </div>
</template>

<script>

import {mapActions , mapState} from "pinia";
import {usePiniaStore} from "@/store/piniaStore";

export default {
  name: "BaseCard",
  props : ['movie'],
  data() {
    return {
      top : 0,
      left : 0,
      height : 0,
    }
  },
  computed : {
    ...mapState(usePiniaStore, ['configuration' , 'selectedMovieId' ]),
    selected() {
      // check if this movie card is the one selected
      return this.selectedMovieId === this.movie.id;
    },
    moviePoster() {
      const imageConf = this.configuration.images
      return imageConf.base_url + imageConf.poster_sizes[4] + this.movie.poster_path
    },
    movieBackdrop() {
      const imageConf = this.configuration.images
      return imageConf.base_url + imageConf.backdrop_sizes[3] + this.movie.backdrop_path
    },
  },
  methods : {
    ...mapActions(usePiniaStore, ['setBackdrop' , 'setBlur' , 'setSelectedMovieId']),
    onCardEnter() {
      // change backdrop when we hover a card and none is currently selected
      if(this.selectedMovieId === null) {
        this.$emit('cardHover', true)
        this.setBackdrop(this.movieBackdrop)
      }
    },
    onCardLeave() {
      // remove backdrop when we hover a card and none is currently selected
      if(this.selectedMovieId === null) {
        this.$emit('cardHover', false)
        this.setBackdrop(null)
      }
    },
    onCardClick() {

      // get card position for the opening animation
      const card = this.$refs.card
      const top = card.getBoundingClientRect().top;
      // activate the background
      this.$emit('cardOpen', true)
      this.openCard( top , card.offsetLeft)

    },
    openCard(top , left) {


      this.setSelectedMovieId(this.movie.id)
      this.setBlur(true)
      this.height = this.$refs.card.offsetHeight
      this.top = top
      this.left = left
      this.setBackdrop(this.movieBackdrop)

      // movie prop passed to BaseCardDetail
      const movie = {
        movie : this.movie,
        moviePoster : this.moviePoster,
        movieBackdrop : this.movieBackdrop,
        top : this.top,
        left : this.left,
      }
      this.$emit('cardSelected' , movie)
    },

  },

}
</script>

<style lang="scss" scoped>
.listingOpen {
  .card {
    opacity: .3;
    img {
      mix-blend-mode: color;
      filter: grayscale(1);
    }
  }
  .selected .card {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    opacity: 1;
    img {
      mix-blend-mode: unset;
      filter: unset;
    }
  }
}

.card {
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: rgba(0,0,0,.3);
  border-radius: .5rem;
  cursor: pointer;
  transition: $standard;
  img {
    transition: $standard;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    opacity: 1;
    img {
      mix-blend-mode: unset;
      filter: unset;
    }

  }
}

</style>
