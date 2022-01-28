<template>
  <div class="my-5 flex">
    <img class="image rounded-full" v-for="(image, i) in images" :src="image" @click="onClick(i)">
    <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
  </div>
</template>

<script>
    // import VueGallerySlideshow from 'vue-gallery-slideshow'
    export default {
        name: "Storis",
        // components: {
        //     VueGallerySlideshow
        // },
        methods: {
            onClick(i) {
                this.index = i;
            }
        },
        data() {
            return {
                images: [
                    'https://placekitten.com/801/800',
                    'https://placekitten.com/802/800',
                    'https://placekitten.com/803/800',
                    'https://placekitten.com/804/800',
                    'https://placekitten.com/805/800',
                    'https://placekitten.com/806/800',
                    'https://placekitten.com/807/800',
                    'https://placekitten.com/808/800',
                    'https://placekitten.com/809/800',
                    'https://placekitten.com/810/800',
                ],
                index: 0
            }
        }
    }
</script>

<style scoped>
  .image {
    width: 100px;
    height: 100px;
    background-size: contain;
    cursor: pointer;
    margin: 10px;
    border-radius: 100%;
    /*border-color: transparent linear-gradient(226deg, #673AB7 0%, #00C379 100%) 0% 0% no-repeat padding-box;*/
    border: 2px solid transparent linear-gradient(226deg, #673AB7 0%, #00C379 100%) 0% 0% no-repeat padding-bo;
  }
</style>
