<template>
  <div class="tw-flex">
    <Header/>
    <div class="tw-relative tw-w-full" id="mainContent">

        <Background/>
        <transition name="fade">
          <router-view/>
        </transition>
        <AuthPopup/>

    </div>
  </div>
</template>

<style lang="scss">
html {
  font-size: 10px;
}
#app {
  font-family: $font-base;
  min-height: 100vh;
  color: $black;
}
#mainContent {
  width: 100%; // setup container width
  height: calc(100% - 6rem);
  @media (min-width: $md) {
    margin-left: 9.3rem;
    width: calc(100% - 9.3rem); // setup container width
    height: 100%;
  }
}
</style>
<script>
import Header from "@/components/header/Header";
import Background from "@/components/base/Background";
import AuthPopup from "@/components/authentification/AuthPopup";

export default {
  components: {AuthPopup, Background, Header},
}
</script>
