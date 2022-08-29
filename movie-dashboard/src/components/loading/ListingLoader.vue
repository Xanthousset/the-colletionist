<template>
  <div id="loader">

    <img class="roll roll-1" src="@/assets/images/movie-roll-band.svg"/>
    <img class="roll roll-2" src="@/assets/images/movie-roll-band.svg"/>

  </div>
</template>

<script>
export default {
  name: "ListingLoader"
}
</script>

<style lang="scss" scoped>
#loader {
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
  width: 30rem;
  max-width: calc(100vw - 3rem);
  overflow: hidden;
  @media (min-width: $md) {
    left: calc(50% + 4.75rem);
  }
}
path {
  fill: #fff;
}
.roll {
  transform-origin: center center;
  animation: roll 3s linear infinite;
}
@keyframes roll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
