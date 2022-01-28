<template>
  <NuxtLink :to="url" class="my-3 w-56 h-12 py-2 items-center inline-block bg-white border-purple-600 border-2 rounded-lg">
    <span v-text="text" class="text-purple-600">ورود</span>
  </NuxtLink>
</template>

<script>
    export default {
        name: "WhiteButtonGlobalLink",
        props: ['url', 'text']

    }
</script>
