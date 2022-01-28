<template>
    <div class="container">
      <div class="flex flex-wrap -m-1">
        <div class="sm:w-2/3 w-full pl-1 relative" v-if="blogs[0]">
          <img :src="blogs[0].thumbnail.path" class="h-80 w-full rounded-lg">
          <div class="h-20 py-3  bg-white rounded-lg text-center absolute" style="bottom:20px; opacity: 0.99; right: 20px;left: 20px">
            <div class="ir-bold">{{blogs[0].title}}</div>
            <div class="my-1 text-sm ir-light">{{ $moment(blogs[0].created_at).format('jYYYY/jM/jDD') }}</div>
          </div>
        </div>
        <div class="sm:w-1/3 w-full pr-1 ">
          <div v-if="blogs[1]" class="relative">
            <img :src="blogs[1].thumbnail.path" class="sm:my-0 my-5 w-full rounded-lg" style="height: 206px;">
          <div class="h-20 py-3 bg-white rounded-lg text-center absolute" style="bottom:20px;opacity: 0.99; right: 20px;left: 20px">
            <div class="ir">{{blogs[1].title}}</div>
            <div class="my-1 text-sm ir-light">{{ $moment(blogs[1].created_at).format('jYYYY/jM/jDD') }}</div>
          </div>
          </div>
          <div v-if="blogs[2]" class="relative">
            <img :src="blogs[2].thumbnail.path" class="mt-5 w-full rounded-lg" style="height: 206px;">
            <div class="h-20 py-3 bg-white rounded-lg text-center absolute" style="bottom:20px; opacity: 0.99; right: 20px;left: 20px">
            <div class="ir">{{blogs[2].title}}</div>
            <div class="my-1 text-sm ir-light">{{ $moment(blogs[2].created_at).format('jYYYY/jM/jDD') }}</div>
          </div>
          </div>
        </div>
      </div>
      <div class="mt-20 flex align-items-center">
        <div>
        <img class="h-5" src="/images/art2.png"/>
        </div>
        <div class="mr-5 ir-bold text-xl">آخرین مقالات ایکس لنس</div>
      </div>
      <div>
      <nuxt-link :to="`/blog/${i.id}`" class="py-10 my-5 flex flex-wrap border-b-2 border-gray-400" v-for="(i , n) in blogs" :key="n">
        <img :src="i.thumbnail.path" class="sm:w-56 w-full h-40 rounded-lg">
        <div class="sm:mr-3" style="max-width: 79%">
          <div class="text-gray-600 text-sm sm:my-0 my-2 sm:text-right text-center">{{ $moment(i.created_at).format('jYYYY/jM/jDD') }}</div>
          <div class="sm:my-5 my-2 text-lg text-black ir-bold sm:text-right text-center">{{i.title}}</div>
          <div class="mt-5 text-gray-600 text-md" v-html="i.body.substring(0,300)+(i.body.length>300? '...' : '')"
          style="white-space: nowrap;
              overflow: hidden;
    text-overflow: ellipsis;
    height: 75px;">
          </div>
        </div>
      </nuxt-link>
      </div>
    </div>
</template>
<script>
    export default {
        name: "index",
        layout:'rule',
      head(){
        return {
          title: 'مقالات'
        }
      },
        mounted(){
            this.$store.dispatch('blog/getArticles')
        },
        computed:{
            blogs(){
                return this.$store.getters['blog/getArticles']
            },
        }
    }
</script>
