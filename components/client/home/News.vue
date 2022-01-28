<template>
<div class="container">
  <Head link="/blog">
    <h1 slot="nameHead" class="ka-font" style="font-size: 35px">آخرین مطالب وبلاگ</h1>
    <span slot="btnName">مشاهده همه</span>
  </Head>
  <div class="mb-20 sm:px-6 flex flex-wrap sm:justify-between justify-center">
    <nuxt-link :to="`/blog/${i.id}`" v-for="(i , n ) in blogs" :key="n" class="overflow-hidden -mx-6  bg-white text-center sm:w-1/3 w-full  sm:my-0 my-6 rounded-lg shadow-md	">
      <img v-if="i.thumbnail" :src="i.thumbnail.path" class="object-cover h-auto  w-full rounded-lg"/>
      <p class="my-3 text-black ir-medium">{{i.title}}</p>
    </nuxt-link>
  </div>
</div>
</template>
<script>
    import Head from "./Head";
    export default {
        name: "News",
        components: {Head},
        mounted(){
            this.$store.dispatch('blog/getLastArticles')
        },
        computed:{
            blogs(){
                return this.$store.getters['blog/getLastArticles']
            },
        }
    }
</script>
