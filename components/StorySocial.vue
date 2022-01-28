<template>
  <div v-if="getStories.length>0" style="direction: rtl">
    <client-only>
      <light v-if="media.length > 0" :media="media" :showLightBox="showLightBox" @onClosed="closeLightBox">
      </light>
    </client-only>
    <ClientOnly>
      <carousel :nav="true" :mouseDrag="true" :autoWidth="true" :autoHeight="true"
                :dots="false"
                :freeDrag="true"
                :rtl="true"
                >
        <div v-for="(i , n) in getStories"  class="mx-2 w-20 text-black text-sm " :key="n">
          <img :alt="i.username" @click="setLight(i.stories)" v-if="i.profile.avatar" :src="i.profile.avatar.path" class="img-story w-20 h-20 p-1 rounded-full " >
          <img :alt="i.username" @click="setLight(i.stories)" v-else src="/images/logo.png" class="img-story w-20 h-20 p-1 rounded-full" >
<!--          <div v-if="user && i.id === user.id">-->
<!--            <div class="mx-auto text-sm text-gray-500 text-center" @click="deleteStory(i.id)">حذف</div>-->
<!--          </div>-->
          <div class="mx-auto text-center text-sm">{{i.username}}</div>
        </div>
<!--        <div v-for="(i , n) in getStories"  class="mx-2 w-20 text-black text-sm relative" :key="n">-->
<!--&lt;!&ndash;          <div class=" rounded-full "  v-if="i.media">&ndash;&gt;-->
<!--&lt;!&ndash;          <img :alt="i.media.name" class="w-20 h-20 rounded-full "  :src="i.media.path"/>&ndash;&gt;-->
<!--&lt;!&ndash;            <div>&ndash;&gt;-->
<!--            <img :alt="i.username" @click="setLight(i.stories)" v-if="i.profile.avatar" :src="i.profile.avatar.path" class="img-story w-20 h-20 p-1 rounded-full absolute -mt-20 " >-->
<!--            <img :alt="i.username" @click="setLight(i.stories)" v-else src="/images/logo.png" class="img-story w-20 h-20 p-1 rounded-full absolute -mt-20 " >-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <div v-if="user && i.id === user.id">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="text-sm text-gray-500 text-center" @click="deleteStory(i.id)">حذف</div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->
      </carousel>
    </ClientOnly>
  </div>
</template>
<script>
export default {
  name: 'storySocial',
    props:['autoplay'],
  data() {
    return{
      media: [],
      showLightBox: false,
      options:{
        rtl: true,
        responsive:{
          0:{
            items:1
          },
          600:{
            items:3
          },
          1000:{
            items:5
          }
        },
          autoplay:true,
          nav:true,
          autoplaySpeed:true,
          rewind:true,
          mouseDrag:true,
      }
    }
  },
  methods:{
      setLight(stories) {
          stories.forEach(item => {
              this.media.push({
                  thumb: item.media.path,
                  src: item.media.path,
              })
          })
          this.showLightBox = true;
      },
    closeLightBox() {
      this.media = [];
      this.showLightBox = false;
    },
      deleteStory(id){
          this.$swal('آیا مطمئن هستید؟')
              .then(res => {
                  if(res.value) {
                      this.$store.dispatch('socillMedia/deleteStory', id)
                          .then(res => {
                              this.$swal('با موفقیت حذف شد!', {
                                  icon: 'success'
                              });
                              this.$route.replace('/posts/myPost')
                          })
                  }
              })
      },

  },
  mounted(){
    this.$store.dispatch('socillMedia/getStories')
  },
  computed:{
    getStories(){
      return this.$store.getters['socillMedia/getStories']
    },
    user(){
      return this.$store.getters['user/user']
    }
  }
}
</script>
<style>
  .img-story{
    background: transparent linear-gradient(226deg, #673AB7 0%, #00C379 100%) 0% 0% no-repeat padding-box;
    opacity: 1;
  }
</style>
