<template>
  <div id="background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <transition name="fade">
      <img class="tw-z-10 backdrop" v-if="backdrop" :class="{blur : backdropBlur}" :src="backdrop" :key="backdrop"/>
    </transition>
  </div>

</template>

<script>
import {mapState} from "pinia/dist/pinia";
import {usePiniaStore} from "@/store/piniaStore";

export default {
  name: "Background",
  computed : {
    ...mapState(usePiniaStore, ['backdrop' , 'backdropBlur']),
  },
}
</script>

<style lang="scss" scoped>

#background {
  position: fixed;
  top: 0;
  width: inherit;
  height: 100%;

  background: #b92b27;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #1565C0, #b92b27);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #1565C0, #b92b27); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

$particleSize: 35vw;
$animationDuration: 6s;
$amount: 20;
span {
  width: $particleSize;
  height: $particleSize;
  border-radius: $particleSize;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-duration: $animationDuration;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  $colors: (
      #24243e,
      #302b63,
      #0f0c29
  );
  @for $i from 1 through $amount {
    &:nth-child(#{$i}) {
      color: nth($colors, random(length($colors)));
      top: random(100) * 1%;
      left: random(100) * 1%;
      animation-duration: (random($animationDuration * 10) / 4) * 1s + 20s;
      animation-delay: random(($animationDuration + 5s) * 10) / 10 * -1s;
      transform-origin: (random(50) - 20) * 1vw (random(50) - 25) * 1vh;
      $blurRadius: (random() + 0.5) * $particleSize * 0.5;
      $x: if(random() > 0.5, -1, 1);
      box-shadow: ($particleSize * 2 * $x) 0 $blurRadius currentColor;
    }
  }
}

@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: $standard;
  &.blur {
    filter: blur(.5rem);
  }
}

</style>
