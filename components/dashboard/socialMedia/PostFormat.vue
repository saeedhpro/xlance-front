<template>
  <div>
    <div class="mx-3 my-5 relative">
      <nuxt-link :to="`/socialMedia/${post.id}`">
      <img class="w-64 h-64 rounded-lg shadow-lg" v-if="post.media" :src="post.media.path"/>
<!--      <div class="my-5 w-64 text-sm text-gray-700 ir-light text-right">{{post.caption}}</div>-->
      <div class="my-5 w-64 text-sm text-gray-700 ir-light text-right" v-if="post.caption" v-html="post.caption.substring(0,38)+(post.caption.length>38? '...' : '')"></div>
<!--          <div v-show="date"  class="text-sm text-gray-500">{{post.created_at}}</div>-->
</nuxt-link>
      <div class="flex justify-end">
      <div class="absolute text-white" style="margin-top: -100px">
  <div v-if="post.user.id == user.id" class="pl-3 flex" >
             <div class="mx-3 flex text-left" style="z-index: 99">
       {{post.comments.length | toPersianNumber}}
               <i class="fal fa-comment ml-3"></i>
    </div>
    <div class="text-left" style="z-index: 99">
{{post.likes_count | toPersianNumber}}
      <i class="fal fa-heart"></i>
    </div>
  </div>
        <div class="flex" v-else style="z-index: 99;padding-right: 105px" >
          <p class="text-sm text-white ir-medium mt-1" style="z-index: 99;">{{post.user.username}}</p>
          <div class="border-2 border-solid border-purple-600 w-8 h-8 mx-3 bg-purple-600 rounded-full" style="z-index: 99;">
            <img :src="post.user.profile.avatar.path" v-if="post.user.profile && post.user.profile.avatar" class="w-4 h-4 w-full h-full rounded-full"/>
            <img src="/images/Logo.png" v-else class="w-full h-full "/>
          </div>
        </div>
      </div>
      </div>
      <div class="cover_owerly mx-3"></div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "PostFormat",
        props:{
            date:{
                default: false,
                type: Boolean,
            },
            post:{
                required: true,
                type: Object
            }
        },
        methods: {
            getCategorySkills(id) {
                this.menuStatus = id;
                this.showList = true;
            },
            goBack() {
                this.showList = false;
            },
            addToItems(id) {
                this.items.push(id);
            },
        },
        computed: {
            length() {
                return 7000
            },
            user(){
                return this.$store.getters['user/user']
            }
        }
    }
</script>
<style>
  .cover_owerly{
    width: 100%;
    height: 30%;
    position: absolute;
    background-image: linear-gradient(to top,#000000, #000000, #00000066, #00000033, #00000000);
    opacity: 0.6;
    border-radius: 0 0 10px 10px;
    margin-top: -155px;
    margin-right: initial;
  }
</style>
