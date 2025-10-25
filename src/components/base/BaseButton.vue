<template>
  <button @click="linkAccount" class="tw-text-white tw-bg-red tw-font-semibold tw-rounded-lg tw-p-6 tw-text-3xl">{{ text }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: ['text']
}
</script>

<style scoped>

</style>
