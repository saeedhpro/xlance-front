<template>
  <div>
  <div class="flex flex-wrap" v-if="freelancer">
<!--    <div class=" m-2 rounded" v-for="(portfolio , index) in freelancer.portfolios" :key="index">-->
<!--      <img @click="setLight(portfolio.images[0].path)" style="width: 245px;height: 245px;" class="rounded-lg" v-if="portfolio.images.length > 0" :src="portfolio.images[0].path"/>-->
<!--    </div>-->
<!--    <div class="flex flex-wrap" v-if="freelancer">-->
<!--      <client-only>-->
<!--        <light  v-if="images.length > 0" :media="images" :showLightBox="showLightBox" @onClosed="closeLightBox">-->
<!--        </light>-->
<!--      </client-only>-->
<!--    </div>-->
    <div class="mt-2 flex flex-wrap justify-start">
      <nuxt-link :to="`/portfolios/${i.id}`" class=" m-2 rounded" v-for="(i , index) in freelancer.portfolios" :key="index">
        <img v-if="i.images.length>0" :src="i.images[0].path" style="width: 245px;height: 245px;" class="rounded-lg" alt="">
      </nuxt-link>
    </div>
  </div>
  </div>
</template>
<script>
    export default {
        name: "ShowPortfolios",
        computed:{
            freelancer(){
                return this.$store.getters['freelancer/getFreelancer']
            },
        },
      mounted(){
        this.$store.dispatch('freelancer/getUser', this.$route.params.id)
      },
      data(){
            return{
                showLightBox: false,
                images:[]
            }
        },
        methods:{
            setLight(path) {
                this.images = [{
                    thumb: path,
                    src: path
                }];
                this.showLightBox = true;
            },
            closeLightBox() {
                this.images = [];
                this.showLightBox = false;
            }
        }
    }
</script>
