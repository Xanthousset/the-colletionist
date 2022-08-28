<template>
  <div id="scrollLoader">
    <div class="tw-flex loading">
      <img class="roll" src="@/assets/images/movie-roll-band.svg"/>
      <img class="roll" src="@/assets/images/movie-roll-band.svg"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollLoading"
}
</script>

<style lang="scss" scoped>
#scrollLoader {
  position: sticky;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20rem 0 3rem;
  background-image: linear-gradient(to top , $black 20% , rgba($black , 0));
  bottom: 0;
}
.loading {
  position: relative;
  display: flex;
  width: 20rem;
  overflow: hidden;
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
