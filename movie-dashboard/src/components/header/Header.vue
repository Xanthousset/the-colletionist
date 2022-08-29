<template>
  <div class="tw-fixed tw-bottom-0 tw-flex md:tw-block tw-items-center tw-justify-center tw-justify-start" :class="{hovered : hover}" id="nav">
    <router-link class="tw-flex tw-items-center tw-pr-12 md:tw-pr-0 tw-pl-12 md:tw-mb-12" to="/" @mouseover="hover = true" @mouseleave="hover = false" @click="resetBackdrop">
      <img class="tw-w-12" src="@/assets/images/movie-roll.svg"/>
      <h2 class="tw-hidden md:tw-block tw-ml-12 tw-text-white tw-text-3xl tw-whitespace-nowrap tw-font-semibold">Home</h2>
    </router-link>
    <router-link class="tw-flex tw-items-center tw-pr-12 md:tw-pr-0 tw-pl-12 md:tw-mb-12" to="/listing" @mouseover="hover = true" @mouseleave="hover = false" @click="resetBackdrop">
      <img class="tw-w-12" src="@/assets/images/listing.svg"/>
      <h2 class="tw-hidden md:tw-block tw-ml-12 tw-text-white tw-whitespace-nowrap tw-white tw-text-3xl tw-font-semibold">Explore</h2>
    </router-link>
    <router-link class="tw-flex tw-items-center tw-pr-12 md:tw-pr-0 tw-pl-12" to="/favorites" @mouseover="hover = true" @mouseleave="hover = false" @click="resetBackdrop">
      <img class="tw-w-12" src="@/assets/images/heart.svg"/>
      <h2 class="tw-hidden md:tw-block tw-ml-12 tw-text-white tw-text-3xl tw-whitespace-nowrap tw-font-semibold">My Favorites</h2>
    </router-link>
  </div>
</template>

<script>
import {mapActions} from "pinia/dist/pinia";
import {usePiniaStore} from "@/store/piniaStore";

export default {
  name: "Header",
  data() {
    return {
      hover : false
    }
  },
  methods : {
    ...mapActions(usePiniaStore, ['resetBackdrop']),
  }
}
</script>

<style lang="scss" scoped>
#nav {
  width: 100%;
  height: auto;
  padding: 1.5rem 1.5rem;
  background-color: $black;
  z-index: 60;
  transition: $standard;
  @media (min-width: $md) {
    padding: 3rem 3rem 3rem 0;
    width: 9.3rem;
    height: 100%;
  }
  &::before {
    content: unset;
    position: fixed;
    top: 0;
    left: 9.3rem;
    width: calc(100% - 9.3rem);
    height: 100%;
    background-image: linear-gradient(to right , $black , rgba($black ,.3));
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transition: $standard;
    @media (min-width: $md)  {
      content: '';
    }
  }
  h2 {
    transform: translateX(calc(-9.3rem - 100%));
    transition: $decelerated;
  }
  &:hover {
    &::before {
      opacity: 1;
      visibility: visible;
    }
    h2 {
      transition-delay: .2s;
      transform: translateX(0);
    }
  }

  &.hovered {
    a {
      opacity: .3;
    }
  }

  a {
    position: relative;
    transition: $standard;
    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: -1.5rem;
      left: 50%;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      background-color: #fff;
      transform: translate(-50% , 100%);
      transition: $standard;
      @media (min-width: $md) {
        bottom: 50%;
        left: 0;
        transform: translate(-100% , 50%);
      }
    }
    &:hover {
      opacity: 1;
    }
  }

  .router-link-exact-active::before {
    transform: translate(-50% , 50%);
    @media (min-width: $md) {
      transform: translate(-50% , 50%);
    }
  }
}
</style>
