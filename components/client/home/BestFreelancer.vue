<template>
<div class="container">
  <Head link="/freelancer">
    <h1 class="ka-font" slot="nameHead" style="font-size: 35px">برترین فریلنسرهای ماه
    </h1>
    <span slot="btnName">مشاهده همه</span>
  </Head>
  <ListFreelancer :laravel-data="freelancers" :number="number"/>
  <div class="btn-text1 text-center">
    <nuxt-link to="/freelancer"  class="p-1 sm:px-5 px-1 border-2 rounded-lg  border-purple-600 text-purple-600 ">
      مشاهده همه
    </nuxt-link>
  </div>
</div>
</template>
<script>
  import Head from "./Head";
  import ListFreelancer from "../../../pages/freelancer/ListFreelancer";
    export default {
        name: "BestFreelancer",
        components:{ListFreelancer, Head},
        props: {
            number:{
                type:Number,
                default: 10,
            },
        },
        data() {
            return {
                freelancers: null,
            }
        },
        async mounted() {
            const data = await this.$store.dispatch('freelancer/getFreelancers');
            this.freelancers = {
                data
            }
        }
    }
</script>
