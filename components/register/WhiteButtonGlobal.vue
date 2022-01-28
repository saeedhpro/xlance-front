<template>
  <NuxtLink class="my-3 w-56 h-12 py-2 items-center inline-block bg-purple-600 bg-white border-purple-600 border-2  rounded-lg shadow-lg">
    <span v-text="text" class="text-white"></span>
  </NuxtLink>
</template>

<script>
    export default {
        name: "WhiteButtonGlobal",
        props: ['text']
    }
</script>

<style scoped>

</style>
