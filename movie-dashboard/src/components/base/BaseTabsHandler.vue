<template>
  <div>
    <div class="tw-mb-6 tabs" @click="toggleListing" :class="{opened : openListing}">
      <div class="tw-py-6 tw-w-full tabs__header">
        <div class="tw-w-10/12 tw-mx-auto tw-flex tw-items-center tw-justify-between">
          <h1 class="tw-text-5xl tw-font-semibold tw-text-white">
            {{ currentTab }}
          </h1>
          <img class="tw-w-24 arrow" src="@/assets/images/arrow-down.svg">
        </div>
      </div>

      <div class="tw-py-48 tabs__listing">
        <div class="tw-w-10/12 tw-mx-auto tw-flex tw-flex-wrap tw-gap-6 ">
          <h2 v-for="(tab , index) in tabs" :key="tab.id" @click="selectTab(index)" :class='{"tab__selected": (index === selectedIndex)}' class="tw-text-5xl tw-font-semibold tw-text-white tab__header">
            {{ tab.name }}
          </h2>
        </div>
      </div>
    </div>
    <div class="tw-mt-24">

        <div v-for="(tab, index) in tabs" :key="tab.id">
          <BaseTab :name="tab.name" :id="tab.id" v-if="selectedIndex == index" ref="tabGenres"/>
        </div>

    </div>
  </div>
</template>

<script>

import BaseTab from "@/components/base/BaseTab";

export default {
  name: "BaseTabsHandler",
  components: {BaseTab},
  props: ["tabs"],
  data () {
    return {
      openListing : false,
      selectedIndex: 0, // the index of the selected tab,
    }
  },
  mounted() {
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i
      this.$store.dispatch('resetBackdrop')
    },
    toggleListing() {
      // open tab header on click rather than hover for mobile / tablet
      if(window.innerWidth <= 1025) {
        this.openListing = !this.openListing
      }
    }
  },
  computed : {
    currentTab() {
      return this.tabs[this.selectedIndex].name
    }
  }
}
</script>

<style lang="scss" scoped>

.tabs {
  position: sticky;
  top: 0;
  width: 100%;
  background-image: linear-gradient(to bottom , $black 20% , rgba($black , 0));
  transition: $standard;
  z-index: 30;
  cursor: pointer;
  &.opened {
    .tabs__header {
      background-color: $black;
    }
    .tabs__listing {
      opacity: 1;
      visibility: visible;
    }
    .arrow {
      transform: rotate(-180deg);
    }
  }
  @media (min-width: $lg) {
    cursor: auto;
    &:hover {
      .tabs__header {
        background-color: $black;
      }
      .tabs__listing {
        opacity: 1;
        visibility: visible;
      }
      .arrow {
        transform: rotate(-180deg);
      }
    }
  }

}

.arrow {
  transition: $standard;
}

.tabs__listing {
  position: fixed;
  top: 0;
  width: inherit;
  height: 100%;
  overflow-y: auto;
  background-image: linear-gradient(to bottom , $black 20% , rgba($black , .5) 80% , rgba($black , 0));
  opacity: 0;
  visibility: hidden;
  transition: $standard;
  z-index: -1;
  @media (min-width: $md) {
    height: auto;
  }
}


.tab__header {
  position: relative;
  white-space: nowrap;
  padding: .5rem 1rem;
  border-bottom: none;
  cursor: pointer;
  border-radius: .5rem;
  background-color: #fff;
  color: $black;
  transition: $standard;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    color: #fff;
    background-color: $black
  }

  &.tab__selected {
    color: #fff;
    background-color: $red;
    &::after {
      transform: scaleX(1);
      background-color: $gold;
    }
  }
}

</style>
