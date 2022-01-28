<template>
  <div>
    <client-only>
      <light v-if="story.length > 0" :media="story" :showLightBox="showLightBox" @onClosed="closeLightBox">
      </light>
    </client-only>
    <div v-for="(i , n) in getStories" class="flex">
      <div class="mx-2  text-black text-sm relative">
        <img  class="w-20 h-20 rounded-full"  :src="i.story.path"/>
        <img src="/static/images/logo.png" class="w-20 h-20 p-2 rounded-full absolute -mt-20 border-solid border-4 bg-white border-purple-600" @click="setLight(i.story.path)" v-if="i.story">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StorySSS"
}
</script>

<style scoped>

</style>
